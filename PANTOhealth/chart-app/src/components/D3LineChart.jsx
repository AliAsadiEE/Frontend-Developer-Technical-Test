import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

/** ---- Heuristics ---- **/
// Detect chart type by inspecting the first non-null value
function detectChartType(data) {
  const first = Array.isArray(data) ? data.find(([, v]) => v !== null && v !== undefined) : null;
  if (!first) return "unknown";
  return Array.isArray(first[1]) ? "multi" : "single";
}

// If timestamps look like epoch milliseconds (or seconds), use time scale.
function maybeTimeScaleDomain(points) {
  const minX = d3.min(points, d => d.x);
  const maxX = d3.max(points, d => d.x);
  if (minX == null || maxX == null) return null;

  const span = maxX - minX;
  const nowMs = Date.now();
  // crude check: ms epoch within last ~50 years or seconds epoch within last ~50 years
  const inMsRange = minX > 1e11 && maxX < nowMs + 1e11; // ~ 1970+
  const inSecRange = minX > 1e9 && maxX < Math.floor(nowMs / 1000) + 1e9;
  if (inMsRange) return { type: "ms", minX, maxX };
  if (inSecRange) return { type: "s", minX, maxX };
  return null;
}

/** ---- LTTB downsampling for performance on large datasets ---- **/
// Largest-Triangle-Three-Buckets (simplified). Expects [{x, y}] with defined y.
function lttb(points, threshold = 1000) {
  const data = points.filter(p => p.y != null);
  const n = data.length;
  if (threshold >= n || threshold < 3) return data;

  const sampled = [];
  let sampledIndex = 0;
  const every = (n - 2) / (threshold - 2);
  let a = 0; // initially a is the first point
  sampled[sampledIndex++] = data[a];

  for (let i = 0; i < threshold - 2; i++) {
    const rangeStart = Math.floor((i + 1) * every) + 1;
    const rangeEnd = Math.floor((i + 2) * every) + 1;
    const range = data.slice(rangeStart, Math.min(rangeEnd, n));

    // avg next bucket
    const nextStart = Math.floor((i + 2) * every) + 1;
    const nextEnd = Math.floor((i + 3) * every) + 1;
    const nextRange = data.slice(nextStart, Math.min(nextEnd, n));
    const avgX = d3.mean(nextRange, d => d.x) ?? 0;
    const avgY = d3.mean(nextRange, d => d.y) ?? 0;

    // point a
    const pa = data[a];
    let maxArea = -1;
    let maxAreaPoint;
    let maxAreaIndex = 0;

    for (let j = 0; j < range.length; j++) {
      const p = range[j];
      const area = Math.abs((pa.x - avgX) * (p.y - pa.y) - (pa.x - p.x) * (avgY - pa.y)) * 0.5;
      if (area > maxArea) {
        maxArea = area;
        maxAreaPoint = p;
        maxAreaIndex = j;
      }
    }

    sampled[sampledIndex++] = maxAreaPoint;
    a = rangeStart + maxAreaIndex;
  }

  sampled[sampledIndex++] = data[n - 1];
  return sampled;
}

/** ---- Data prep ---- **/
function preprocess(data, type) {
  if (type === "single") {
    const points = data.map(([t, v]) => ({ x: +t, y: v == null ? null : +v }));
    const values = points.map(d => d.y).filter(v => v != null);
    return { points, yMin: d3.min(values), yMax: d3.max(values) };
  }
  if (type === "multi") {
    const points = data.map(([t, arr]) => {
      const a = Array.isArray(arr) ? arr : [];
      return {
        x: +t,
        y0: a[0] == null ? null : +a[0],
        y1: a[1] == null ? null : +a[1],
        y2: a[2] == null ? null : +a[2],
      };
    });
    const flat = [];
    ["y0","y1","y2"].forEach(k => { points.forEach(p => { if (p[k] != null) flat.push(p[k]); }); });
    return { points, yMin: d3.min(flat), yMax: d3.max(flat) };
  }
  return { points: [], yMin: 0, yMax: 1 };
}

export default function D3LineChart({ title, data, height = 320, maxPoints = 2000 }) {
  const svgRef = useRef();
  const wrapRef = useRef();
  const [width, setWidth] = useState(800);

  // ResizeObserver for responsiveness
  useEffect(() => {
    const ro = new ResizeObserver(entries => {
      for (const e of entries) {
        const w = Math.floor(e.contentRect.width);
        if (w && w !== width) setWidth(w);
      }
    });
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, [width]);

  useEffect(() => {
    const type = detectChartType(data);
    const { points, yMin, yMax } = preprocess(data, type);

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 10, right: 24, bottom: 32, left: 48 };
    const w = Math.max(300, width) - margin.left - margin.right;
    const h = height - margin.top - margin.bottom;

    svg.attr("width", Math.max(300, width)).attr("height", height);
    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    if (!points.length || yMin == null || yMax == null) {
      g.append("text").attr("x", w/2).attr("y", h/2).attr("text-anchor","middle").text("No plottable data");
      return;
    }

    // Decide scale for X
    const maybeTime = maybeTimeScaleDomain(points);
    let x, xAxis;
    if (maybeTime) {
      const asDate = maybeTime.type === "ms" ? (v) => new Date(v) : (v) => new Date(v * 1000);
      const domain = d3.extent(points, d => asDate(d.x));
      x = d3.scaleTime().domain(domain).range([0, w]);
      xAxis = d3.axisBottom(x);
    } else {
      const xExtent = d3.extent(points, d => d.x);
      x = d3.scaleLinear().domain(xExtent).range([0, w]);
      xAxis = d3.axisBottom(x).tickFormat(d3.format(","));
    }

    // Y scale
    const pad = (yMax - yMin) * 0.05 || 1;
    const y = d3.scaleLinear().domain([yMin - pad, yMax + pad]).nice().range([h, 0]);

    // Gridlines
    const xGrid = d3.axisBottom(x).ticks(6).tickSize(-h).tickFormat("");
    const yGrid = d3.axisLeft(y).ticks(6).tickSize(-w).tickFormat("");
    g.append("g").attr("class","grid x-grid").attr("transform", `translate(0,${h})`).call(xGrid);
    g.append("g").attr("class","grid y-grid").call(yGrid);
    g.selectAll(".grid line").attr("stroke", "#eee");
    g.selectAll(".grid path").attr("stroke-width", 0);

    // Axes on top of grid
    g.append("g").attr("transform", `translate(0,${h})`).call(xAxis);
    g.append("g").call(d3.axisLeft(y));

    // Line generators
    const singleLine = d3.line()
      .x(d => x(d.x))
      .y(d => y(d.y))
      .defined(d => d.y != null);

    const makeLine = key => d3.line()
      .x(d => x(d.x))
      .y(d => y(d[key]))
      .defined(d => d[key] != null);

    if (type === "single") {
      // Downsample if needed (without touching nulls)
      const down = lttb(points, maxPoints);
      g.append("path")
        .datum(down.length ? down : points)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 1.5)
        .attr("d", singleLine);
    } else if (type === "multi") {
      const series = [
        { key: "y0", color: "blue",  label: "Series 1" },
        { key: "y1", color: "green", label: "Series 2" },
        { key: "y2", color: "red",   label: "Series 3" },
      ];
      series.forEach(s => {
        const pts = points.map(p => ({ x: p.x, y: p[s.key] }));
        const down = lttb(pts, maxPoints);
        g.append("path")
          .datum(down.length ? down : pts)
          .attr("fill", "none")
          .attr("stroke", s.color)
          .attr("stroke-width", 1.5)
          .attr("d", singleLine);
      });

      // Legend with background
      const legend = g.append("g").attr("transform", `translate(${w - 140}, 10)`);
      const items = [
        { color: "blue",  text: "Series 1" },
        { color: "green", text: "Series 2" },
        { color: "red",   text: "Series 3" },
      ];
      const box = legend.append("g");
      items.forEach((s, i) => {
        legend.append("line")
          .attr("x1", 8).attr("x2", 28)
          .attr("y1", i * 18 + 10).attr("y2", i * 18 + 10)
          .attr("stroke", s.color).attr("stroke-width", 2);
        legend.append("text")
          .attr("x", 36).attr("y", i * 18 + 14)
          .attr("font-size", 12)
          .text(s.text);
      });
      const { width: bw, height: bh } = legend.node().getBBox();
      box.insert("rect", ":first-child")
        .attr("x", 0).attr("y", 0).attr("width", bw + 10).attr("height", bh + 6)
        .attr("fill", "white").attr("stroke", "#ddd").attr("rx", 6);
    }
  }, [data, height, maxPoints, width]);

  return (
    <div ref={wrapRef} style={{ marginBottom: 24, width: "100%" }}>
      <h3 style={{ margin: "0 0 8px" }}>{title}</h3>
      <svg ref={svgRef} />
    </div>
  );
}

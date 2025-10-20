import { useEffect, useState } from "react";
import D3LineChart from "./components/D3LineChart.jsx";

export default function App() {
  const [charts, setCharts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/data.json")
      .then(res => {
        if (!res.ok) throw new Error("Failed to load data.json");
        return res.json();
      })
      .then(json => {
        if (!Array.isArray(json)) throw new Error("data.json must be an array of { title, data }");
        setCharts(json);
      })
      .catch(e => setError(e.message));
  }, []);

  if (error) return <div style={{ color: "red", padding: 24 }}>Error: {error}</div>;
  if (!charts.length) return <div style={{ padding: 24 }}>Loading…</div>;

  return (
    <div style={{ padding: 24, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
      <h2 style={{ marginTop: 0 }}>Charts</h2>
      {charts.map((c, i) => (
        <D3LineChart key={i} title={c.title ?? `Chart ${i + 1}`} data={c.data ?? []} />
      ))}
    </div>
  );
}

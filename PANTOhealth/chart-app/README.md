# Chart App – React + D3.js

## Installation & Run

```bash
npm install
npm run dev
```

Then open your browser and go to:
```
http://localhost:5173/
```

---

## About the App

This is a React application that reads data from the `data.json` file and displays it as line charts using D3.js.

- If the data is in the format `[timestamp, value]`, a **single-series** chart is rendered.
- If the data is in the format `[timestamp, [value1, value2, value3]]`, a **multi-series** chart (three lines: blue, green, and red) is rendered.
- `null` values are skipped for each series individually.
- The title of each chart is displayed above it.
- The code dynamically renders all charts based on the content of `data.json`.

import { useState, DragEvent } from "react";
import {
  PieChart, Pie, BarChart, Bar, LineChart, Line, ScatterChart, Scatter,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, Area, AreaChart,
} from "recharts";
import { GPURow, parseCSV, computeStats } from "@/lib/gpu-data";
import DropZone from "@/components/DropZone";
import StatCard from "@/components/StatCard";
import ChartCard from "@/components/ChartCard";

const NVIDIA_GREEN = "#76b900";
const NVIDIA_GLOW = "#8ed119";
const MUTED_COLOR = "#64748b";

const Index = () => {
  const [data, setData] = useState<GPURow[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleFile = (file: File) => {
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setData(parseCSV(text));
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
  };

  const stats = computeStats(data);

  const donutData = stats
    ? [
        { name: "Used", value: parseFloat(stats.mem) },
        { name: "Free", value: data[0]?.mem_free_MB || 0 },
      ]
    : [];

  const DONUT_COLORS = [NVIDIA_GREEN, "#1e293b"];

  const customTooltipStyle = {
    backgroundColor: "hsl(220, 25%, 8%)",
    border: "1px solid hsl(220, 20%, 16%)",
    borderRadius: "8px",
    color: "#e2e8f0",
  };

  return (
    <div className="min-h-screen gradient-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center glow-green">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-primary text-glow tracking-tight">
                Kore-value
              </h1>
              <p className="text-muted-foreground text-sm">GPU Performance Dashboard</p>
            </div>
          </div>
          {fileName && (
            <div className="mt-3 inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-mono px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              {fileName} — {data.length} samples loaded
            </div>
          )}
        </header>

        {/* Drop Zone */}
        <div className="mb-8">
          <DropZone
            dragActive={dragActive}
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            onFileSelect={handleFile}
          />
        </div>

        {data.length > 0 && stats && (
          <>
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard
                label="Avg GPU Utilization"
                value={`${stats.gpu}%`}
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
              />
              <StatCard
                label="Avg Power Draw"
                value={`${stats.power} W`}
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" /></svg>}
              />
              <StatCard
                label="Avg Temperature"
                value={`${stats.temp} °C`}
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
              />
              <StatCard
                label="Avg Memory Used"
                value={`${stats.mem} MB`}
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}
              />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* GPU Utilization - Area Chart */}
              <ChartCard title="GPU Utilization Over Time">
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="gpuGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={NVIDIA_GREEN} stopOpacity={0.4} />
                        <stop offset="100%" stopColor={NVIDIA_GREEN} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="hsl(220, 20%, 16%)" strokeDasharray="3 3" />
                    <XAxis dataKey="time" stroke={MUTED_COLOR} fontSize={11} />
                    <YAxis stroke={MUTED_COLOR} fontSize={11} domain={[0, 100]} />
                    <Tooltip contentStyle={customTooltipStyle} />
                    <Area type="monotone" dataKey="gpu_util_%" stroke={NVIDIA_GREEN} strokeWidth={2} fill="url(#gpuGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartCard>

              {/* Memory Distribution - Donut */}
              <ChartCard title="Memory Distribution">
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={donutData}
                      innerRadius={70}
                      outerRadius={110}
                      dataKey="value"
                      stroke="none"
                      paddingAngle={3}
                    >
                      {donutData.map((_, i) => (
                        <Cell key={i} fill={DONUT_COLORS[i]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={customTooltipStyle} />
                    <Legend
                      formatter={(value) => <span style={{ color: "#e2e8f0", fontSize: 12 }}>{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>

              {/* Power & Temperature - Bar */}
              <ChartCard title="Power & Temperature">
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={data}>
                    <CartesianGrid stroke="hsl(220, 20%, 16%)" strokeDasharray="3 3" />
                    <XAxis dataKey="time" stroke={MUTED_COLOR} fontSize={11} />
                    <YAxis stroke={MUTED_COLOR} fontSize={11} />
                    <Tooltip contentStyle={customTooltipStyle} />
                    <Legend
                      formatter={(value) => <span style={{ color: "#e2e8f0", fontSize: 12 }}>{value}</span>}
                    />
                    <Bar dataKey="power_W" fill={NVIDIA_GREEN} radius={[3, 3, 0, 0]} name="Power (W)" />
                    <Bar dataKey="temperature_C" fill={MUTED_COLOR} radius={[3, 3, 0, 0]} name="Temp (°C)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              {/* Scatter: Power vs Temp */}
              <ChartCard title="Power vs Temperature Correlation">
                <ResponsiveContainer width="100%" height={280}>
                  <ScatterChart>
                    <CartesianGrid stroke="hsl(220, 20%, 16%)" strokeDasharray="3 3" />
                    <XAxis type="number" dataKey="power_W" stroke={MUTED_COLOR} fontSize={11} name="Power (W)" />
                    <YAxis type="number" dataKey="temperature_C" stroke={MUTED_COLOR} fontSize={11} name="Temp (°C)" />
                    <Tooltip contentStyle={customTooltipStyle} cursor={{ strokeDasharray: "3 3" }} />
                    <Scatter data={data} fill={NVIDIA_GREEN} fillOpacity={0.8} />
                  </ScatterChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>

            {/* Data Table */}
            <div className="mt-8 bg-card border border-border rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-border">
                <h3 className="text-primary font-semibold">Raw Data</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      {["Time", "GPU %", "Mem Used", "Mem Free", "Power (W)", "Temp (°C)"].map((h) => (
                        <th key={h} className="px-4 py-3 text-left text-muted-foreground font-medium font-mono text-xs uppercase tracking-wider">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((row) => (
                      <tr key={row.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                        <td className="px-4 py-2.5 font-mono text-xs text-foreground">{row.time}</td>
                        <td className="px-4 py-2.5 font-mono text-xs">
                          <span className={row["gpu_util_%"] >= 90 ? "text-primary font-bold" : "text-foreground"}>
                            {row["gpu_util_%"]}%
                          </span>
                        </td>
                        <td className="px-4 py-2.5 font-mono text-xs text-foreground">{row.mem_used_MB} MB</td>
                        <td className="px-4 py-2.5 font-mono text-xs text-foreground">{row.mem_free_MB} MB</td>
                        <td className="px-4 py-2.5 font-mono text-xs text-foreground">{row.power_W}</td>
                        <td className="px-4 py-2.5 font-mono text-xs">
                          <span className={row.temperature_C >= 80 ? "text-destructive font-bold" : "text-foreground"}>
                            {row.temperature_C}°C
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {data.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg">Drop a GPU CSV file above to visualize performance metrics</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;

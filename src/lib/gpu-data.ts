export interface GPURow {
  id: number;
  timestamp: string;
  time: string;
  "gpu_util_%": number;
  mem_used_MB: number;
  mem_total_MB: number;
  mem_free_MB: number;
  power_W: number;
  temperature_C: number;
}

export const parseCSV = (text: string): GPURow[] => {
  const lines = text.trim().split(/\n/);
  const headers = lines[0].split(/\t|,/);

  return lines.slice(1).map((line, idx) => {
    const values = line.split(/\t|,/);
    const obj: Record<string, unknown> = { id: idx };

    headers.forEach((h, i) => {
      const key = h.trim();
      obj[key] = key === "timestamp" ? values[i]?.trim() : parseFloat(values[i]);
    });

    obj.time = (values[0]?.trim() || "").split(" ")[1] || "";
    return obj as unknown as GPURow;
  });
};

export const computeStats = (data: GPURow[]) => {
  if (!data.length) return null;
  return {
    gpu: (data.reduce((s, d) => s + d["gpu_util_%"], 0) / data.length).toFixed(1),
    power: (data.reduce((s, d) => s + d.power_W, 0) / data.length).toFixed(1),
    temp: (data.reduce((s, d) => s + d.temperature_C, 0) / data.length).toFixed(1),
    mem: (data.reduce((s, d) => s + d.mem_used_MB, 0) / data.length).toFixed(0),
    maxGpu: Math.max(...data.map((d) => d["gpu_util_%"])),
    maxTemp: Math.max(...data.map((d) => d.temperature_C)),
    maxPower: Math.max(...data.map((d) => d.power_W)),
    samples: data.length,
  };
};

import { DragEvent } from "react";

interface DropZoneProps {
  dragActive: boolean;
  onDragOver: (e: DragEvent<HTMLDivElement>) => void;
  onDragLeave: () => void;
  onDrop: (e: DragEvent<HTMLDivElement>) => void;
  onFileSelect: (file: File) => void;
}

const DropZone = ({ dragActive, onDragOver, onDragLeave, onDrop, onFileSelect }: DropZoneProps) => {
  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={() => document.getElementById("fileInput")?.click()}
      className={`
        relative border-2 border-dashed rounded-xl p-10 text-center cursor-pointer
        transition-all duration-300 backdrop-blur-sm
        ${dragActive
          ? "border-primary bg-primary/5 glow-green"
          : "border-border bg-card/50 hover:border-primary/40 hover:bg-card/80"
        }
      `}
    >
      <input
        id="fileInput"
        type="file"
        accept=".csv,.tsv"
        hidden
        onChange={(e) => e.target.files && onFileSelect(e.target.files[0])}
      />
      <div className="flex flex-col items-center gap-3">
        <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${dragActive ? "bg-primary/20" : "bg-secondary"}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        <div>
          <p className="text-primary font-semibold text-lg">
            {dragActive ? "Drop file here" : "Click or Drag & Drop CSV"}
          </p>
          <p className="text-muted-foreground text-sm mt-1">Supports .csv and .tsv files</p>
        </div>
      </div>
    </div>
  );
};

export default DropZone;

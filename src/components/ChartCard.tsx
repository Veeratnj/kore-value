import { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  children: ReactNode;
}

const ChartCard = ({ title, children }: ChartCardProps) => {
  return (
    <div className="bg-card border border-border rounded-xl p-5 hover:glow-green transition-all duration-500">
      <h3 className="text-primary font-semibold text-base mb-4">{title}</h3>
      {children}
    </div>
  );
};

export default ChartCard;

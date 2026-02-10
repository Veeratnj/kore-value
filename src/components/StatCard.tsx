interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
}

const StatCard = ({ label, value, icon }: StatCardProps) => {
  return (
    <div className="bg-card border border-border rounded-xl p-5 hover:glow-green transition-all duration-300 group">
      <div className="flex items-center justify-between mb-2">
        <span className="text-muted-foreground text-sm font-medium">{label}</span>
        <div className="text-primary/60 group-hover:text-primary transition-colors">
          {icon}
        </div>
      </div>
      <div className="text-primary text-2xl font-bold font-mono text-glow">{value}</div>
    </div>
  );
};

export default StatCard;

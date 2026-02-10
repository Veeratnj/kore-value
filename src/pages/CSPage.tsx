
import AgentChat from "../components/AgentChat";
import { useTheme } from "../components/ThemeContext";

const CSPage = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <div>
      <AgentChat isDark={isDark} />
    </div>
  );
};

export default CSPage;

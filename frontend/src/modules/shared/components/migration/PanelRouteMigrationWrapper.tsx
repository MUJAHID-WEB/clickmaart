type PanelRouteMigrationWrapperProps = {
  children: React.ReactNode;
  tone?: "neutral" | "dashboard";
};

export default function PanelRouteMigrationWrapper({
  children,
  tone = "dashboard",
}: PanelRouteMigrationWrapperProps) {
  return (
    <div
      className={
        tone === "neutral"
          ? "min-h-screen bg-white"
          : "min-h-screen bg-slate-50"
      }
    >
      {children}
    </div>
  );
}

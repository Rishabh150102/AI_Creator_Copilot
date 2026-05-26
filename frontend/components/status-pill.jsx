export function StatusPill({ tone = "default", children }) {
  const tones = {
    default: "border-white/10 bg-white/5 text-slate-300",
    success: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
    info: "border-sky-400/20 bg-sky-400/10 text-sky-200",
    warn: "border-amber-400/20 bg-amber-400/10 text-amber-200"
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

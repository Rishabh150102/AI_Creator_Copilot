export function ActionButton({
  children,
  onClick,
  isLoading = false,
  disabled = false,
  variant = "primary",
  className = ""
}) {
  const styles = {
    primary:
      "bg-slate-100 text-slate-950 hover:bg-white shadow-[0_18px_50px_rgba(248,250,252,0.16)]",
    secondary:
      "bg-sky-500/16 text-sky-100 ring-1 ring-inset ring-sky-300/18 hover:bg-sky-400/20",
    ghost:
      "bg-white/5 text-slate-100 ring-1 ring-inset ring-white/10 hover:bg-white/10"
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`inline-flex min-h-12 items-center justify-center rounded-2xl px-5 text-sm font-medium transition duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]} ${className}`}
    >
      {isLoading ? (
        <span className="inline-flex items-center gap-2">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          Working...
        </span>
      ) : (
        children
      )}
    </button>
  );
}

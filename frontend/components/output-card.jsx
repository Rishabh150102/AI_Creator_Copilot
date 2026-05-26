export function OutputCard({
  title,
  eyebrow,
  description,
  children,
  action
}) {
  return (
    <section className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-panel backdrop-blur xl:p-7">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-2">
          <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-slate-300">
            {eyebrow}
          </span>
          <div>
            <h2 className="text-xl font-semibold text-white">{title}</h2>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-400">
              {description}
            </p>
          </div>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

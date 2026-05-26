export function WorkspacePanel({
  niche,
  setNiche,
  topic,
  setTopic,
  children
}) {
  return (
    <section className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6 shadow-panel backdrop-blur xl:p-8">
      <div className="mb-8 max-w-3xl">
        <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-cyan-100">
          AI Creator Workflow
        </span>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Turn a niche into ready-to-record content in one clean workspace.
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">
          Generate video ideas first, then refine them into stronger hooks,
          titles, and a complete script without leaving the page.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <label className="flex flex-col gap-3">
          <span className="text-sm font-medium text-slate-200">
            Niche or content category
          </span>
          <textarea
            value={niche}
            onChange={(event) => setNiche(event.target.value)}
            placeholder="Example: Personal finance for Gen Z freelancers"
            rows={4}
            className="min-h-[132px] rounded-3xl border border-white/10 bg-slate-950/50 px-5 py-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400/50 focus:ring-2 focus:ring-sky-400/20"
          />
        </label>

        <label className="flex flex-col gap-3">
          <span className="text-sm font-medium text-slate-200">
            Selected topic for hooks, titles, and script
          </span>
          <textarea
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
            placeholder="Pick an idea below or type a topic directly"
            rows={4}
            className="min-h-[132px] rounded-3xl border border-white/10 bg-slate-950/50 px-5 py-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20"
          />
        </label>
      </div>

      <div className="mt-6">{children}</div>
    </section>
  );
}

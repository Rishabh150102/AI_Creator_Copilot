import { ActionButton } from "@/components/action-button";

function parseIdeas(content) {
  return content
    .split(/\n+/)
    .map((line) => line.replace(/^\s*\d+[\).\-\s]*/, "").trim())
    .filter(Boolean);
}

export function IdeaList({ ideas, onUseIdea }) {
  const parsedIdeas = parseIdeas(ideas);

  if (!parsedIdeas.length) {
    return (
      <div className="rounded-3xl border border-dashed border-white/10 bg-slate-950/30 px-5 py-10 text-center text-sm text-slate-400">
        Your generated ideas will appear here. Pick one to instantly push it
        into the topic field.
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {parsedIdeas.map((idea, index) => (
        <article
          key={`${idea}-${index}`}
          className="rounded-3xl border border-white/10 bg-slate-950/40 p-5 transition hover:border-sky-300/20 hover:bg-slate-950/60"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="space-y-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-xs font-medium text-sky-200">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="max-w-2xl text-base leading-7 text-slate-100">
                {idea}
              </p>
            </div>
            <ActionButton
              variant="ghost"
              onClick={() => onUseIdea(idea)}
              className="md:min-w-36"
            >
              Use This Topic
            </ActionButton>
          </div>
        </article>
      ))}
    </div>
  );
}

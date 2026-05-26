function sanitizeContent(content) {
  return content
    .replace(/\r\n/g, "\n")
    .replace(/^\s*---+\s*$/gm, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function createParagraph(text) {
  return {
    type: "paragraph",
    content: text
  };
}

function createHeading(text) {
  return {
    type: "heading",
    content: text.replace(/[:\s]+$/, "").trim()
  };
}

function parseBlocks(content) {
  const cleanedContent = sanitizeContent(content);

  if (!cleanedContent) {
    return [];
  }

  const lines = cleanedContent.split("\n");
  const blocks = [];
  let paragraphBuffer = [];
  let listBuffer = null;

  function flushParagraph() {
    if (!paragraphBuffer.length) {
      return;
    }

    blocks.push(createParagraph(paragraphBuffer.join(" ")));
    paragraphBuffer = [];
  }

  function flushList() {
    if (!listBuffer || !listBuffer.items.length) {
      listBuffer = null;
      return;
    }

    blocks.push(listBuffer);
    listBuffer = null;
  }

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    const numberedMatch = line.match(/^(\d+)[\).\-\s]+(.+)$/);
    const bulletMatch = line.match(/^[-*]\s+(.+)$/);
    const headingMatch = line.match(
      /^(hook|hooks|title|titles|script|intro|introduction|scene|scenes|cta|call to action|opening|body|outro|section)\b[\s:.-]*(.*)$/i
    );
    const uppercaseHeading = /^[A-Z][A-Z\s&]{2,}$/.test(line);

    if (numberedMatch) {
      flushParagraph();

      if (!listBuffer || listBuffer.ordered !== true) {
        flushList();
        listBuffer = {
          type: "list",
          ordered: true,
          items: []
        };
      }

      listBuffer.items.push(numberedMatch[2].trim());
      continue;
    }

    if (bulletMatch) {
      flushParagraph();

      if (!listBuffer || listBuffer.ordered !== false) {
        flushList();
        listBuffer = {
          type: "list",
          ordered: false,
          items: []
        };
      }

      listBuffer.items.push(bulletMatch[1].trim());
      continue;
    }

    flushList();

    const isShortHeading = line.length <= 72;
    const endsWithColon = line.endsWith(":");

    if (
      (headingMatch && isShortHeading) ||
      uppercaseHeading ||
      (endsWithColon && isShortHeading)
    ) {
      flushParagraph();
      blocks.push(createHeading(line));
      continue;
    }

    paragraphBuffer.push(line);
  }

  flushParagraph();
  flushList();

  return blocks;
}

export function TextOutput({
  content,
  placeholder = "Output will appear here.",
  variant = "default"
}) {
  if (!content) {
    return (
      <div className="rounded-3xl border border-dashed border-white/10 bg-slate-950/30 px-5 py-10 text-center text-sm text-slate-400">
        {placeholder}
      </div>
    );
  }

  const blocks = parseBlocks(content);
  const isScript = variant === "script";

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/45 p-5">
      <div className={`space-y-4 ${isScript ? "md:space-y-5" : ""}`}>
        {blocks.map((block, index) => {
          if (block.type === "heading") {
            return (
              <h3
                key={`${block.content}-${index}`}
                className={`font-semibold tracking-tight text-white ${
                  isScript ? "pt-2 text-lg" : "text-base"
                }`}
              >
                {block.content}
              </h3>
            );
          }

          if (block.type === "list") {
            const ListTag = block.ordered ? "ol" : "ul";

            return (
              <ListTag
                key={`list-${index}`}
                className={`space-y-3 pl-5 text-slate-100 marker:text-sky-200 ${
                  block.ordered ? "list-decimal" : "list-disc"
                } ${isScript ? "text-[15px] leading-8" : "text-sm leading-7"}`}
              >
                {block.items.map((item, itemIndex) => (
                  <li key={`${item}-${itemIndex}`}>{item}</li>
                ))}
              </ListTag>
            );
          }

          return (
            <p
              key={`${block.content.slice(0, 32)}-${index}`}
              className={`text-slate-100 ${
                isScript ? "text-[15px] leading-8" : "text-sm leading-7"
              } whitespace-pre-wrap`}
            >
              {block.content}
            </p>
          );
        })}
      </div>
    </div>
  );
}

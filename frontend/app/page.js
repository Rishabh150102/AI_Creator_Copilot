"use client";

import { useState } from "react";
import { ActionButton } from "@/components/action-button";
import { IdeaList } from "@/components/idea-list";
import { OutputCard } from "@/components/output-card";
import { StatusPill } from "@/components/status-pill";
import { TextOutput } from "@/components/text-output";
import { WorkspacePanel } from "@/components/workspace-panel";
import {
  fetchHooksAndTitles,
  fetchScript,
  fetchVideoIdeas
} from "@/lib/api";

const initialLoading = {
  ideas: false,
  hooks: false,
  script: false
};

export default function HomePage() {
  const [niche, setNiche] = useState("");
  const [topic, setTopic] = useState("");
  const [ideas, setIdeas] = useState("");
  const [hooksAndTitles, setHooksAndTitles] = useState("");
  const [script, setScript] = useState("");
  const [loading, setLoading] = useState(initialLoading);
  const [error, setError] = useState("");

  async function runAction(action, callback) {
    setError("");
    setLoading((current) => ({ ...current, [action]: true }));

    try {
      await callback();
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Something went wrong while generating content."
      );
    } finally {
      setLoading((current) => ({ ...current, [action]: false }));
    }
  }

  function ensureValue(value, message) {
    if (!value.trim()) {
      setError(message);
      return false;
    }

    return true;
  }

  function handleUseIdea(idea) {
    setTopic(idea);
    setHooksAndTitles("");
    setScript("");
  }

  function handleNicheChange(value) {
    setNiche(value);
    setIdeas("");
    setTopic("");
    setHooksAndTitles("");
    setScript("");
  }

  function handleTopicChange(value) {
    setTopic(value);
    setHooksAndTitles("");
    setScript("");
  }

  return (
    <main className="relative overflow-hidden">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <WorkspacePanel
          niche={niche}
          setNiche={handleNicheChange}
          topic={topic}
          setTopic={handleTopicChange}
        >
          <div className="flex flex-col gap-4 border-t border-white/10 pt-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-3">
              <ActionButton
                onClick={() => {
                  if (!ensureValue(niche, "Enter a niche before generating ideas.")) {
                    return;
                  }

                  runAction("ideas", async () => {
                    const data = await fetchVideoIdeas(niche.trim());
                    setIdeas(data.ideas || "");
                  });
                }}
                isLoading={loading.ideas}
                className="min-w-44"
              >
                Generate Video Ideas
              </ActionButton>

              <ActionButton
                variant="secondary"
                onClick={() => {
                  if (
                    !ensureValue(
                      topic,
                      "Choose or enter a topic before generating hooks and titles."
                    )
                  ) {
                    return;
                  }

                  runAction("hooks", async () => {
                    const data = await fetchHooksAndTitles(topic.trim());
                    setHooksAndTitles(data.result || "");
                  });
                }}
                isLoading={loading.hooks}
                className="min-w-44"
              >
                Generate Hooks & Titles
              </ActionButton>

              <ActionButton
                variant="ghost"
                onClick={() => {
                  if (
                    !ensureValue(
                      topic,
                      "Choose or enter a topic before generating the script."
                    )
                  ) {
                    return;
                  }

                  runAction("script", async () => {
                    const data = await fetchScript(topic.trim());
                    setScript(data.script || "");
                  });
                }}
                isLoading={loading.script}
                className="min-w-44"
              >
                Generate Full Script
              </ActionButton>
            </div>

            <div className="flex flex-wrap gap-2">
              <StatusPill tone="info">Step 1: Niche</StatusPill>
              <StatusPill tone={ideas ? "success" : "default"}>
                Step 2: Ideas
              </StatusPill>
              <StatusPill tone={hooksAndTitles ? "success" : "default"}>
                Step 3: Hooks & Titles
              </StatusPill>
              <StatusPill tone={script ? "success" : "default"}>
                Step 4: Script
              </StatusPill>
            </div>
          </div>

          {error ? (
            <div className="mt-5 rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
              {error}
            </div>
          ) : null}
        </WorkspacePanel>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <OutputCard
            eyebrow="Stage 01"
            title="Video Ideas"
            description="Generate niche-relevant concepts and click one to promote it into the next stage."
            action={
              ideas ? (
                <StatusPill tone="success">Idea bank ready</StatusPill>
              ) : (
                <StatusPill>Waiting for niche</StatusPill>
              )
            }
          >
            <IdeaList ideas={ideas} onUseIdea={handleUseIdea} />
          </OutputCard>

          <OutputCard
            eyebrow="Stage 02"
            title="Hooks & Titles"
            description="Use your selected topic to generate stronger openers and clickable headline directions."
            action={
              loading.hooks ? (
                <StatusPill tone="info">Generating...</StatusPill>
              ) : hooksAndTitles ? (
                <StatusPill tone="success">Ready to refine</StatusPill>
              ) : (
                <StatusPill>Topic required</StatusPill>
              )
            }
          >
            <TextOutput
              content={hooksAndTitles}
              placeholder="Hooks and titles will appear here after you choose a topic and run the generator."
              variant="default"
            />
          </OutputCard>
        </div>

        <div className="mt-6 pb-8">
          <OutputCard
            eyebrow="Stage 03"
            title="Generated Script"
            description="Build the long-form script only after you have a topic you want to move forward with."
            action={
              loading.script ? (
                <StatusPill tone="info">Writing script...</StatusPill>
              ) : script ? (
                <StatusPill tone="success">Script ready</StatusPill>
              ) : (
                <StatusPill>Topic required</StatusPill>
              )
            }
          >
            <TextOutput
              content={script}
              placeholder="The full video script will render here once you generate it."
              variant="script"
            />
          </OutputCard>
        </div>
      </div>
    </main>
  );
}

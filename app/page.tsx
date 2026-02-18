"use client";

import { useRef } from "react";
import { useChat } from "ai/react";
import clsx from "clsx";
import { LoadingCircle, SendIcon, UserIcon } from "./icons";
import Textarea from "react-textarea-autosize";
import Image from "next/image";

const examples = [
  "What should I do to live a better life?",
  "do a first draft of a poem about coral",
  "Is this something you're navigating right now?",
];

export default function Chat() {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { messages, input, setInput, handleSubmit, isLoading } = useChat({
    onResponse: (response) => {
      if (response.status === 429) {
        window.alert("You have reached your request limit for the day.");
      }
    },
  });

  const disabled = isLoading || input.length === 0;

  return (
    <main className="flex min-h-screen flex-col items-center bg-[#0e0e11] text-white">
      {/* Header */}
      <header className="fixed top-0 z-10 w-full border-b border-white/5 bg-[#0e0e11]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-screen-md items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="relative h-8 w-8 overflow-hidden rounded-full ring-1 ring-white/10">
              <Image src="/sample-image.png" alt="poet" fill className="object-cover" />
            </div>
            <span className="text-sm font-medium text-white/80">Annoying Poet</span>
          </div>
          <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300 ring-1 ring-violet-500/20">
            fine-tuned GPT-4
          </span>
        </div>
      </header>

      {/* Messages / Empty state */}
      <div className="w-full max-w-screen-md flex-1 px-4 pb-48 pt-24 sm:px-0">
        {messages.length > 0 ? (
          <div className="flex flex-col gap-6">
            {messages.map((message, i) => (
              <div
                key={i}
                className={clsx(
                  "flex items-start gap-4",
                  message.role === "user" ? "flex-row-reverse" : "flex-row",
                )}
              >
                {/* Avatar */}
                <div className="mt-0.5 shrink-0">
                  {message.role === "user" ? (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-600">
                      <UserIcon />
                    </div>
                  ) : (
                    <div className="relative h-8 w-8 overflow-hidden rounded-full ring-1 ring-white/10">
                      <Image src="/sample-image.png" alt="poet" fill className="object-cover" />
                    </div>
                  )}
                </div>

                {/* Bubble */}
                <div
                  className={clsx(
                    "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                    message.role === "user"
                      ? "rounded-tr-sm bg-violet-600 text-white"
                      : "rounded-tl-sm bg-white/5 text-white/85 ring-1 ring-white/10",
                  )}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-start gap-4">
                <div className="relative mt-0.5 h-8 w-8 shrink-0 overflow-hidden rounded-full ring-1 ring-white/10">
                  <Image src="/sample-image.png" alt="poet" fill className="object-cover" />
                </div>
                <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm bg-white/5 px-4 py-3 ring-1 ring-white/10">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/40 [animation-delay:0ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/40 [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/40 [animation-delay:300ms]" />
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Landing card */
          <div className="mt-8 overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] shadow-2xl">
            <div className="flex flex-col gap-5 p-8">
              <div className="relative h-14 w-14 overflow-hidden rounded-2xl shadow-lg ring-1 ring-white/10">
                <Image src="/sample-image.png" alt="poet" fill className="object-cover" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-white">
                  Hi, I'm a fine-tuned LLM emulating an Annoying Poet.
                </h1>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  Part of a series of computational experiments taught by{" "}
                  <a
                    href="https://linkin.bio/yallahalim/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-violet-400 underline underline-offset-4 transition-colors hover:text-violet-300"
                  >
                    Halim Madi
                  </a>
                  , built on{" "}
                  <a
                    href="https://openai.com/blog/gpt-3-5-turbo-fine-tuning-and-api-updates"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-violet-400 underline underline-offset-4 transition-colors hover:text-violet-300"
                  >
                    fine-tuned GPT-4
                  </a>
                  .
                </p>
              </div>
            </div>

            <div className="border-t border-white/5 bg-white/[0.02] p-8">
              <p className="mb-4 text-xs font-medium uppercase tracking-widest text-white/30">
                Try asking
              </p>
              <div className="flex flex-col gap-2">
                {examples.map((ex, i) => (
                  <button
                    key={i}
                    onClick={() => { setInput(ex); inputRef.current?.focus(); }}
                    className="w-full rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3 text-left text-sm text-white/60 transition-all hover:border-violet-500/30 hover:bg-violet-500/5 hover:text-white/90 active:scale-[0.99]"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className="fixed bottom-0 w-full">
        <div className="mx-auto max-w-screen-md px-4 pb-6 sm:px-0">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="relative rounded-2xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-md transition-all focus-within:border-violet-500/40 focus-within:bg-white/[0.07]"
          >
            <Textarea
              ref={inputRef}
              tabIndex={0}
              required
              rows={1}
              autoFocus
              placeholder="Send a message…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  formRef.current?.requestSubmit();
                  e.preventDefault();
                }
              }}
              spellCheck={false}
              className="w-full resize-none bg-transparent px-5 py-4 pr-14 text-sm text-white placeholder-white/25 focus:outline-none"
            />
            <button
              disabled={disabled}
              className={clsx(
                "absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-xl transition-all",
                disabled
                  ? "cursor-not-allowed bg-white/5 text-white/20"
                  : "bg-violet-600 text-white shadow-lg shadow-violet-500/25 hover:bg-violet-500",
              )}
            >
              {isLoading ? <LoadingCircle /> : <SendIcon className="h-4 w-4" />}
            </button>
          </form>

          <p className="mt-3 text-center text-xs text-white/20">
            Built with{" "}
            <a href="https://sdk.vercel.ai/docs" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white/40 transition-colors">
              Vercel AI SDK
            </a>{" "}
            &{" "}
            <a href="https://openai.com/blog/gpt-3-5-turbo-fine-tuning-and-api-updates" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white/40 transition-colors">
              OpenAI
            </a>
            , as part of a course by{" "}
            <a href="https://linkin.bio/yallahalim/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white/40 transition-colors">
              Halim Madi
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}

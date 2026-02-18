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

const coralImages = [
  {
    src: "https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=800&q=80",
    alt: "Vibrant coral reef with tropical fish",
  },
  {
    src: "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800&q=80",
    alt: "Pink and orange coral close-up",
  },
  {
    src: "https://images.unsplash.com/photo-1559827291-72f26a23f3b7?w=800&q=80",
    alt: "Underwater coral garden",
  },
  {
    src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80",
    alt: "Deep coral reef",
  },
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
    <main className="flex min-h-screen flex-col items-center bg-[#0a0d14] text-white">

      {/* Ambient coral hero — visible on empty state */}
      {messages.length === 0 && (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          {/* full-bleed mosaic */}
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
            {coralImages.map((img, i) => (
              <div key={i} className="relative overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover opacity-20 saturate-[0.6]"
                  sizes="50vw"
                />
              </div>
            ))}
          </div>
          {/* dark vignette so text stays readable */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0d14]/60 via-[#0a0d14]/70 to-[#0a0d14]" />
        </div>
      )}

      {/* Header */}
      <header className="fixed top-0 z-20 w-full border-b border-white/5 bg-[#0a0d14]/80 backdrop-blur-md">
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
      <div className="relative z-10 w-full max-w-screen-md flex-1 px-4 pb-48 pt-24 sm:px-0">
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
          <div className="mt-8 overflow-hidden rounded-2xl border border-white/5 bg-white/[0.04] shadow-2xl backdrop-blur-sm">

            {/* Coral photo strip */}
            <div className="relative h-44 w-full overflow-hidden">
              <div className="absolute inset-0 flex">
                {coralImages.map((img, i) => (
                  <div key={i} className="relative flex-1">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="25vw"
                    />
                  </div>
                ))}
              </div>
              {/* bottom fade into card */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#111318] to-transparent" />
              <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[#0a0d14]/60 to-transparent" />
            </div>

            {/* Intro */}
            <div className="flex flex-col gap-4 px-8 pb-6 pt-4">
              <div className="relative -mt-10 h-14 w-14 overflow-hidden rounded-2xl shadow-lg ring-1 ring-white/10">
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

            {/* Prompts */}
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

            {/* Coral thumbnail row at bottom */}
            <div className="flex gap-2 border-t border-white/5 bg-white/[0.02] p-4">
              {coralImages.map((img, i) => (
                <div key={i} className="relative h-14 flex-1 overflow-hidden rounded-lg ring-1 ring-white/5">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover opacity-70 transition-opacity hover:opacity-100"
                    sizes="10vw"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className="fixed bottom-0 z-20 w-full">
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
            <a href="https://sdk.vercel.ai/docs" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 transition-colors hover:text-white/40">
              Vercel AI SDK
            </a>{" "}
            &{" "}
            <a href="https://openai.com/blog/gpt-3-5-turbo-fine-tuning-and-api-updates" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 transition-colors hover:text-white/40">
              OpenAI
            </a>
            , as part of a course by{" "}
            <a href="https://linkin.bio/yallahalim/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 transition-colors hover:text-white/40">
              Halim Madi
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}

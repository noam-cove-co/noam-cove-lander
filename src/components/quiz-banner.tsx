"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/config/site";

const line = ["How much room do you need", "A short quiz", "Then join the list"];

export function QuizBanner() {
  const pathname = usePathname();
  if (pathname === site.room.path) return null;

  const loop = [...line, ...line, ...line, ...line];

  return (
    <Link href={site.room.path} className="quiz-banner block overflow-hidden border-y border-foreground/15">
      <span className="sr-only">How much room do you need? Take the short quiz, then join the list.</span>
      <div className="quiz-banner-track flex w-max" aria-hidden>
        {[0, 1].map((copy) => (
          <span key={copy} className="flex items-center py-1.5">
            {loop.map((phrase, index) => (
              <span
                key={`${copy}-${index}`}
                className="flex items-center font-serif text-[0.92rem] leading-none tracking-tight text-foreground/80"
              >
                <span className="px-3.5">{phrase}</span>
                <span className="text-foreground/35">·</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </Link>
  );
}

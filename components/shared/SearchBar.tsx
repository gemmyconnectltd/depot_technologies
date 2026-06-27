"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef, type FormEvent } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  }

  function handleChange(value: string) {
    setQuery(value);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const trimmed = value.trim();
      if (trimmed) {
        router.push(`/search?q=${encodeURIComponent(trimmed)}`);
      }
    }, 300);
  }

  if (!mounted) {
    return (
      <div
        className={cn(
          "hidden md:flex items-center",
          "h-9 w-48 rounded-lg",
          "bg-zinc-100 border border-zinc-200"
        )}
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "hidden md:flex items-center gap-2",
        "h-9 px-3 rounded-lg",
        "bg-zinc-100 border border-zinc-200",
        "focus-within:border-electronics focus-within:ring-1",
        "focus-within:ring-electronics/30",
        "motion-safe:transition-all duration-150"
      )}
    >
      <Search size={15} className="text-zinc-400 shrink-0" aria-hidden />
      <input
        ref={inputRef}
        type="search"
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Search products..."
        aria-label="Search products"
        className={cn(
          "flex-1 bg-transparent text-sm",
          "text-zinc-900 placeholder:text-zinc-400",
          "border-none outline-none focus:outline-none"
        )}
      />
    </form>
  );
}

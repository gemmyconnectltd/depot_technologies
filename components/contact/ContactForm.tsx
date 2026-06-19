"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 py-12 text-center">
        <span className="text-4xl">✅</span>
        <p className="font-semibold text-zinc-900">Message sent!</p>
        <p className="text-sm text-zinc-500">
          We'll get back to you within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full Name *" id="name" type="text" />
        <Field label="Email *" id="email" type="email" />
      </div>
      <Field label="Company" id="company" type="text" />
      <Field label="Subject *" id="subject" type="text" />
      <div className="space-y-1.5">
        <label
          htmlFor="message"
          className="block text-sm font-medium text-zinc-700"
        >
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className={cn(
            "w-full h-10 min-h-24 rounded-lg px-3 py-2.5",
            "border border-zinc-200 bg-white",
            "text-sm text-zinc-900 placeholder:text-zinc-400",
            "focus:outline-none focus:ring-2 focus:ring-blue-500",
            "motion-safe:transition-colors duration-150",
            "resize-y"
          )}
          placeholder="Tell us what you need..."
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className={cn(
          "w-full inline-flex items-center justify-center gap-2",
          "px-6 py-3 rounded-lg text-sm font-medium",
          "bg-blue-600 text-white hover:bg-blue-500",
          "disabled:opacity-60 disabled:cursor-not-allowed",
          "motion-safe:transition-colors duration-150",
          "focus-visible:outline-none",
          "focus-visible:ring-2 focus-visible:ring-blue-500"
        )}
      >
        {loading ? "Sending…" : (
          <><Send size={15} aria-hidden /> Send Message</>
        )}
      </button>
    </form>
  );
}

function Field({
  label,
  id,
  type,
}: {
  label: string;
  id: string;
  type: string;
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-zinc-700"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={label.includes("*")}
        className={cn(
          "w-full h-10 rounded-lg px-3",
          "border border-zinc-200 bg-white",
          "text-sm text-zinc-900 placeholder:text-zinc-400",
          "focus:outline-none focus:ring-2 focus:ring-blue-500",
          "motion-safe:transition-colors duration-150"
        )}
      />
    </div>
  );
}

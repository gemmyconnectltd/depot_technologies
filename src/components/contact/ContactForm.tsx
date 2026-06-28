"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { contactSchema } from "@/lib/validations";

interface FieldErrors {
  name?: string[];
  email?: string[];
  company?: string[];
  subject?: string[];
  message?: string[];
}

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    const form = new FormData(e.currentTarget);
    const data = {
      name: form.get("name") as string,
      email: form.get("email") as string,
      company: (form.get("company") as string) || undefined,
      subject: form.get("subject") as string,
      message: form.get("message") as string,
    };

    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      setFieldErrors(
        parsed.error.flatten().fieldErrors as FieldErrors
      );
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error ?? "Failed to send message");
      }

      setSent(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 py-12 text-center">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100">
          <CheckCircle size={28} className="text-emerald-600" />
        </div>
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
        <Field
          label="Full Name *"
          id="name"
          type="text"
          error={fieldErrors.name?.[0]}
        />
        <Field
          label="Email *"
          id="email"
          type="email"
          error={fieldErrors.email?.[0]}
        />
      </div>
      <Field
        label="Company"
        id="company"
        type="text"
        error={fieldErrors.company?.[0]}
      />
      <Field
        label="Subject *"
        id="subject"
        type="text"
        error={fieldErrors.subject?.[0]}
      />
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
            "border bg-white",
            "text-sm text-zinc-900 placeholder:text-zinc-400",
            "focus:outline-none focus:ring-2 focus:ring-blue-500",
            "motion-safe:transition-colors duration-150",
            "resize-y",
            fieldErrors.message?.[0]
              ? "border-red-300 focus:ring-red-500"
              : "border-zinc-200"
          )}
          placeholder="Tell us what you need..."
        />
        {fieldErrors.message?.[0] && (
          <p className="text-xs text-red-600 mt-1">
            {fieldErrors.message[0]}
          </p>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 rounded-lg px-4 py-3">
          <AlertCircle size={16} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

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
        {loading ? (
          <>
            <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send size={15} aria-hidden />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}

function Field({
  label,
  id,
  type,
  error,
}: {
  label: string;
  id: string;
  type: string;
  error?: string;
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
          "bg-white text-sm text-zinc-900 placeholder:text-zinc-400",
          "focus:outline-none focus:ring-2 focus:ring-blue-500",
          "motion-safe:transition-colors duration-150",
          error ? "border border-red-300" : "border border-zinc-200"
        )}
      />
      {error && (
        <p className="text-xs text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
}

import type { Metadata } from "next";
import PageHeader from "@/components/shared/PageHeader";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";
import { cn } from "@/lib/utils/cn";

export const metadata: Metadata = {
  title: "Contact — Depot Technologies",
  description: "Get in touch. We respond within one business day.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="Fill in the form and our team will get back to you within one business day."
      />
      <section
        aria-label="Contact"
        className="bg-zinc-50 py-12 px-6"
      >
        <div
          className={cn(
            "mx-auto max-w-6xl",
            "grid gap-12 lg:grid-cols-2"
          )}
        >
          <ContactInfo />
          <div
            className={cn(
              "rounded-2xl border border-zinc-200",
              "bg-white p-8"
            )}
          >
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}

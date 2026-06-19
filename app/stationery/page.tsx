import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import SectionHeader from "@/components/shared/SectionHeader";
import ProductGrid from "@/components/shared/ProductGrid";
import CTABanner from "@/components/shared/CTABanner";
import { STATIONERY_PRODUCTS } from "@/lib/data/stationery";

export const metadata: Metadata = {
  title: "Stationery — Depot Technologies",
  description:
    "Pens, paper, notebooks and office supplies "
    + "for every workspace.",
};

export default function StationeryPage() {
  return (
    <>
      <PageHero
        label="Stationery"
        title="Office supplies for every workspace"
        subtitle={
          "High-quality writing instruments, paper, "
          + "notebooks and desk essentials sourced "
          + "from trusted suppliers."
        }
        primaryCta={{ label: "Request a Quote", href: "/contact" }}
      />
      <section
        aria-label="Stationery products"
        className="bg-zinc-50 py-20 px-6"
      >
        <div className="mx-auto max-w-6xl space-y-10">
          <SectionHeader
            label="Our range"
            title="Everything your office needs"
            subtitle="From pens and paper to complete filing systems."
          />
          <ProductGrid products={STATIONERY_PRODUCTS} />
        </div>
      </section>
      <CTABanner
        title="Need bulk stationery for your office?"
        subtitle={
          "We offer flexible pricing for bulk orders. "
          + "Reach out and we'll put together a custom quote."
        }
        cta={{ label: "Request a Quote", href: "/contact" }}
      />
    </>
  );
}

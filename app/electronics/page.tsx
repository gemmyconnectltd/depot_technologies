import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import SectionHeader from "@/components/shared/SectionHeader";
import ProductGrid from "@/components/shared/ProductGrid";
import CTABanner from "@/components/shared/CTABanner";
import { ELECTRONICS_PRODUCTS } from "@/lib/data/electronics";

export const metadata: Metadata = {
  title: "Electronics — Depot Technologies",
  description:
    "Devices, components, cables and hardware "
    + "built for performance.",
};

export default function ElectronicsPage() {
  return (
    <>
      <PageHero
        label="Electronics"
        title="Hardware built for performance"
        subtitle={
          "From computing devices and components to cables "
          + "and networking hardware — we supply the tech "
          + "that keeps your business running."
        }
        primaryCta={{ label: "Request a Quote", href: "/contact" }}
      />
      <section
        aria-label="Electronics products"
        className="bg-zinc-50 py-20 px-6"
      >
        <div className="mx-auto max-w-6xl space-y-10">
          <SectionHeader
            label="Our range"
            title="End-to-end electronics supply"
            subtitle={
              "Devices, components and infrastructure "
              + "hardware from verified suppliers."
            }
          />
          <ProductGrid products={ELECTRONICS_PRODUCTS} />
        </div>
      </section>
      <CTABanner
        title="Looking for a specific device or component?"
        subtitle={
          "Tell us what you need and we'll source it. "
          + "Bulk orders welcome."
        }
        cta={{ label: "Get in Touch", href: "/contact" }}
      />
    </>
  );
}

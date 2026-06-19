import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import SectionHeader from "@/components/shared/SectionHeader";
import ProductGrid from "@/components/shared/ProductGrid";
import CTABanner from "@/components/shared/CTABanner";
import { SOFTWARE_PRODUCTS } from "@/lib/data/software";

export const metadata: Metadata = {
  title: "Software & Projects — Depot Technologies",
  description:
    "Licenses, subscriptions and digital assets "
    + "for modern teams.",
};

export default function SoftwarePage() {
  return (
    <>
      <PageHero
        label="Software & Projects"
        title="Digital tools for modern teams"
        subtitle={
          "Genuine software licenses, cloud subscriptions "
          + "and digital assets — sourced, managed and "
          + "delivered to your team."
        }
        primaryCta={{ label: "Request a Quote", href: "/contact" }}
      />
      <section
        aria-label="Software products"
        className="bg-zinc-50 py-20 px-6"
      >
        <div className="mx-auto max-w-6xl space-y-10">
          <SectionHeader
            label="Our range"
            title="Software solutions for every team"
            subtitle={
              "From productivity licenses to cloud "
              + "infrastructure and developer tools."
            }
          />
          <ProductGrid products={SOFTWARE_PRODUCTS} />
        </div>
      </section>
      <CTABanner
        title="Need software for your entire organisation?"
        subtitle={
          "We handle volume licensing and renewals. "
          + "Let us simplify your software procurement."
        }
        cta={{ label: "Talk to Us", href: "/contact" }}
      />
    </>
  );
}

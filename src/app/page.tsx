import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/shared/PageHero";
import CTABanner from "@/components/shared/CTABanner";
import HomeCategories from "@/components/home/HomeCategories";
import HomeBrands from "@/components/home/HomeBrands";
import ProductCatalog from "@/components/shared/ProductCatalog";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Depot Technologies — Quality Materials Supply",
  description: "Stationery, electronics and software solutions for businesses.",
};

export default function HomePage() {
  return (
    <>
      <PageHero
        label="Depot Technologies"
        title="Materials that power your business"
        subtitle={
          "From office stationery to enterprise electronics "
          + "and software — everything your team needs "
          + "to operate at its best."
        }
        primaryCta={{ label: "Explore Products", href: "/products" }}
        secondaryCta={{ label: "Contact Us", href: "/contact" }}
      />
      <HomeCategories />
      <HomeBrands />
      <section aria-label="Featured products" className="bg-zinc-50 py-8 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-zinc-900">Featured Products</h2>
            <Link
              href="/products"
              className="inline-flex items-center gap-1 text-sm text-electronics hover:text-electronics-bar font-medium"
            >
              See all <ArrowRight size={14} />
            </Link>
          </div>
          <ProductCatalog featured limit={8} columns={4} />
        </div>
      </section>
      <CTABanner
        title="Ready to streamline your supply chain?"
        subtitle="Get in touch and let us handle your material needs so you can focus on what matters."
        cta={{ label: "Get in Touch", href: "/contact" }}
      />
    </>
  );
}

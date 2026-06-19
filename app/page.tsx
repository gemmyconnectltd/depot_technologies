import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import CTABanner from "@/components/shared/CTABanner";
import HomeStats from "@/components/home/HomeStats";
import HomeCategories from "@/components/home/HomeCategories";
import HomeWhyUs from "@/components/home/HomeWhyUs";

export const metadata: Metadata = {
  title: "Depot Technologies — Quality Materials Supply",
  description:
    "Stationery, electronics and software solutions "
    + "for businesses.",
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
        primaryCta={{ label: "Explore Products", href: "/stationery" }}
        secondaryCta={{ label: "Contact Us", href: "/contact" }}
      />
      <HomeStats />
      <HomeCategories />
      <HomeWhyUs />
      <CTABanner
        title="Ready to streamline your supply chain?"
        subtitle={
          "Get in touch and let us handle your material "
          + "needs so you can focus on what matters."
        }
        cta={{ label: "Get in Touch", href: "/contact" }}
      />
    </>
  );
}

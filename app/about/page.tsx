import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import CTABanner from "@/components/shared/CTABanner";
import AboutMission from "@/components/about/AboutMission";
import AboutValues from "@/components/about/AboutValues";

export const metadata: Metadata = {
  title: "About — Depot Technologies",
  description:
    "Learn about Depot Technologies — who we are "
    + "and how we serve our clients.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About Us"
        title="We supply the materials that move businesses forward"
        subtitle={
          "Built on one idea — procurement should be "
          + "simple, fast and completely reliable."
        }
      />
      <AboutMission />
      <AboutValues />
      <CTABanner
        title="Want to work with us?"
        subtitle={
          "We'd love to learn about your business "
          + "and find ways to support your team."
        }
        cta={{ label: "Get in Touch", href: "/contact" }}
      />
    </>
  );
}

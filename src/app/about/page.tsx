import type { Metadata } from "next";
import PageHeader from "@/components/shared/PageHeader";
import CTABanner from "@/components/shared/CTABanner";
import AboutMission from "@/components/about/AboutMission";
import AboutValues from "@/components/about/AboutValues";

export const metadata: Metadata = {
  title: "About — Depot Technologies",
  description: "Learn about Depot Technologies — who we are and how we serve our clients.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Us"
        subtitle="Built on one idea — procurement should be simple, fast and completely reliable."
      />
      <AboutMission />
      <AboutValues />
      <CTABanner
        title="Want to work with us?"
        subtitle="We'd love to learn about your business and find ways to support your team."
        cta={{ label: "Get in Touch", href: "/contact" }}
      />
    </>
  );
}

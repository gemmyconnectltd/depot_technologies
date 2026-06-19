import Image from "next/image";
import SectionHeader from "@/components/shared/SectionHeader";
import { cn } from "@/lib/utils/cn";

export default function AboutMission() {
  return (
    <section
      aria-label="Our mission"
      className="bg-white py-20 px-6"
    >
      <div
        className={cn(
          "mx-auto max-w-6xl",
          "grid gap-12 lg:grid-cols-2 items-center"
        )}
      >
        <SectionHeader
          label="Our Mission"
          title="Simplifying procurement for modern businesses"
          subtitle={
            "We exist to remove the friction from material "
            + "sourcing. Whether you need a single notebook "
            + "or a warehouse full of electronics — "
            + "we handle it end to end."
          }
        />

        <div
          className={cn(
            "relative rounded-2xl overflow-hidden h-72",
            "border border-zinc-200"
          )}
        >
          <Image
            src={
              "https://images.unsplash.com/photo-1497366216548"
              + "-37526070297c?w=800&q=80"
            }
            alt="Modern office and warehouse operations"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div
            aria-hidden
            className={cn(
              "absolute inset-0",
              "bg-gradient-to-t from-slate-900/70 to-transparent"
            )}
          />
          <p
            className={cn(
              "absolute bottom-6 left-6 right-6",
              "text-lg font-bold text-white leading-snug"
            )}
          >
            "One supplier. Three categories. Zero compromise."
          </p>
        </div>
      </div>
    </section>
  );
}

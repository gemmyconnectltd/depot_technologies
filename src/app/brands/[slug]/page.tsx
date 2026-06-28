import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db/prisma";
import { BRANDS } from "@/lib/constants/brands";
import ProductCatalog from "@/components/shared/ProductCatalog";
import CTABanner from "@/components/shared/CTABanner";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  return BRANDS.map((brand) => ({ slug: brand.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const brand = BRANDS.find((b) => b.slug === slug);
  if (!brand) return { title: "Brand Not Found — Depot Technologies" };
  return {
    title: `${brand.name} — Depot Technologies`,
    description: brand.description,
  };
}

export default async function BrandPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brand = BRANDS.find((b) => b.slug === slug);
  if (!brand) notFound();

  const count = await prisma.product.count({
    where: { brand: brand.name, active: true },
  });

  return (
    <>
      <div className="bg-white border-b border-zinc-200">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <Link
            href="/products"
            className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-700 mb-3"
          >
            <ArrowLeft size={14} />
            Back to products
          </Link>
          <div className="flex items-center gap-6">
            <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-zinc-50 shrink-0">
              <Image
                src={brand.image}
                alt={brand.imageAlt}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
                {brand.name}
              </h1>
              <p className="text-sm text-zinc-500 mt-0.5">
                {brand.description} &middot; {count} product{count !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-zinc-50 min-h-screen">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <ProductCatalog brand={brand.name} columns={4} />
        </div>
      </div>
      <CTABanner
        title={`Need bulk ${brand.name} products?`}
        subtitle="We offer flexible pricing for bulk orders. Reach out and we'll put together a custom quote."
        cta={{ label: "Request a Quote", href: "/contact" }}
      />
    </>
  );
}

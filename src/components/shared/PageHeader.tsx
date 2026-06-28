import { cn } from "@/lib/utils/cn";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section
      aria-label="Page header"
      className="bg-white border-b border-zinc-200"
    >
      <div className="mx-auto max-w-6xl px-6 py-6 sm:py-8">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-sm text-zinc-500 max-w-xl">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}

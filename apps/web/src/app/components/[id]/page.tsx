import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { componentsRegistry } from "@shapecrate/components";
import { ComponentDetail } from "@/components/preview/ComponentDetail";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return componentsRegistry.map((component) => ({
    id: component.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const item = componentsRegistry.find((c) => c.id === id);

  if (!item) {
    return {
      title: "Component Not Found | Shapecrate",
    };
  }

  return {
    title: `${item.title} — Shapecrate`,
    description: item.description,
  };
}

export default async function ComponentPage({ params }: PageProps) {
  const { id } = await params;
  const item = componentsRegistry.find((c) => c.id === id);

  if (!item) {
    notFound();
  }

  return <ComponentDetail id={id} />;
}


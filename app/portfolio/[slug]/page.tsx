import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import { CaseStudyClient } from "@/components/portfolio/CaseStudyClient";
import { SITE_URL } from "@/lib/config";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  const fullUrl = `${SITE_URL}/portfolio/${project.slug}`;
  const rawImage = project.images?.[0]?.src;
  const imageUrl = rawImage
    ? rawImage.startsWith("http")
      ? rawImage
      : `${SITE_URL}${rawImage}`
    : `${SITE_URL}/images/og/home.jpg`;

  return {
    title: `${project.title} — Case Study | Hamsalekha`,
    description: project.summary,
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title: `${project.title} — Case Study | Hamsalekha`,
      description: project.summary,
      url: fullUrl,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: project.title }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Case Study | Hamsalekha`,
      description: project.summary,
      images: [imageUrl],
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((p) => p.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = projects[projectIndex];
  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <CaseStudyClient
      project={project}
      nextProject={{ slug: nextProject.slug, title: nextProject.title }}
    />
  );
}

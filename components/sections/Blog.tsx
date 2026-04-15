import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { LinkRippleText } from "@/components/ui/LinkRippleText";

type BlogSectionProps = {
  posts: BlogPost[];
};

export function BlogSection({ posts }: BlogSectionProps) {
  return (
    <section className="section-space">
      <div className="section-shell">
        <SectionHeader label="Publicationen" marker="(SKWKHS® — 08)" />
        <div className="mb-10 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-5xl space-y-4">
            <h2 className="display-lg">Gedanken zu Struktur, Websites und digitaler Klarheit.</h2>
            <p className="text-lg leading-8 text-muted">
              Notizen aus Projekten, Relaunches und Systementscheidungen, die
              später selten auf der fertigen Startseite sichtbar sind, aber dort
              fast immer den Unterschied machen.
            </p>
          </div>
          <Link href="/blog" className="link-arrow">
            <LinkRippleText text="Zum Blog" baseWeight={560} />
          </Link>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <ArticleCard key={post.slug} post={post} variant="home" />
          ))}
        </div>
      </div>
    </section>
  );
}

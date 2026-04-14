import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import { LinkRippleText } from "@/components/ui/LinkRippleText";

type ArticleCardProps = {
  post: BlogPost;
};

export function ArticleCard({ post }: ArticleCardProps) {
  const published = new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(post.publishedAt));

  return (
    <article className="flex h-full flex-col justify-between border-t border-border pt-6">
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4 text-[length:var(--label)] uppercase tracking-[0.3em] text-muted">
          <span>{post.category}</span>
          <span>{post.readingTime}</span>
        </div>
        <h3 className="text-2xl font-semibold tracking-tight">{post.title}</h3>
        <p className="text-muted">{post.excerpt}</p>
      </div>
      <div className="mt-8 flex items-center justify-between gap-4 text-sm text-muted">
        <span>{published}</span>
        <Link href={`/blog/${post.slug}`} className="link-arrow">
          <LinkRippleText text="Weiterlesen" baseWeight={560} /> <span aria-hidden>↗</span>
        </Link>
      </div>
    </article>
  );
}

import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

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
    <article className="glass-card flex h-full flex-col justify-between p-6 md:p-8">
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4 text-[length:var(--label)] uppercase tracking-[0.3em] text-muted">
          <span className="flex items-center gap-3">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: post.accent }}
            />
            <span>{post.category}</span>
          </span>
          <span>{post.readingTime}</span>
        </div>
        <h3 className="text-2xl font-semibold tracking-tight">{post.title}</h3>
        <p className="text-muted">{post.excerpt}</p>
      </div>
      <div className="mt-8 flex items-center justify-between gap-4 text-sm text-muted">
        <span>{published}</span>
        <Link href={`/blog/${post.slug}`} className="link-arrow">
          Weiterlesen <span aria-hidden>↗</span>
        </Link>
      </div>
    </article>
  );
}

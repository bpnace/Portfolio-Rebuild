import type { Metadata } from "next";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notizen zu Websites, Relaunches, Technik und digitaler Klarheit.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    url: "/blog",
    title: "Blog | STACKWERKHAUS",
    description: "Notizen zu Websites, Relaunches, Technik und digitaler Klarheit.",
  },
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <main className="section-space">
      <div className="section-shell">
        <div className="max-w-4xl space-y-6">
          <div className="eyebrow">Notizen</div>
          <h1 className="display-lg">Blog, Analysen und praktische Notizen aus Projekten.</h1>
          <p className="text-lg leading-8 text-muted">
            Gedanken zu Struktur, Relaunches, Tool-Entscheidungen und der Frage,
            wie Websites Klarheit statt zusätzliche Reibung erzeugen.
          </p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { renderDrupalRichText } from "@/components/DrupalRichText";
import { CustomMDX } from "@/components/mdx";
import { getDrupalPlainTextParagraphs } from "@/lib/drupal-rich-text.mjs";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Nicht gefunden",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      url: `/blog/${post.slug}`,
      title: `${post.title} | STACKWERKHAUS`,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const published = new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(post.publishedAt));
  let drupalContent: ReactNode = null;

  if (post.source === "drupal") {
    try {
      drupalContent = renderDrupalRichText(post.drupalHtml);
    } catch (error) {
      console.error(`Failed to render Drupal rich text for slug "${post.slug}"`, error);
      const paragraphs = getDrupalPlainTextParagraphs(post.drupalPlainText);
      drupalContent = paragraphs.map((paragraph: string, index: number) => (
        <p key={`${post.slug}-fallback-${index}`}>{paragraph}</p>
      ));
    }
  }

  return (
    <main className="section-space">
      <article className="section-shell">
        <div className="max-w-4xl space-y-6">
          <div className="flex flex-wrap items-center gap-4 text-[length:var(--label)] uppercase tracking-[0.3em] text-muted">
            <span>{post.category}</span>
            <span>{published}</span>
            <span>{post.readingTime}</span>
          </div>
          <h1 className="display-lg">{post.title}</h1>
          <p className="max-w-3xl text-lg leading-8 text-muted">{post.excerpt}</p>
        </div>
        <div className="mt-14">
          {post.source === "drupal" ? (
            <div className="mdx-body">{drupalContent}</div>
          ) : (
            <CustomMDX source={post.mdxSource} />
          )}
        </div>
      </article>
    </main>
  );
}

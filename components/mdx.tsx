import type { ComponentPropsWithoutRef } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";

const components = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => <h2 {...props} />,
  h3: (props: ComponentPropsWithoutRef<"h3">) => <h3 {...props} />,
  p: (props: ComponentPropsWithoutRef<"p">) => <p {...props} />,
  ul: (props: ComponentPropsWithoutRef<"ul">) => <ul {...props} />,
  ol: (props: ComponentPropsWithoutRef<"ol">) => <ol {...props} />,
  li: (props: ComponentPropsWithoutRef<"li">) => <li {...props} />,
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote {...props} />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => <a {...props} />,
  hr: (props: ComponentPropsWithoutRef<"hr">) => (
    <hr {...props} className="border-border" />
  ),
};

type CustomMDXProps = {
  source: string;
};

export async function CustomMDX({ source }: CustomMDXProps) {
  return (
    <div className="mdx-body">
      <MDXRemote source={source} components={components} />
    </div>
  );
}

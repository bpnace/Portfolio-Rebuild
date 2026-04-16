import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { createSanitizedDrupalTree } from "@/lib/drupal-rich-text.mjs";

function DrupalAnchor({
  children,
  href,
  title,
}: ComponentPropsWithoutRef<"a">) {
  if (typeof href !== "string" || href.length === 0) {
    return <>{children}</>;
  }

  return (
    <a href={href} title={title}>
      {children}
    </a>
  );
}

const components = {
  a: DrupalAnchor,
  hr: (props: ComponentPropsWithoutRef<"hr">) => (
    <hr {...props} className="border-border" />
  ),
};

export function renderDrupalRichText(source: string): ReactNode {
  const tree = createSanitizedDrupalTree(source);

  if (!tree) {
    return null;
  }

  return toJsxRuntime(tree, {
    Fragment,
    jsx,
    jsxs,
    components,
  });
}

import React from "react";
import "../../global.css";

type RichTextNode = {
  type: string;
  level?: number;
  text?: string;
  children?: RichTextNode[] | any[];
  [key: string]: any;
};

// Convert AST (or array of nodes) to plain text
export const astToPlainText = (
  node: RichTextNode | RichTextNode[] | any
): string => {
  if (node == null) return "";
  if (Array.isArray(node)) return node.map(astToPlainText).join("\n\n");
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (node.type === "text") return node.text ?? "";

  // Recursively process children
  const children = node.children ?? [];
  return Array.isArray(children) ? children.map(astToPlainText).join("") : "";
};

// Convert AST to basic HTML (sanitized minimally by escaping text)
const escapeHtml = (str: string) =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const renderMarksToHtml = (textNode: any) => {
  let text = escapeHtml(textNode.text ?? "");
  const marks = textNode.marks ?? textNode.mark ?? [];
  // Support marks array [{type: 'bold'}] or legacy properties
  if (Array.isArray(marks)) {
    for (const m of marks) {
      const t = typeof m === "string" ? m : m.type;
      if (t === "bold") text = `<strong>${text}</strong>`;
      if (t === "italic") text = `<em>${text}</em>`;
      if (t === "underline") text = `<u>${text}</u>`;
      if (t === "code") text = `<code>${text}</code>`;
    }
  }
  return text;
};

export const astToHtml = (
  node: RichTextNode | RichTextNode[] | any
): string => {
  if (node == null) return "";
  if (Array.isArray(node)) return node.map(astToHtml).join("");
  if (typeof node === "string") return escapeHtml(node);
  if (node.type === "text") return renderMarksToHtml(node);

  const childrenHtml = (node.children ?? []).map(astToHtml).join("");

  switch (node.type) {
    case "heading": {
      const level = node.level ?? 2;
      const tag = `h${Math.min(6, Math.max(1, level))}`;
      return `<${tag}>${childrenHtml}</${tag}>`;
    }
    case "paragraph":
      return `<p>${childrenHtml}</p>`;
    case "list":
      return `<ul>${childrenHtml}</ul>`;
    case "listItem":
      return `<li>${childrenHtml}</li>`;
    case "blockquote":
      return `<blockquote>${childrenHtml}</blockquote>`;
    default:
      // Unknown node: return children concatenated
      return childrenHtml;
  }
};

// Convert AST to React nodes (JSX), preserving simple marks
export const astToReact = (
  node: RichTextNode | RichTextNode[] | any
): React.ReactNode => {
  if (node == null) return null;
  if (Array.isArray(node))
    return node.map((n, i) => (
      <React.Fragment key={i}>{astToReact(n)}</React.Fragment>
    ));
  if (typeof node === "string") return node;
  if (node.type === "text") {
    const text = node.text ?? "";
    const marks = node.marks ?? node.mark ?? [];
    let element: React.ReactNode = text;
    if (Array.isArray(marks)) {
      for (const m of marks) {
        const t = typeof m === "string" ? m : m.type;
        if (t === "bold") element = <strong>{element}</strong>;
        if (t === "italic") element = <em>{element}</em>;
        if (t === "underline") element = <u>{element}</u>;
        if (t === "code") element = <code>{element}</code>;
      }
    }
    return element;
  }

  const children = (node.children ?? []) as any[];

  switch (node.type) {
    case "heading": {
      const level = node.level ?? 2;
      const Tag = `h${Math.min(6, Math.max(1, level))}` as any;
      return (
        <Tag>
          {children.map((c, i) => (
            <h2 key={i} className="font-semibold text-xl">
              {astToReact(c)}
            </h2>
          ))}
        </Tag>
      );
    }
    case "paragraph":
      return (
        <p>
          {children.map((c, i) => (
            <React.Fragment key={i}>{astToReact(c)}</React.Fragment>
          ))}
        </p>
      );
    case "list":
      return (
        <ul>
          {children.map((c, i) => (
            <React.Fragment key={i}>{astToReact(c)}</React.Fragment>
          ))}
        </ul>
      );
    case "listItem":
      return (
        <li>
          {children.map((c, i) => (
            <React.Fragment key={i}>{astToReact(c)}</React.Fragment>
          ))}
        </li>
      );
    case "blockquote":
      return (
        <blockquote>
          {children.map((c, i) => (
            <React.Fragment key={i}>{astToReact(c)}</React.Fragment>
          ))}
        </blockquote>
      );
    default:
      return children.map((c, i) => (
        <React.Fragment key={i}>{astToReact(c)}</React.Fragment>
      ));
  }
};

export default {
  astToPlainText,
  astToHtml,
  astToReact,
};

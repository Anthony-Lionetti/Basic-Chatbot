"use client";
import React, {
  Children,
  isValidElement,
  useEffect,
  useState,
  useRef,
} from "react";
import ReactMarkdown, { Components } from "react-markdown";
import flattenChildren from "react-keyed-flatten-children";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";

interface ExtendedComponents extends Components {
  Think: React.HTMLProps<HTMLElement>;
}

interface CustomMarkdownProps {
  content: string;
}

export function CustomMarkdown({ content }: CustomMarkdownProps) {
  const components: Partial<ExtendedComponents> = {
    ...headings,
    strong: ({ children }: React.HTMLProps<HTMLElement>) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }: React.HTMLProps<HTMLElement>) => <em>{children}</em>,
    code: CodeBlock,
    pre: ({ children }: React.HTMLProps<HTMLElement>) => {
      return (
        <div className="relative">
          <pre className="rounded-lg text-sm overflow-x-auto flex items-start">
            {children}
          </pre>
        </div>
      );
    },
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-accent-10 underline transition-all duration-300 ease-in-out hover:text-accent-11"
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </a>
    ),
    p: ({ children }) => <p className="mb-2 leading-relaxed">{children}</p>,
    ...listElements,
    ...tableElements,
    blockquote: ({ children }: React.HTMLProps<HTMLElement>) => (
      <blockquote className="border-l-4 border-accent-9 rounded pl-2 text-accent-8 italic">
        {children}
      </blockquote>
    ),
    think: ({ children }: React.HTMLProps<HTMLElement>) => {
      return (
        <div className="relative my-4">
          <div className="text-sm border border-purple-500">{children}</div>
        </div>
      );
    },
  };

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[
        [
          rehypeRaw,
          {
            passThrough: ["think"], // Critical configuration
          },
        ],
      ]}
      components={components}
    >
      {content}
    </ReactMarkdown>
  );
}

const headings = {
  h1: ({ children, id }: React.HTMLProps<HTMLElement>) => (
    <h1 className="text-4xl font-bold my-4" id={id}>
      {children}
    </h1>
  ),
  h2: ({ children, id }: React.HTMLProps<HTMLElement>) => (
    <h2 className="text-3xl font-bold my-4" id={id}>
      {children}
    </h2>
  ),
  h3: ({ children, id }: React.HTMLProps<HTMLElement>) => (
    <h3 className="text-2xl font-bold my-4" id={id}>
      {children}
    </h3>
  ),
  h4: ({ children, id }: React.HTMLProps<HTMLElement>) => (
    <h4 className="text-xl font-bold my-4" id={id}>
      {children}
    </h4>
  ),
  h5: ({ children, id }: React.HTMLProps<HTMLElement>) => (
    <h5 className="font-sans font-semibold text-lg my-6" id={id}>
      {children}
    </h5>
  ),
  h6: ({ children, id }: React.HTMLProps<HTMLElement>) => (
    <h6 className="font-sans font-medium text-lg my-6" id={id}>
      {children}
    </h6>
  ),
};

const CodeBlock = ({ children, className }: React.HTMLProps<HTMLElement>) => {
  const [copied, setCopied] = useState(false);
  const highlighterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (copied) {
      const interval = setTimeout(() => setCopied(false), 1000);
      return () => clearTimeout(interval);
    }
  }, [copied]);

  if (className) {
    const match = /language-(\w+)/.exec(className || "");

    return (
      <>
        <SyntaxHighlighter
          // @ts-nocheck
          ref={highlighterRef}
          className={`flex-grow flex-shrink my-auto w-full rounded-lg`}
          style={vscDarkPlus}
          language={match?.[1] || "python"}
          PreTag="div"
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
        <IconButton
          style={{
            position: "absolute",
            top: "1rem",
            right: ".75rem",
            cursor: "pointer",
          }}
          size={"1"}
          aria-label="copy code to clipboard"
          title="Copy code to clipboard"
          onClick={() => {
            if (highlighterRef.current) {
              const text =
                highlighterRef.current.querySelector("code")?.innerText || "";
              navigator.clipboard.writeText(text);
              setCopied(true);
            }
          }}
        >
          {copied ? (
            <CheckIcon className="w-4 h-4" />
          ) : (
            <CopyIcon className="w-4 h-4" />
          )}
        </IconButton>
      </>
    );
  }

  return (
    <code className="inline-block bg-gray-3 text-accent-9 px-0.5 py-0.25 rounded">
      {children}
    </code>
  );
};

const listElements = {
  ul: ({ children }: React.HTMLProps<HTMLElement>) => (
    <ul className="flex flex-col gap-3 text-gray-12 my-6 pl-3 [&_ol]:my-3 [&_ul]:my-3">
      {Children.map(
        flattenChildren(children).filter(isValidElement),
        (child, index) => (
          <li key={index} className="flex gap-2 items-start">
            <div className="w-1 h-1 mt-[8px] rounded-full bg-current block shrink-0" />
            {child}
          </li>
        )
      )}
    </ul>
  ),
  ol: ({ children }: React.HTMLProps<HTMLElement>) => (
    <ol className="flex flex-col gap-3 text-gray-12 my-6 pl-3 [&_ol]:my-3 [&_ul]:my-3">
      {Children.map(
        flattenChildren(children).filter(isValidElement),
        (child, index) => (
          <li key={index} className="flex gap-2 items-start">
            <span
              className="font-sans text-sm text-gray-12 font-semibold"
              aria-hidden
            >
              {index + 1}.
            </span>
            <div className="flex-1">{child}</div>
          </li>
        )
      )}
    </ol>
  ),
  li: ({ children }: React.HTMLProps<HTMLElement>) => (
    <div className="font-sans text-sm">{children}</div>
  ),
};

const tableElements = {
  table: ({ children }: React.HTMLProps<HTMLElement>) => (
    <div className="overflow-x-auto mb-6 rounded-md">
      <table className="table-auto p-2">{children}</table>
    </div>
  ),
  thead: ({ children }: React.HTMLProps<HTMLElement>) => (
    <thead className="bg-gray-2">{children}</thead>
  ),
  th: ({ children }: React.HTMLProps<HTMLElement>) => (
    <th className="border-2 border-gray-3 p-2 font-sans text-m font-semibold text-start text-accent-9">
      {children}
    </th>
  ),
  td: ({ children }: React.HTMLProps<HTMLElement>) => (
    <td className="border-2 border-gray-2 p-2 font-sans text-sm text-gray-12">
      {children}
    </td>
  ),
};

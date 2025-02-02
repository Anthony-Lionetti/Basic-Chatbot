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
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";

interface CustomMarkdownProps {
  content: string;
}

export function CustomMarkdown({ content }: CustomMarkdownProps) {
  const components: Partial<Components> = {
    h1: ({ children, ...props }) => (
      <h1 className="text-3xl font-bold my-4" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h1 className="text-2xl font-bold my-4" {...props}>
        {children}
      </h1>
    ),
    h3: ({ children, ...props }) => (
      <h1 className="text-xl font-bold my-4" {...props}>
        {children}
      </h1>
    ),
    h4: ({ children, ...props }) => (
      <h1 className="text-lg font-bold my-4" {...props}>
        {children}
      </h1>
    ),

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

    a: ({ children }) => (
      <a className="text-accent-12 hover:underline">{children}</a>
    ),

    p: ({ children }) => <p className="my-2 leading-relaxed">{children}</p>,

    ul: ({ children }: React.HTMLProps<HTMLElement>) => (
      <ul className="flex flex-col gap-3 text-gray-2 my-6 pl-3 [&_ol]:my-3 [&_ul]:my-3">
        {Children.map(
          flattenChildren(children).filter(isValidElement),
          (child, index) => (
            <li key={index} className="flex gap-2 items-start">
              <div className="w-1 h-1 rounded-full bg-current block shrink-0 mt-1" />
              {child}
            </li>
          )
        )}
      </ul>
    ),
    ol: ({ children }: React.HTMLProps<HTMLElement>) => (
      <ol className="flex flex-col gap-3 text-gray-2 my-6 pl-3 [&_ol]:my-3 [&_ul]:my-3">
        {Children.map(
          flattenChildren(children).filter(isValidElement),
          (child, index) => (
            <li key={index} className="flex gap-2 items-start">
              <div
                className="font-sans text-sm text-gray-2 font-semibold shrink-0 min-w-[1.4ch]"
                aria-hidden
              >
                {index + 1}.
              </div>
              {child}
            </li>
          )
        )}
      </ol>
    ),
    li: ({ children }: React.HTMLProps<HTMLElement>) => (
      <div className="font-sans text-sm">{children}</div>
    ),
    table: ({ children }: React.HTMLProps<HTMLElement>) => (
      <div className="overflow-x-auto mb-6">
        <table className="table-auto p-2">{children}</table>
      </div>
    ),
    thead: ({ children }: React.HTMLProps<HTMLElement>) => (
      <thead className="bg-gray-1">{children}</thead>
    ),
    th: ({ children }: React.HTMLProps<HTMLElement>) => (
      <th className="border-2 border-accent-8 p-2 font-sans text-sm font-semibold text-accent-8">
        {children}
      </th>
    ),
    td: ({ children }: React.HTMLProps<HTMLElement>) => (
      <td className="border-2 border-gray-2 p-2 font-sans text-sm text-accent-8">
        {children}
      </td>
    ),
    blockquote: ({ children }: React.HTMLProps<HTMLElement>) => (
      <blockquote className="border-l-4 border-accent-2 pl-2 text-accent-8 italic">
        {children}
      </blockquote>
    ),
  };

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {content}
    </ReactMarkdown>
  );
}

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
            right: "1rem",
            cursor: "pointer",
          }}
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
    <code className="inline-block bg-gray-3 text-accent-8 p-0.5 rounded">
      {children}
    </code>
  );
};

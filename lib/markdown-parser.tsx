import React from "react";

export class MarkdownParser {
  private inCodeBlock: boolean;
  private currentListType: "ul" | "ol" | null;
  private htmlOutput: React.ReactNode[];
  private codeContent: string[];

  constructor() {
    this.inCodeBlock = false;
    this.currentListType = null;
    this.htmlOutput = [];
    this.codeContent = [];
  }

  parse(markdown: string): React.ReactNode {
    this.htmlOutput = [];
    const lines = markdown.split("\n");
    for (const line of lines) {
      if (this.inCodeBlock) {
        this.handleCodeBlock(line);
      } else {
        this.parseLine(line);
      }
    }
    this.closeCurrentList();
    return <>{this.htmlOutput}</>;
  }

  parseLine(line: string): void {
    if (this.handleCodeBlockStart(line)) return;
    if (this.handleHeading(line)) return;
    if (this.handleList(line)) return;
    this.handleParagraph(line);
  }

  handleCodeBlockStart(line: string): boolean {
    if (line.startsWith("```")) {
      this.inCodeBlock = true;
      // handling different languages
      // const language = line.slice(3).trim() || "";
      this.codeContent = [];
      return true;
    }
    return false;
  }

  handleCodeBlock(line: string): void {
    if (line.startsWith("```")) {
      this.htmlOutput.push(
        <pre key={this.htmlOutput.length}>
          <code>{this.codeContent.join("\n")}</code>
        </pre>
      );
      this.inCodeBlock = false;
      this.codeContent = [];
    } else {
      this.codeContent.push(line);
    }
  }

  handleHeading(line: string): boolean {
    const headingMatch = line.match(/^(#{1,6})\s(.*)/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const HeadingTag = `h${level}` as keyof React.JSX.IntrinsicElements;
      this.closeCurrentList();
      this.htmlOutput.push(
        <HeadingTag key={this.htmlOutput.length}>
          {this.processInlines(headingMatch[2])}
        </HeadingTag>
      );
      return true;
    }
    return false;
  }

  handleList(line: string): boolean {
    const ulMatch = line.match(/^-\s(.*)/);
    const olMatch = line.match(/^(\d+)\.\s(.*)/);

    if (!ulMatch && !olMatch) {
      this.closeCurrentList();
      return false;
    }

    const text = ulMatch ? ulMatch[1] : olMatch![2];
    const listType = ulMatch ? "ul" : "ol";

    if (listType !== this.currentListType) {
      this.closeCurrentList();
      this.currentListType = listType;
      this.htmlOutput.push(
        React.createElement(
          listType,
          { key: this.htmlOutput.length },
          <li key={0}>{this.processInlines(text)}</li>
        )
      );
    } else {
      // Add to existing list
      const currentList = this.htmlOutput[
        this.htmlOutput.length - 1
      ] as React.ReactElement[];
      const newChildren = [
        ...(currentList.props.children as React.ReactElement[]),
        <li key={currentList.props.children.length}>
          {this.processInlines(text)}
        </li>,
      ];

      this.htmlOutput[this.htmlOutput.length - 1] = React.createElement(
        listType,
        { key: currentList.key },
        newChildren
      );
    }
    return true;
  }

  handleParagraph(line: string): void {
    if (line.trim() === "") {
      this.closeCurrentList();
      return;
    }
    this.closeCurrentList();
    this.htmlOutput.push(
      <p key={this.htmlOutput.length}>{this.processInlines(line)}</p>
    );
  }

  closeCurrentList(): void {
    if (this.currentListType) {
      this.currentListType = null;
    }
  }

  processInlines(text: string): React.ReactNode[] {
    const segments = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);
    return segments.map((segment, index) => {
      if (segment.startsWith("**") && segment.endsWith("**")) {
        return <strong key={index}>{segment.slice(2, -2)}</strong>;
      }
      if (segment.startsWith("*") && segment.endsWith("*")) {
        return <em key={index}>{segment.slice(1, -1)}</em>;
      }
      if (segment.startsWith("`") && segment.endsWith("`")) {
        return <code key={index}>{segment.slice(1, -1)}</code>;
      }
      return segment;
    });
  }
}

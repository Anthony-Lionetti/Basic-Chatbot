interface ProcessedContent {
  cleaned: string;
  thoughts: string[];
}

export function processReasoningContent(
  streamedContent: string
): ProcessedContent {
  const thinkStart = streamedContent.indexOf("<think>");
  const thinkEnd = streamedContent.lastIndexOf("</think>");

  let cleaned = streamedContent;
  const thoughts: string[] = [];

  // Extract thoughts if `<think>` exists
  if (thinkStart !== -1) {
    const contentAfterStart = streamedContent.slice(
      thinkStart + "<think>".length
    );

    // Calculate end of thoughts (use either closing tag or end of string)
    const innerEnd =
      thinkEnd !== -1 && thinkEnd > thinkStart
        ? thinkEnd - (thinkStart + "<think>".length)
        : contentAfterStart.length;

    const rawThoughts = contentAfterStart.slice(0, innerEnd);

    // Clean nested `<think>` tags and split into non-empty lines
    thoughts.push(
      ...rawThoughts
        .replace(/<\/?think>/g, "") // Remove nested tags
        .split(/\r?\n/) // Split into lines
        .map((line) => line.trim()) // Trim whitespace
        .filter((line) => line.length > 0) // Ignore empty lines
    );

    // Remove the entire `<think>...</think>` block from cleaned content
    cleaned =
      streamedContent.slice(0, thinkStart) +
      (thinkEnd !== -1
        ? streamedContent.slice(thinkEnd + "</think>".length)
        : "");
  }

  return { cleaned, thoughts };
}

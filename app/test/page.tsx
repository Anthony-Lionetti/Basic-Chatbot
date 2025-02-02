import { CustomMarkdown } from "@/lib/CustomMarkdown";
import React from "react";
import { Button } from "@radix-ui/themes";
import { RocketIcon, ChevronDownIcon } from "@radix-ui/react-icons";

export default function Test() {
  const content = useConstMarkdown(true);
  const { cleaned, thoughts } = processThinkContent(content);
  console.log(thoughts);
  return (
    <div className="mx-auto w-[50%]">
      <div className="my-5">
        {/* Thought Header */}
        <div className="flex flex-row gap-2 items-center mb-4">
          <Button size="1">
            <RocketIcon />
            <span className="mx-2">Thinking</span>
            <ChevronDownIcon />
          </Button>
        </div>
        {/* Thought Container */}
        <div className="flex flex-col gap-2 ml-4 px-2 border-l border-accent-12">
          {thoughts.map((thought, idx) => {
            return (
              <p key={`thought_${idx}`} className={"text-xs text-gray-10"}>
                {thought}
              </p>
            );
          })}
        </div>
      </div>
      <CustomMarkdown content={cleaned} />
    </div>
  );
}

interface ProcessedContent {
  cleaned: string;
  thoughts: string[];
}

function processThinkContent(streamedContent: string): ProcessedContent {
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

function useConstMarkdown(thinking: boolean = false) {
  const MARKDOWN_TEST_MESSAGE = `
# Heading level 1

This is the first paragraph.

This is the second paragraph.

This is the third paragraph.

1. **Incremental Processing:**
    - LLMs process

2. **Real-Time Generation:**
    - The model

## Heading level 2

This is an [anchor](https://github.com).

### Heading level 3

This is **bold** and _italics_.

#### Heading level 4

This is \`inline\` code.

This is a code block:

\`\`\`tsx
const Message = () => {
  return <div>hi</div>;
};
\`\`\`

##### Heading level 5

This is an unordered list:

- One
- Two
- Three, and **bold**

This is an ordered list:

1. One
1. Two
1. Three

This is a complex list:

1. **Bold: One**
    - Two
    - Three
  
2. **Bold**: Three
    - One
    - Two
    - Three
  
3. **Bold**: Four
    - One
    - Two
    - Three

###### Heading level 6

> This is a blockquote.

This is a table:

| Vegetable | Description |
|-----------|-------------|
| Carrot    | A crunchy, orange root vegetable that is rich in vitamins and minerals. It is commonly used in soups, salads, and as a snack. |
| Broccoli  | A green vegetable with tightly packed florets that is high in fiber, vitamins, and antioxidants. It can be steamed, boiled, stir-fried, or roasted. |
| Spinach   | A leafy green vegetable that is dense in nutrients like iron, calcium, and vitamins. It can be eaten raw in salads or cooked in various dishes. |
| Bell Pepper | A colorful, sweet vegetable available in different colors such as red, yellow, and green. It is often used in stir-fries, salads, or stuffed recipes. |
| Tomato    | A juicy fruit often used as a vegetable in culinary preparations. It comes in various shapes, sizes, and colors and is used in salads, sauces, and sandwiches. |
| Cucumber   | A cool and refreshing vegetable with a high water content. It is commonly used in salads, sandwiches, or as a crunchy snack. |
| Zucchini | A summer squash with a mild flavor and tender texture. It can be sautéed, grilled, roasted, or used in baking recipes. |
| Cauliflower | A versatile vegetable that can be roasted, steamed, mashed, or used to make gluten-free alternatives like cauliflower rice or pizza crust. |
| Green Beans | Long, slender pods that are low in calories and rich in vitamins. They can be steamed, stir-fried, or used in casseroles and salads. |
| Potato | A starchy vegetable available in various varieties. It can be boiled, baked, mashed, or used in soups, fries, and many other dishes. |

This is a mermaid diagram:

\`\`\`mermaid
gitGraph
    commit
    commit
    branch develop
    checkout develop
    commit
    commit
    checkout main
    merge develop
    commit
    commit
\`\`\`

\`\`\`latex
\\[F(x) = \\int_{a}^{b} f(x) \\, dx\\]
\`\`\`
`;

  const THINKING_MESSAGE = `
  <think>
Okay, so I'm trying to understand how text streaming works in Large Language Models (LLMs). I've heard about this in the context of chatbots and real-time applications, but I'm not exactly sure how it all comes together. Let me break it down step by step.

First, I know that LLMs like GPT can generate text, but when it comes to streaming, it's about getting the output in real-time as the model processes the input. So, maybe it's about how the model processes the input incrementally rather than all at once. I remember reading something about tokenization and how models process tokens one by one. So perhaps in streaming, each token is processed and output as soon as it's generated.

I also think about how when I use a chatbot, sometimes the response starts appearing before I finish typing. That must be because the model is processing the input as it comes in. But how exactly does that work? Is the model generating tokens on the fly as it receives each character or word?

I'm also curious about the technical side. How is the data sent to the model? Is it through an API that supports streaming, sending chunks of text as they're typed? Maybe WebSockets or some kind of HTTP streaming is involved. I've heard of WebSockets allowing bidirectional communication, which would be necessary for real-time applications.

Another thing I'm thinking about is the model's architecture. Do all LLMs support streaming, or is it something specific to certain models? I know that some models are optimized for generation, so maybe they have features that allow for incremental processing. Perhaps they use a window of tokens and update their state as each new token comes in.

I also wonder about the user experience. When streaming, the model might make corrections or change the output as more context is added. For example, if I start typing a question, the model might start generating a response, but as I finish, it adjusts the response based on the complete input. That could lead to interesting interactions, maybe even interactivity where the user can guide the model's output in real-time.

But there must be challenges too. Latency is probably a big issue. If each token has to go through the model and come back, that could add up and make the experience slow. Also, handling partial inputs could be tricky. The model might start generating based on incomplete data, which could lead to inaccuracies or the need to backtrack.

I'm also thinking about applications beyond chatbots. Maybe in writing assistants where the model suggests the next word or phrase as you type. Or in translation, where the model starts translating as soon as you start speaking or typing.

I should also consider how this is implemented. Maybe the client sends a stream of tokens to the server, and the server processes each token, updating the model's state and sending back the generated tokens as they come. This would require the model to be able to handle partial sequences and maintain context as it receives each new piece of input.

I'm not entirely sure how the model's internal state is managed during streaming. Does it reset after each token, or does it keep a running state that's updated incrementally? I think it's the latter, where the model maintains a running context that evolves with each new token, allowing it to generate the next token based on the entire history up to that point.

Also, error handling must be important. What if the connection drops or there's a delay in receiving tokens? The model might need to buffer some tokens or have a way to recover gracefully without losing context.

I'm also curious about the efficiency. Processing each token individually might be more resource-intensive than processing a batch of tokens at once. So, models optimized for streaming might have different architectures or optimizations to handle real-time processing without using too many resources.

In terms of examples, I can think of virtual assistants that start responding before you finish your request. Or live captioning systems that provide subtitles as someone is speaking. These applications rely on streaming text to provide immediate and interactive responses.

I'm also wondering about the limitations. Maybe streaming works best for certain types of tasks where immediate feedback is beneficial, but might not be necessary for tasks where the entire input is needed before generating a response. Also, the quality of the generated text might differ when streaming versus processing the entire input at once.

I should also consider the difference between unidirectional and bidirectional streaming. In some cases, the model might only need to send output as it's generated, but in others, there might be a need for the client to send more data based on the model's intermediate outputs. That could enable more interactive applications where the model and user can have a back-and-forth conversation in real-time.

Overall, text streaming in LLMs seems to involve processing input incrementally, generating output on the fly, and maintaining context as each token is received. This allows for real-time interactions, which are essential for applications like chatbots, live translation, and interactive writing tools. However, it also presents challenges related to latency, resource usage, and handling partial or changing inputs.
</think>

Text streaming in Large Language Models (LLMs) is a technique that enables real-time, incremental processing of input and generation of output. Here's a structured explanation of how it works and its implications:

### Key Components of Text Streaming in LLMs:

1. **Incremental Processing:**
   - LLMs process input tokens (characters or words) one by one as they are received, rather than waiting for the entire input. This allows the model to start generating output even before the input is complete.

2. **Real-Time Generation:**
   - The model generates tokens incrementally, sending each generated token back to the client as soon as it is produced. This enables real-time interactions, such as seeing a response appear as you type.

3. **Communication Protocol:**
   - Utilizes bidirectional communication protocols like WebSockets or HTTP streaming to send input tokens to the model and receive generated tokens immediately. This allows for a fluid exchange between the client and server.

4. **Model Architecture:**
   - Optimized for streaming, certain models maintain a running context that updates with each new token. This context allows the model to generate the next token based on the entire history up to that point, enabling coherent and contextually relevant outputs.

### Applications and Benefits:

- **Chatbots and Virtual Assistants:** Provide immediate responses, starting before the user finishes input.
- **Live Translation and Captioning:** Translate or transcribe speech as it happens, offering real-time subtitles or translations.
- **Writing Assistants:** Suggest the next word or phrase as the user types, enhancing creativity and productivity.

### Challenges and Considerations:

- **Latency:** Each token must be processed and returned quickly to maintain a smooth user experience.
- **Partial Inputs:** The model may start generating responses based on incomplete data, potentially leading to corrections or adjustments as more context is received.
- **Resource Efficiency:** Processing each token individually can be resource-intensive, necessitating optimizations for real-time performance.
- **Error Handling:** Mechanisms to manage dropped connections or delays, ensuring context isn't lost and the interaction remains seamless.

### Technical Implementation:

- **Client-Server Interaction:** The client sends a stream of tokens to the server, which processes each token, updates the model's state, and returns generated tokens immediately.
- **Context Management:** The model maintains a running state, updating it with each new token to ensure responses are contextually appropriate.

### Limitations and Considerations:

- **Quality Trade-offs:** Streaming might affect response quality compared to processing the entire input at once.
- **Task Suitability:** Best suited for tasks where immediate feedback is beneficial, such as interactive conversations, rather than tasks requiring complete input analysis.

### Conclusion:

Text streaming in LLMs facilitates interactive and real-time applications by enabling incremental processing and generation. While it offers significant benefits in user experience, it also presents challenges related to latency, resource usage, and handling partial inputs. As technology advances, these models are likely to become more efficient and versatile, expanding their applications across various domains.
  `;
  return thinking ? THINKING_MESSAGE : MARKDOWN_TEST_MESSAGE;
}

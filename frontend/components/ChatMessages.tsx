import { MagicWandIcon } from "@radix-ui/react-icons";
import { Heading, IconButton } from "@radix-ui/themes";
import React from "react";

function ChatMessages() {
  const placeHolderMsg =
    "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of 'de Finibus Bonorum et Malorum' (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, 'Lorem ipsum dolor sit amet..', comes from a line in section 1.10.32.";
  const chatHistory = [];
  if (chatHistory.length === 0) {
    return (
      <div className="h-[90dvh] mx-auto fixed top-0 left-0 right-0">
        <div className="text-center py-4 mb-auto">
          <Heading>Chatbot</Heading>
        </div>
        <div className="flex flex-col max-h-[82dvh] overflow-auto">
          <UserMessage message={placeHolderMsg} />
          <AssitantMessage />
        </div>
      </div>
    );
  }
}

export default ChatMessages;

interface MessageProps {
  message: string;
  role?: "user" | "assistant";
}

function UserMessage({ message, role }: MessageProps) {
  return (
    <article
      className="w-full scroll-mb-[var(--thread-trailing-height,150px)] text-token-text-primary focus-visible:outline-2 focus-visible:outline-offset-[-4px]"
      dir="auto"
      data-testid="conversation-turn-2"
      data-scroll-anchor="false"
    >
      <h5 className="sr-only">You said:</h5>
      <div className="m-auto text-base py-[18px] px-3 w-full md:px-5 lg:px-4 xl:px-5">
        <div className="mx-auto flex flex-1 gap-4 text-base md:gap-5 lg:gap-6 md:max-w-3xl">
          <div className="group/conversation-turn relative flex w-full min-w-0 flex-col">
            <div className="flex-col gap-1 md:gap-3">
              <div className="flex max-w-full flex-col flex-grow">
                <div
                  data-message-author-role={role}
                  dir="auto"
                  className="min-h-8 text-message flex w-full flex-col items-end gap-2 whitespace-normal break-words text-start [.text-message+&amp;]:mt-5"
                >
                  <div className="flex w-full flex-col gap-1 empty:hidden items-end rtl:items-start">
                    <div className="relative max-w-[var(--user-chat-width,70%)] rounded-3xl bg-token-message-surface px-5 py-2.5">
                      <div className="whitespace-pre-wrap">{message}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function AssitantMessage() {
  return (
    <article
      className="w-full scroll-mb-[var(--thread-trailing-height,150px)] text-token-text-primary focus-visible:outline-2 focus-visible:outline-offset-[-4px]"
      dir="auto"
      data-testid="conversation-turn-3"
      data-scroll-anchor="false"
    >
      <h6 className="sr-only">ChatGPT said:</h6>
      <div className="m-auto text-base py-[18px] px-3 w-full md:px-5 lg:px-4 xl:px-5">
        <div className="mx-auto flex flex-1 gap-4 text-base md:gap-5 lg:gap-6 md:max-w-3xl">
          <div className="flex-shrink-0 flex flex-col relative items-end">
            <div>
              <div className="pt-0">
                <div className="gizmo-bot-avatar flex h-8 w-8 items-center justify-center overflow-hidden rounded-full">
                  <div className="relative p-1 rounded-sm flex items-center justify-center bg-token-main-surface-primary text-token-text-primary h-8 w-8">
                    <IconButton variant="soft">
                      <MagicWandIcon className="w-4 h-4" />
                    </IconButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="group/conversation-turn relative flex w-full min-w-0 flex-col agent-turn">
            <div className="flex-col gap-1 md:gap-3">
              <div className="flex max-w-full flex-col flex-grow">
                <div
                  data-message-author-role="assistant"
                  data-message-id="df97cd91-753a-4cd4-acd5-79e2e80b583e"
                  dir="auto"
                  className="min-h-8 text-message flex w-full flex-col items-end gap-2 whitespace-normal break-words text-start [.text-message+&amp;]:mt-5"
                  data-message-model-slug="gpt-4o-mini"
                >
                  <div className="flex w-full flex-col gap-1 empty:hidden first:pt-[3px]">
                    <div className="markdown prose w-full break-words dark:prose-invert dark">
                      <p>
                        Absolutely, I&apos;d love to help you brainstorm!
                        Let&apos;s first think about what&apos;s in season.
                        Since we&apos;re in late January, depending on where you
                        are, some ingredients might be wintery or even
                        transitioning toward early spring.
                      </p>
                      <h3>Winter Ingredients (January through February)</h3>
                      <ol>
                        <li>
                          <p>
                            <strong>Root Vegetables</strong>:
                          </p>
                          <ul>
                            <li>
                              Carrots, parsnips, sweet potatoes, beets, turnips,
                              rutabagas, and celeriac.
                            </li>
                          </ul>
                        </li>
                        <li>
                          <p>
                            <strong>Leafy Greens</strong>:
                          </p>
                          <ul>
                            <li>
                              Kale, collard greens, chard, and spinach are
                              hearty winter greens.
                            </li>
                          </ul>
                        </li>
                        <li>
                          <p>
                            <strong>Brassicas</strong>:
                          </p>
                          <ul>
                            <li>
                              Brussels sprouts, cauliflower, broccoli, and
                              cabbage are at their peak.
                            </li>
                          </ul>
                        </li>
                        <li>
                          <p>
                            <strong>Citrus</strong>:
                          </p>
                          <ul>
                            <li>
                              Oranges, grapefruits, lemons, and mandarins add
                              brightness during the darker months.
                            </li>
                          </ul>
                        </li>
                        <li>
                          <p>
                            <strong>Winter Squash</strong>:
                          </p>
                          <ul>
                            <li>
                              Butternut, acorn, kabocha, and delicata squash.
                            </li>
                          </ul>
                        </li>
                        <li>
                          <p>
                            <strong>Mushrooms</strong>:
                          </p>
                          <ul>
                            <li>
                              Wild mushrooms like cremini, shiitake, maitake,
                              and chanterelles are often available in winter.
                            </li>
                          </ul>
                        </li>
                        <li>
                          <p>
                            <strong>Cranberries</strong> (still around from the
                            fall harvest).
                          </p>
                        </li>
                        <li>
                          <p>
                            <strong>Pomegranates</strong> (still available in
                            many places).
                          </p>
                        </li>
                        <li>
                          <p>
                            <strong>Nuts and Seeds</strong>:
                          </p>
                          <ul>
                            <li>
                              Walnuts, pecans, almonds, and pumpkin seeds are
                              great for adding crunch.
                            </li>
                          </ul>
                        </li>
                        <li>
                          <p>
                            <strong>Root Herbs</strong>:
                          </p>
                          <ul>
                            <li>
                              Parsley, thyme, rosemary, and sage are great
                              winter herbs for seasoning.
                            </li>
                          </ul>
                        </li>
                      </ol>
                      <h3>Possible Proteins (depending on preferences):</h3>
                      <ul>
                        <li>
                          <strong>Beef</strong>: Roasts, short ribs, or steak.
                        </li>
                        <li>
                          <strong>Pork</strong>: Tenderloin or belly.
                        </li>
                        <li>
                          <strong>Chicken</strong>: Braised or roasted with
                          herbs.
                        </li>
                        <li>
                          <strong>Fish</strong>: Winter varieties like cod,
                          halibut, and salmon.
                        </li>
                        <li>
                          <strong>Legumes</strong>: If you’re doing a
                          plant-based menu, beans, lentils, and chickpeas are
                          hearty and filling.
                        </li>
                      </ul>
                      <p>
                        What kind of vibe are you going for? Are you thinking
                        formal, rustic, or more of a cozy comfort-food type of
                        dinner? Or is there a specific dietary preference (like
                        vegetarian, gluten-free) you'd like to focus on? That
                        can help narrow down the ideas!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pr-2 lg:pr-0"></div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

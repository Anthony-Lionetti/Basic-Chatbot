import React, { useState } from "react";
import { Button } from "@radix-ui/themes";
import {
  RocketIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";

export default function ReasoningOutput({ thoughts }: { thoughts: string[] }) {
  const [thoughtHidden, setThoughtHidden] = useState<boolean>(false);
  return (
    <div className="mb-5">
      {/* Thought Header */}
      <div className="flex flex-row gap-3 items-center mb-4">
        <Button size="2" onClick={() => setThoughtHidden(!thoughtHidden)}>
          <RocketIcon />
          <span className="mx-2">Reasoning</span>
          {thoughtHidden && <ChevronDownIcon />}
          {!thoughtHidden && <ChevronUpIcon />}
        </Button>
      </div>
      {/* Thought Container */}
      {!thoughtHidden && (
        <div className="flex flex-col gap-2 px-2 border-l border-accent-12">
          {thoughts.map((thought, idx) => {
            return (
              <p key={`thought_${idx}`} className={"text-xs text-gray-10"}>
                {thought}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
}

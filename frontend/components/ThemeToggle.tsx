"use client";
import { useTheme } from "@/context/ThemeContext";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import React from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleGroupItemClasses =
    "flex size-[35px] items-center justify-center bg-gray-3 leading-4 text-gray-12 first:rounded-l last:rounded-r hover:bg-accent-7 focus:z-10 focus:outline-none data-[state=on]:bg-accent-9 data-[state=on]:text-accent-1";

  return (
    <ToggleGroup.Root
      className="inline-flex space-x-px rounded bg-gray-3 cursor-pointer"
      type="single"
      defaultValue={theme}
      aria-label="Text alignment"
      value={theme}
      onValueChange={(theme: "light" | "dark") => {
        if (theme) setTheme(theme);
      }}
      style={{ marginInline: "auto" }}
    >
      <ToggleGroup.Item
        className={toggleGroupItemClasses}
        value="light"
        aria-label="sun"
      >
        <SunIcon />
      </ToggleGroup.Item>
      <ToggleGroup.Item
        className={toggleGroupItemClasses}
        value="dark"
        aria-label="moon"
      >
        <MoonIcon />
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  );
}

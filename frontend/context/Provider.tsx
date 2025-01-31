"use client";
import React from "react";
import { ThemeProvider } from "./ThemeContext";
import ChatProvider from "./ChatProvider";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ChatProvider>{children}</ChatProvider>
    </ThemeProvider>
  );
}

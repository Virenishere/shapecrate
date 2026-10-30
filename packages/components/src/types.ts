import type { ComponentType } from "react";

export type ComponentCategory =
  | "backgrounds"
  | "buttons"
  | "cards"
  | "gradients"
  | "effects";

export type CodeFormat = "html" | "react";

export interface ComponentCode {
  html: string;
  react: string;
}

export interface ComponentItem {
  id: string;
  title: string;
  category: ComponentCategory;
  description: string;
  tags: string[];
  component: ComponentType;
  code: ComponentCode;
}

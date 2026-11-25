import type { ChangeEvent, FormEvent, MouseEvent, ReactElement } from "react";
import type { NavLinkRenderProps } from "react-router-dom";
import type { ProjectItem } from "./index";

export type UiElement = ReactElement;
export type SectionHeadingLevel = "h1" | "h2";
export type NavigationLinkState = NavLinkRenderProps;
export type SkipContentEvent = MouseEvent<HTMLButtonElement>;

export interface PageMetadata {
  title: string;
  headingId: string;
}

export type PageMetadataByPath = Record<string, PageMetadata>;

export interface SectionPageProps {
  headingLevel?: SectionHeadingLevel;
}

export interface ProjectsPageProps extends SectionPageProps {
  showApi?: boolean;
}

export interface ContactPageProps extends SectionPageProps {
  showForm?: boolean;
}

export interface ProjectCardProps {
  project: ProjectItem;
}

export type ProjectArtworkList = readonly ReactElement[];
export type ContactFieldName = "name" | "email" | "message";
export type ContactFormStatus = "idle" | "invalid" | "ready";
export type ContactFieldChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
export type ContactSubmitEvent = FormEvent<HTMLFormElement>;

export interface ContactFields {
  name: string;
  email: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  message?: string;
}

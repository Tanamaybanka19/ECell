"use client";

import type { ReactNode } from "react";

import { add, remove, swap, useContent } from "@/lib/content/admin-store";
import { BRAND_NAMES } from "@/lib/content/types";

import {
  EditorGrid,
  EmptyNote,
  IconSelectField,
  ItemCard,
  SectionCard,
  TextAreaField,
  TextField,
} from "../components/fields";

export function SitePanel(): ReactNode {
  const content = useContent();
  const { siteConfig, contactPage } = content;

  return (
    <div className="flex flex-col gap-6">
      <SectionCard title="Site config">
        <EditorGrid>
          <TextField
            label="Short name"
            path="siteConfig.name"
            value={siteConfig.name}
          />
          <TextField
            label="Full name"
            path="siteConfig.fullName"
            value={siteConfig.fullName}
          />
          <TextField
            label="Email"
            path="siteConfig.email"
            value={siteConfig.email}
          />
          <TextField
            label="Address"
            path="siteConfig.address"
            value={siteConfig.address}
          />
        </EditorGrid>
        <div className="mt-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/50">
            Social links
          </span>
          <div className="mt-2">
            <EditorGrid>
              {BRAND_NAMES.map((brand) => (
                <TextField
                  key={brand}
                  label={brand}
                  path={`siteConfig.socials.${brand}`}
                  value={siteConfig.socials[brand]}
                />
              ))}
            </EditorGrid>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Contact page">
        <EditorGrid>
          <TextField
            label="Heading"
            path="contactPage.heading"
            value={contactPage.heading}
          />
          <TextField
            label="Instagram handle"
            path="contactPage.instagramHandle"
            value={contactPage.instagramHandle}
          />
        </EditorGrid>
        <div className="mt-4">
          <TextAreaField
            label="Subhead"
            path="contactPage.subhead"
            value={contactPage.subhead}
            rows={2}
          />
        </div>
        <div className="mt-4">
          <TextField
            label="Follow section heading"
            path="contactPage.followHeading"
            value={contactPage.followHeading}
          />
        </div>

        <div className="mt-5 flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/50">
              Info blocks
            </span>
            <button
              type="button"
              onClick={() =>
                add("contactPage.infoBlocks", {
                  icon: "mail",
                  title: "New block",
                  line1: "",
                  line2: "",
                })
              }
              className="focus-ring cursor-pointer rounded-xl border border-foreground/8 bg-foreground px-3.5 py-2 text-[13px] font-medium text-background transition-colors hover:bg-foreground/90"
            >
              + Add block
            </button>
          </div>
          {contactPage.infoBlocks.length === 0 ? (
            <EmptyNote>No info blocks yet.</EmptyNote>
          ) : (
            contactPage.infoBlocks.map((block, i) => (
              <ItemCard
                key={`${block.title}-${i}`}
                onMoveUp={
                  i > 0
                    ? () => swap("contactPage.infoBlocks", i, -1)
                    : undefined
                }
                onMoveDown={
                  i < contactPage.infoBlocks.length - 1
                    ? () => swap("contactPage.infoBlocks", i, 1)
                    : undefined
                }
                onDelete={() => remove(`contactPage.infoBlocks.${i}`)}
              >
                <EditorGrid>
                  <TextField
                    label="Title"
                    path={`contactPage.infoBlocks.${i}.title`}
                    value={block.title}
                  />
                  <IconSelectField
                    label="Icon"
                    path={`contactPage.infoBlocks.${i}.icon`}
                    value={block.icon}
                  />
                  <TextField
                    label="Line 1"
                    path={`contactPage.infoBlocks.${i}.line1`}
                    value={block.line1}
                  />
                  <TextField
                    label="Line 2"
                    path={`contactPage.infoBlocks.${i}.line2`}
                    value={block.line2}
                  />
                </EditorGrid>
              </ItemCard>
            ))
          )}
        </div>
      </SectionCard>
    </div>
  );
}

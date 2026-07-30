import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: "noindex, nofollow",
};

/**
 * Minimal layout for podcast embed pages.
 * No Navbar or Footer — just a bare, minimal wrapper so the iframe is clean.
 */
export default function PodcastEmbedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: "#0a0a0a",
        overflow: "hidden",
        padding: "0",
        margin: "0",
      }}
    >
      {children}
    </div>
  );
}

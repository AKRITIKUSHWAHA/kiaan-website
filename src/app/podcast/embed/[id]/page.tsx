import { podcastEpisodes } from "@/data/podcastData";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import AudioPlayerClient from "@/components/podcast/AudioPlayerClient";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return podcastEpisodes.map((ep) => ({ id: ep.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const episode = podcastEpisodes.find((ep) => ep.id === id);
  if (!episode) return { title: "Episode Not Found" };
  return {
    title: `${episode.title} — Embed | Kiaan Tech Talks`,
    robots: "noindex, nofollow",
  };
}

export default async function EpisodeEmbedPage({ params }: Props) {
  const { id } = await params;
  const episode = podcastEpisodes.find((ep) => ep.id === id);
  if (!episode) notFound();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        padding: "16px",
        background: "linear-gradient(135deg, #0a0a0a 0%, #111 100%)",
        border: "1px solid #27272a",
        borderRadius: "16px",
        minHeight: "160px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* Episode info */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #FFD60A, #b45309)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            fontSize: "10px",
            fontWeight: 900,
            color: "#000",
          }}
        >
          EP{String(episode.episode).padStart(2, "0")}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              fontSize: "14px",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.3,
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {episode.title}
          </p>
          <p style={{ fontSize: "11px", color: "#71717a", marginTop: "3px" }}>
            Kiaan Tech Talks · {episode.duration}
          </p>
        </div>
      </div>

      {/* Compact audio player */}
      <AudioPlayerClient episode={episode} compact />

      {/* Attribution */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <a
          href={`https://kiaantechnology.com/podcast/${episode.id}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: "10px", color: "#FFD60A", textDecoration: "none" }}
        >
          kiaantechnology.com/podcast
        </a>
      </div>
    </div>
  );
}

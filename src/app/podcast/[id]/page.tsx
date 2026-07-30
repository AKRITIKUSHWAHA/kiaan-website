import { podcastEpisodes } from "@/data/podcastData";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User, Tag, Code2 } from "lucide-react";
import AudioPlayerClient from "@/components/podcast/AudioPlayerClient";

interface Props {
  params: Promise<{ id: string }>;
}

// Generate static paths for all episodes (needed for static export)
export async function generateStaticParams() {
  return podcastEpisodes.map((ep) => ({ id: ep.id }));
}

// Dynamic SEO metadata per episode
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const episode = podcastEpisodes.find((ep) => ep.id === id);
  if (!episode) return { title: "Episode Not Found" };

  return {
    title: `${episode.title} | Kiaan Tech Talks Podcast`,
    description: episode.description,
    keywords: episode.tags.join(", "),
    robots: "index, follow",
    alternates: {
      canonical: `https://kiaantechnology.com/podcast/${episode.id}`,
    },
    openGraph: {
      title: episode.title,
      description: episode.description,
      url: `https://kiaantechnology.com/podcast/${episode.id}`,
      siteName: "Kiaan Technology",
      type: "article",
      publishedTime: episode.publishedAt,
      authors: ["Kiaan Technology"],
      tags: episode.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: episode.title,
      description: episode.description,
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function EpisodePage({ params }: Props) {
  const { id } = await params;
  const episode = podcastEpisodes.find((ep) => ep.id === id);

  if (!episode) notFound();

  const episodeIndex = podcastEpisodes.findIndex((ep) => ep.id === id);
  const prevEpisode = podcastEpisodes[episodeIndex + 1] ?? null;
  const nextEpisode = episodeIndex > 0 ? podcastEpisodes[episodeIndex - 1] : null;

  // FIX Bug #7: correct ISO 8601 duration with hours support
  const durationH = Math.floor(episode.durationSeconds / 3600);
  const durationM = Math.floor((episode.durationSeconds % 3600) / 60);
  const durationS = episode.durationSeconds % 60;
  const isoDuration = durationH > 0
    ? `PT${durationH}H${durationM}M${durationS}S`
    : `PT${durationM}M${durationS}S`;

  const episodeSchema = {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    name: episode.title,
    description: episode.description,
    url: `https://kiaantechnology.com/podcast/${episode.id}`,
    datePublished: episode.publishedAt,
    duration: isoDuration,
    associatedMedia: {
      "@type": "MediaObject",
      contentUrl: episode.audioUrl,
      encodingFormat: "audio/mpeg",
    },
    partOfSeries: {
      "@type": "PodcastSeries",
      name: "Kiaan Tech Talks",
      url: "https://kiaantechnology.com/podcast",
    },
  };

  const embedCode = `<iframe
  src="https://kiaantechnology.com/podcast/embed/${episode.id}"
  width="100%"
  height="180"
  frameborder="0"
  scrolling="no"
  title="${episode.title}"
  allow="autoplay"
></iframe>`;

  return (
    <>
      {/* FIX Bug #10: server-rendered JSON-LD for crawlers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(episodeSchema) }}
      />

      <div className="min-h-screen bg-black">
        {/* ── Back nav ──────────────────── */}
        <div className="pt-28 pb-6 max-w-3xl mx-auto px-4 sm:px-6">
          <Link
            href="/podcast"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-yellow-400 transition-colors group"
            aria-label="Back to all episodes"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            All Episodes
          </Link>
        </div>

        {/* ── Episode Hero ──────────────── */}
        <header className="max-w-3xl mx-auto px-4 sm:px-6 pb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 border border-zinc-800 bg-zinc-900 px-2.5 py-1 rounded-full">
              Season {episode.season} · Episode {String(episode.episode).padStart(2, "0")}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            {episode.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 text-sm text-zinc-500">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {formatDate(episode.publishedAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {episode.duration}
            </span>
            {episode.guestName && (
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {episode.guestName}
                {episode.guestTitle && ` — ${episode.guestTitle}`}
              </span>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {episode.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-zinc-800/80 border border-zinc-700 rounded-full text-xs text-zinc-400"
              >
                <Tag className="w-2.5 h-2.5" />
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* ── Audio Player ──────────────── */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-10">
          <AudioPlayerClient episode={episode} />
        </div>

        {/* ── Description ──────────────── */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 pb-10">
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3">Episode Overview</h2>
            <p className="text-zinc-400 leading-relaxed text-base">
              {episode.longDescription}
            </p>
          </div>
        </article>

        {/* ── Embed Code ───────────────── */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-10">
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6">
            <h2 className="flex items-center gap-2 text-base font-bold text-white mb-3">
              <Code2 className="w-4 h-4 text-yellow-400" />
              Embed This Episode
            </h2>
            <p className="text-xs text-zinc-500 mb-3">
              Copy the code below to embed this episode player on your website.
            </p>
            <pre
              className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-xs text-zinc-300 overflow-x-auto whitespace-pre-wrap break-all font-mono"
              aria-label="Embed code snippet"
            >
              {embedCode}
            </pre>
            <Link
              href={`/podcast/embed/${episode.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-3 text-xs text-yellow-400 hover:underline"
              aria-label="Preview embed player"
            >
              Preview embed →
            </Link>
          </div>
        </section>

        {/* ── Prev / Next Nav ──────────── */}
        <nav
          className="max-w-3xl mx-auto px-4 sm:px-6 pb-24 grid grid-cols-2 gap-4"
          aria-label="Episode navigation"
        >
          {prevEpisode ? (
            <Link
              href={`/podcast/${prevEpisode.id}`}
              className="group bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 hover:border-yellow-500/40 transition-colors"
              aria-label={`Previous episode: ${prevEpisode.title}`}
            >
              <p className="text-xs text-zinc-600 uppercase tracking-wider mb-1">
                ← Previous
              </p>
              <p className="text-sm font-semibold text-zinc-300 group-hover:text-white line-clamp-2 transition-colors">
                {prevEpisode.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
          {nextEpisode ? (
            <Link
              href={`/podcast/${nextEpisode.id}`}
              className="group bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 hover:border-yellow-500/40 transition-colors text-right"
              aria-label={`Next episode: ${nextEpisode.title}`}
            >
              <p className="text-xs text-zinc-600 uppercase tracking-wider mb-1">
                Next →
              </p>
              <p className="text-sm font-semibold text-zinc-300 group-hover:text-white line-clamp-2 transition-colors">
                {nextEpisode.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </div>
    </>
  );
}

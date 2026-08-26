import type { Metadata } from "next";
import Link from "next/link";
import { podcastEpisodes, podcastShow } from "@/data/podcastData";
import EpisodeCard from "@/components/podcast/EpisodeCard";
import { Mic, Rss, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Kiaan Tech Talks Podcast | AI, SaaS & Enterprise Software",
  description:
    "Deep dives into AI-driven software development, SaaS strategy, ERP/CRM, and the future of enterprise tech. New episodes every two weeks.",
  keywords:
    "tech podcast India, SaaS development podcast, AI software podcast, enterprise technology podcast, Kiaan Technology podcast",
  robots: "index, follow",
  alternates: {
    canonical: "https://kiaantechnology.com/podcast",
    types: {
      "application/rss+xml": "https://kiaantechnology.com/podcast/rss.xml",
    },
  },
  openGraph: {
    title: "Kiaan Tech Talks — AI, SaaS & Enterprise Software Podcast",
    description:
      "Deep dives into AI-driven software development, SaaS strategy, ERP/CRM, and the future of enterprise tech.",
    url: "https://kiaantechnology.com/podcast",
    siteName: "Kiaan Technology",
    images: [
      {
        url: "/podcast/podcast-cover.jpg",
        width: 1400,
        height: 1400,
        alt: "Kiaan Tech Talks Podcast Cover",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kiaan Tech Talks Podcast",
    description: "AI, SaaS & Enterprise Software insights from Kiaan Technology.",
    images: ["/podcast/podcast-cover.jpg"],
  },
};

const podcastSchema = {
  "@context": "https://schema.org",
  "@type": "PodcastSeries",
  name: podcastShow.title,
  description: podcastShow.description,
  url: podcastShow.websiteUrl,
  image: `https://kiaantechnology.com${podcastShow.imageUrl}`,
  author: {
    "@type": "Organization",
    name: podcastShow.author,
  },
  publisher: {
    "@type": "Organization",
    name: "Kiaan Technology",
    url: "https://kiaantechnology.com",
  },
  inLanguage: "en",
};

export default function PodcastPage() {

  return (
    <>
      {/* FIX Bug #10: server-rendered JSON-LD so crawlers see it in initial HTML */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(podcastSchema) }}
      />

      <div className="min-h-screen bg-black">
        {/* ── Hero ───────────────────────────────────────────── */}
        <section className="relative overflow-hidden pt-6 lg:pt-8 pb-6">
          {/* Background glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-yellow-500/5 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-yellow-500/3 blur-2xl" />
            {/* Animated sound bars */}
            <div className="absolute left-10 top-1/2 flex items-end gap-1 opacity-10">
              {[4, 7, 5, 9, 6, 8, 5, 7, 4].map((h, i) => (
                <div
                  key={i}
                  className="w-1.5 bg-yellow-400 rounded-sm animate-pulse"
                  style={{
                    height: `${h * 4}px`,
                    animationDelay: `${i * 0.15}s`,
                    animationDuration: `${0.8 + i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-6">
              {/* Podcast cover */}
              <div className="shrink-0 relative">
                <div className="w-36 h-36 lg:w-48 lg:h-48 rounded-2xl bg-gradient-to-br from-yellow-500 to-yellow-800 p-0.5 shadow-xl shadow-yellow-500/20">
                  <div className="w-full h-full rounded-2xl bg-zinc-900 flex items-center justify-center">
                    <div className="text-center">
                      <Mic className="w-12 h-12 lg:w-16 lg:h-16 text-yellow-400 mx-auto mb-2" />
                      <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                        Tech Talks
                      </p>
                    </div>
                  </div>
                </div>
                {/* NEW badge */}
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  NEW
                </span>
              </div>

              {/* Hero Text */}
              <div className="text-center lg:text-left flex-1">
                <span className="inline-block text-[11px] font-bold text-yellow-400 uppercase tracking-[0.2em] mb-2 border border-yellow-500/30 bg-yellow-500/10 px-2.5 py-1 rounded-full">
                  🎙️ Podcast
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight font-display">
                  Kiaan{" "}
                  <span className="text-yellow-400">Tech Talks</span>
                </h1>
                <p className="mt-2 text-sm md:text-base text-zinc-400 leading-relaxed max-w-xl">
                  Deep dives into AI-driven software development, SaaS strategy,
                  ERP/CRM, and the future of enterprise technology.
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  {podcastEpisodes.length} episodes · Every two weeks
                </p>

                {/* CTA Row */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mt-3.5">
                  <a
                    href="/podcast/rss.xml"
                    target="_blank"
                    rel="noopener noreferrer"
                    id="rss-feed-link"
                    className="flex items-center gap-1.5 px-3.5 py-1.5 bg-orange-500/10 border border-orange-500/30 text-orange-400 rounded-xl hover:bg-orange-500/20 transition-all text-xs font-semibold"
                    aria-label="Subscribe via RSS feed"
                  >
                    <Rss className="w-3.5 h-3.5" />
                    RSS Feed
                  </a>
                  <a
                    href="https://youtube.com/@kiaantechnology"
                    target="_blank"
                    rel="noopener noreferrer"
                    id="youtube-podcast-link"
                    className="flex items-center gap-1.5 px-3.5 py-1.5 bg-zinc-800 border border-zinc-700 text-zinc-300 rounded-xl hover:border-zinc-500 transition-all text-xs font-semibold"
                    aria-label="Watch on YouTube"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    YouTube
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Episode List ─────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="flex items-center justify-between mb-3.5">
            <h2 className="text-xl font-black text-white">
              All Episodes{" "}
              <span className="text-zinc-600 font-normal text-lg">
                ({podcastEpisodes.length})
              </span>
            </h2>
            <Link
              href="/podcast/rss.xml"
              className="text-xs text-zinc-500 hover:text-orange-400 transition-colors flex items-center gap-1"
              aria-label="Subscribe to RSS feed"
            >
              <Rss className="w-3.5 h-3.5" />
              Subscribe
            </Link>
          </div>

          <div className="grid gap-3">
            {[...podcastEpisodes]
              .sort(
                (a, b) =>
                  new Date(b.publishedAt).getTime() -
                  new Date(a.publishedAt).getTime()
              )
              .map((episode, i) => (
                <EpisodeCard key={episode.id} episode={episode} index={i} />
              ))}
          </div>
        </section>

        {/* ── About Section ────────────────────────────────────── */}
        <section className="border-t border-zinc-900 py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-xl font-black text-white mb-2">
              About the Show
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              {podcastShow.description}
            </p>
            <p className="mt-2 text-xs text-zinc-600">
              Have a topic suggestion or want to be a guest?{" "}
              <Link
                href="/contact"
                className="text-yellow-400 hover:underline"
                aria-label="Contact Kiaan Technology for podcast"
              >
                Get in touch
              </Link>
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

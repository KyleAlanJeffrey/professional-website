"use client";

import { ChevronLeft, ChevronRight, ExternalLink, Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { enrichTweet, useTweet, type EnrichedTweet } from "react-tweet";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

type MediaItem = {
  type: "photo" | "video" | "animated_gif";
  url: string;
  videoUrl?: string;
  width: number;
  height: number;
};

function MediaGallery({ items }: { items: MediaItem[] }) {
  const [current, setCurrent] = useState(0);

  if (items.length === 0) return null;

  const item = items[current];

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrent(current - 1);
  };
  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrent(current + 1);
  };

  return (
    <div
      className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 group"
      onClick={(e) => {
        if (items.length > 1) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
    >
      {item.type === "photo" ? (
        <Image
          src={item.url}
          alt={`Tweet media ${current + 1} of ${items.length}`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 600px"
        />
      ) : (
        <div className="relative w-full h-full">
          <Image
            src={item.url}
            alt="Video thumbnail"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 600px"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="w-12 h-12 rounded-full bg-sky-500 flex items-center justify-center shadow-lg">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white ml-0.5" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Nav buttons */}
      {items.length > 1 && (
        <>
          {current > 0 && (
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
          {current < items.length - 1 && (
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
          {/* Dots */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {items.map((_, i) => (
              <span
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  i === current ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function TweetContent({ tweet }: { tweet: EnrichedTweet }) {
  const urlEntities = tweet.entities
    .filter((e) => e.type === "url")
    .map((e) => ({ displayUrl: e.text }));

  const media: MediaItem[] = (tweet.mediaDetails ?? []).map((m) => {
    const item: MediaItem = {
      type: m.type as MediaItem["type"],
      url: m.media_url_https,
      width: m.original_info.width,
      height: m.original_info.height,
    };
    if (m.type === "video" || m.type === "animated_gif") {
      const variants = (m as any).video_info?.variants ?? [];
      const mp4 = variants
        .filter((v: any) => v.content_type === "video/mp4")
        .sort((a: any, b: any) => (b.bitrate ?? 0) - (a.bitrate ?? 0));
      if (mp4.length > 0) item.videoUrl = mp4[0].url;
    }
    return item;
  });

  return (
    <a
      href={tweet.url}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#161618] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-200 hover:-translate-y-0.5 cursor-pointer h-full flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-3">
        <img
          src={tweet.user.profile_image_url_https}
          alt={tweet.user.name}
          className="w-8 h-8 rounded-full shrink-0"
          loading="lazy"
        />
        <div className="flex items-center gap-1.5 min-w-0 flex-1">
          <span className="text-sm font-bold text-gray-900 dark:text-white truncate">
            {tweet.user.name}
          </span>
          {tweet.user.is_blue_verified && (
            <svg
              viewBox="0 0 22 22"
              className="w-3.5 h-3.5 text-sky-500 shrink-0"
              fill="currentColor"
            >
              <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.69-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.636.433 1.221.878 1.69.47.446 1.055.752 1.69.883.635.13 1.294.083 1.902-.143.271.586.702 1.084 1.24 1.438.54.354 1.167.551 1.813.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.222 1.26.268 1.894.14.634-.131 1.218-.438 1.687-.883.445-.47.751-1.054.882-1.69.132-.636.083-1.294-.14-1.9.588-.273 1.084-.704 1.438-1.244.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
            </svg>
          )}
          <span className="text-xs text-gray-400 dark:text-gray-500 truncate">
            @{tweet.user.screen_name} · {formatDate(tweet.created_at)}
          </span>
        </div>
        <ExternalLink className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600 shrink-0" />
      </div>

      {/* Body */}
      <div className="text-[14px] leading-relaxed text-gray-700 dark:text-gray-300 mb-3 flex-1">
        {tweet.entities.map((entity, i) => {
          switch (entity.type) {
            case "url":
            case "symbol":
            case "hashtag":
            case "mention":
              return (
                <span key={i} className="text-sky-500">
                  {entity.text}
                </span>
              );
            case "media":
              return null;
            default:
              return <span key={i}>{entity.text}</span>;
          }
        })}
      </div>

      {/* URL card for link-only tweets with no media */}
      {media.length === 0 && urlEntities.length > 0 && (
        <div className="mb-3 rounded-lg border border-black/[0.06] dark:border-white/[0.06] bg-gray-50 dark:bg-white/[0.03] px-3 py-2.5 flex items-center gap-2">
          <ExternalLink className="w-4 h-4 text-sky-500 shrink-0" />
          <span className="text-xs font-mono text-sky-500 truncate">
            {urlEntities[0].displayUrl}
          </span>
        </div>
      )}

      {/* Media gallery */}
      {media.length > 0 && (
        <div className="mb-3">
          <MediaGallery items={media} />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4 pt-2 border-t border-black/[0.04] dark:border-white/[0.04]">
        <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
          <MessageCircle className="w-3.5 h-3.5" />
          {tweet.conversation_count > 0 && formatNumber(tweet.conversation_count)}
        </span>
        <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
          <Heart className="w-3.5 h-3.5" />
          {tweet.favorite_count > 0 && formatNumber(tweet.favorite_count)}
        </span>
      </div>
    </a>
  );
}

function TweetSkeleton() {
  return (
    <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#161618] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] animate-pulse h-full">
      <div className="flex items-center gap-2.5 mb-3">
        <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 shrink-0" />
        <div className="h-3.5 w-40 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
      <div className="space-y-2 mb-3">
        <div className="h-3.5 w-full bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-3.5 w-4/5 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-3.5 w-3/5 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
      <div className="aspect-video rounded-xl bg-gray-200 dark:bg-gray-700" />
    </div>
  );
}

export function CustomTweet({ id }: { id: string }) {
  const { data, isLoading, error } = useTweet(id);

  if (isLoading) return <TweetSkeleton />;
  if (error || !data) return null;

  const enriched = enrichTweet(data);
  return <TweetContent tweet={enriched} />;
}

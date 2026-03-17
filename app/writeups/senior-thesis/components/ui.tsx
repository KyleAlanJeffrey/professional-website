"use client";


export function FadeIn({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

export function GlassCard({
  label,
  children,
  caption,
}: {
  label: string;
  children: React.ReactNode;
  caption?: string;
}) {
  return (
    <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-2 w-2 rounded-full bg-indigo-500 dark:bg-indigo-400" />
        <span className="text-xs font-mono font-bold tracking-wider text-indigo-600 dark:text-indigo-400">
          {label}
        </span>
      </div>
      {children}
      {caption && (
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          {caption}
        </p>
      )}
    </div>
  );
}

export function Figure({
  src,
  alt,
  caption,
  figNum,
  onClick,
  className = "",
}: {
  src: string;
  alt: string;
  caption?: string;
  figNum?: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <figure className={`group ${className}`}>
      <div
        className="relative overflow-hidden rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 cursor-zoom-in hover:border-indigo-300 dark:hover:border-indigo-500/40 transition-colors"
        onClick={onClick}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-auto"
          loading="lazy"
        />
      </div>
      {(caption || figNum) && (
        <figcaption className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
          {figNum && (
            <span className="font-mono font-bold text-indigo-500 dark:text-indigo-400">
              {figNum}:{" "}
            </span>
          )}
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function FigureGrid({
  children,
  cols = 2,
}: {
  children: React.ReactNode;
  cols?: 2 | 3;
}) {
  return (
    <div className={`grid grid-cols-1 ${cols === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"} gap-4 my-8`}>
      {children}
    </div>
  );
}

export function VideoCard({
  src,
  label,
}: {
  src: string;
  label: string;
}) {
  return (
    <div>
      <video
        src={src}
        controls
        preload="metadata"
        suppressHydrationWarning
        className="w-full rounded-lg border border-black/10 dark:border-white/10"
      />
      <span className="text-xs font-mono text-gray-500 dark:text-gray-400 mt-2 block text-center">
        {label}
      </span>
    </div>
  );
}

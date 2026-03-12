"use client";

import SectionTitle from "@/components/section-title";
import SectionShell from "@/components/sections/section-shell";
import workProjectsData from "@/data/work_projects.json";
import Image from "next/image";
import { useEffect, useState } from "react";

type WorkProject = {
  name: string;
  company?: string;
  description?: string;
  topics?: string[];
  url?: string;
};

const workProjects = workProjectsData.projects ?? [];

const normalizePublicationUrl = (url: string) => {
  const trimmed = url.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
};

const getYoutubeVideoId = (url: string) => {
  try {
    const parsed = new URL(normalizePublicationUrl(url));
    if (parsed.hostname.includes("youtube.com")) {
      return parsed.searchParams.get("v");
    }
    if (parsed.hostname === "youtu.be") {
      return parsed.pathname.replace("/", "");
    }
    return null;
  } catch {
    return null;
  }
};

const getPublicationPreviewSrc = (url: string) => {
  try {
    const parsed = new URL(normalizePublicationUrl(url));
    if (parsed.hostname.includes("youtube.com")) {
      const videoId = parsed.searchParams.get("v");
      if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    }
    if (parsed.hostname === "youtu.be") {
      const videoId = parsed.pathname.replace("/", "");
      if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    }
    return parsed.toString();
  } catch {
    return normalizePublicationUrl(url);
  }
};

function MobilePublicationPreview({
  project,
  projectUrl,
  staticPreviewSrc,
  youtubeId,
  previewSrc,
  previewLoadState,
  onIframeLoad,
  onIframeError,
}: {
  project?: WorkProject;
  projectUrl: string;
  staticPreviewSrc: string;
  youtubeId: string | null;
  previewSrc: string;
  previewLoadState: "idle" | "loading" | "ready" | "failed";
  onIframeLoad: () => void;
  onIframeError: () => void;
}) {
  const usesIframe = !staticPreviewSrc && !youtubeId && !!previewSrc;
  return (
    <>
      <div className="aspect-video bg-black/5 dark:bg-white/5 relative">
        {staticPreviewSrc ? (
          <div className="h-full w-full relative">
            <Image
              src={staticPreviewSrc}
              alt={`${project?.name ?? "Project"} preview`}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        ) : youtubeId ? (
          <div className="h-full w-full relative">
            <Image
              src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
              alt={`${project?.name ?? "Project"} preview`}
              fill
              className="object-cover"
              sizes="100vw"
              suppressHydrationWarning
            />
          </div>
        ) : previewSrc && previewLoadState !== "failed" ? (
          <iframe
            key={previewSrc}
            src={previewSrc}
            title={project?.name}
            className="h-full w-full"
            loading="lazy"
            referrerPolicy="no-referrer"
            sandbox="allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox allow-forms allow-presentation"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            onLoad={onIframeLoad}
            onError={onIframeError}
          ></iframe>
        ) : null}
        {usesIframe && previewLoadState === "loading" ? (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-xs text-gray-500 dark:text-gray-400 font-bold tracking-[0.2em]">
              LOADING PREVIEW...
            </div>
          </div>
        ) : null}
      </div>
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {project?.topics?.slice(0, 3).map((topic) => (
            <span
              key={`mobile-${topic}`}
              className="text-xs px-2 py-0.5 rounded-full border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/10 text-gray-700 dark:text-gray-200"
            >
              {topic}
            </span>
          ))}
        </div>
        {projectUrl ? (
          <a
            href={projectUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-gray-600 dark:text-gray-300 font-bold tracking-[0.2em] hover:text-black dark:hover:text-white shrink-0 ml-2"
          >
            OPEN LINK
          </a>
        ) : null}
      </div>
    </>
  );
}

function PublicationPreview({
  project,
  projectUrl,
  staticPreviewSrc,
  youtubeId,
  previewSrc,
  usesIframePreview,
  previewLoadState,
  onIframeLoad,
  onIframeError,
  isTransitioning,
}: {
  project?: WorkProject;
  projectUrl: string;
  staticPreviewSrc: string;
  youtubeId: string | null;
  previewSrc: string;
  usesIframePreview: boolean;
  previewLoadState: "idle" | "loading" | "ready" | "failed";
  onIframeLoad: () => void;
  onIframeError: () => void;
  isTransitioning: boolean;
}) {
  return (
    <div className="rounded-3xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur shadow-[0_24px_48px_rgba(0,0,0,0.18)] overflow-hidden flex flex-col">
      <div
        className={`transition-all duration-200 ${
          isTransitioning
            ? "opacity-0 translate-y-1"
            : "opacity-100 translate-y-0"
        }`}
      >
        <div className="px-6 pt-6 pb-4 border-b border-black/10 dark:border-white/10 flex items-center justify-between min-h-24">
          <div>
            <div className="text-xs text-gray-500 dark:text-gray-400 font-bold tracking-[0.2em]">
              LIVE PREVIEW
            </div>
            <div className="text-lg font-black text-black dark:text-white tracking-[0.08em] line-clamp-2" style={{ fontFamily: "monospace" }}>
              {project?.name ?? "Select a publication"}
            </div>
          </div>
          {projectUrl ? (
            <a
              href={projectUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-gray-600 dark:text-gray-300 font-bold tracking-[0.2em] hover:text-black dark:hover:text-white"
            >
              OPEN LINK
            </a>
          ) : null}
        </div>
        <div className="aspect-video bg-black/5 dark:bg-white/5 relative">
          {staticPreviewSrc ? (
            <div className="h-full w-full relative">
              <Image
                src={staticPreviewSrc}
                alt={`${project?.name ?? "Project"} preview`}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 56rem, 100vw"
              />
            </div>
          ) : youtubeId ? (
            <div className="h-full w-full relative">
              <Image
                src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
                alt={`${project?.name ?? "Project"} preview`}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 56rem, 100vw"
                suppressHydrationWarning
              />
            </div>
          ) : previewSrc && previewLoadState !== "failed" ? (
            <iframe
              key={previewSrc}
              src={previewSrc}
              title={project?.name}
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer"
              sandbox="allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox allow-forms allow-presentation"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              onLoad={onIframeLoad}
              onError={onIframeError}
            ></iframe>
          ) : null}
          {usesIframePreview && previewLoadState === "loading" ? (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-xs text-gray-500 dark:text-gray-400 font-bold tracking-[0.2em]">
                LOADING PREVIEW...
              </div>
            </div>
          ) : null}
        </div>
        <div className="px-6 py-5 space-y-3 min-h-52">
          <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed min-h-16 line-clamp-3">
            {project?.description ??
              "Choose a publication from the list to see more details."}
          </p>
          <div className="flex flex-wrap gap-2 min-h-16 content-start">
            {project?.topics?.map((topic) => (
              <span
                key={`active-${topic}`}
                className="text-xs px-2.5 py-1 rounded-full border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/10 text-gray-700 dark:text-gray-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)] hover:bg-white dark:hover:bg-white/20"
              >
                {topic}
              </span>
            ))}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 font-bold tracking-[0.2em]">
            Some publications may block embeds. Use OPEN LINK if
            preview is blank.
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PublicationsSection() {
  const [activePublicationIndex, setActivePublicationIndex] = useState(0);
  const [displayedPublicationIndex, setDisplayedPublicationIndex] = useState(0);
  const [isPublicationTransitioning, setIsPublicationTransitioning] =
    useState(false);
  const [previewLoadState, setPreviewLoadState] = useState<
    "idle" | "loading" | "ready" | "failed"
  >("idle");

  const activeProject: WorkProject | undefined =
    workProjects[displayedPublicationIndex];
  const activeProjectUrl = activeProject?.url
    ? normalizePublicationUrl(activeProject.url)
    : "";
  const activeProjectStaticPreviewSrc =
    activeProject?.name === "Project Music Mode"
      ? "/Work-Projects/MusicMode.webp"
      : "";
  const activeProjectYoutubeId = activeProjectUrl
    ? getYoutubeVideoId(activeProjectUrl)
    : null;
  const activeProjectPreviewSrc = activeProjectUrl
    ? getPublicationPreviewSrc(activeProjectUrl)
    : "";
  const usesIframePreview =
    !activeProjectStaticPreviewSrc &&
    !activeProjectYoutubeId &&
    !!activeProjectPreviewSrc;

  useEffect(() => {
    if (activePublicationIndex === displayedPublicationIndex) return;

    setIsPublicationTransitioning(true);
    const timeoutId = window.setTimeout(() => {
      setDisplayedPublicationIndex(activePublicationIndex);
      setIsPublicationTransitioning(false);
    }, 170);

    return () => window.clearTimeout(timeoutId);
  }, [activePublicationIndex, displayedPublicationIndex]);

  useEffect(() => {
    if (!usesIframePreview) {
      setPreviewLoadState("idle");
      return;
    }

    setPreviewLoadState("loading");
    const timeoutId = window.setTimeout(() => {
      setPreviewLoadState((state) => (state === "ready" ? state : "failed"));
    }, 7000);

    return () => window.clearTimeout(timeoutId);
  }, [usesIframePreview]);

  useEffect(() => {
    const onSelectPublication = (event: Event) => {
      const customEvent = event as CustomEvent<{ name?: string }>;
      const name = customEvent.detail?.name?.toLowerCase();
      if (!name) return;
      const targetIndex = workProjects.findIndex((project) =>
        project.name.toLowerCase().includes(name),
      );
      if (targetIndex >= 0) {
        setActivePublicationIndex(targetIndex);
      }
    };

    window.addEventListener(
      "portfolio:select-publication",
      onSelectPublication as EventListener,
    );
    return () =>
      window.removeEventListener(
        "portfolio:select-publication",
        onSelectPublication as EventListener,
      );
  }, []);

  return (
    <SectionShell
      id="publications"
      className="mt-16 md:mt-24 max-w-7xl mx-auto cv-auto"
    >
      <div className="relative overflow-hidden rounded-3xl border border-black/10 dark:border-white/10 bg-gradient-to-br from-white/90 via-white/75 to-slate-100/45 dark:from-[#0b0c0f]/80 dark:via-white/5 dark:to-slate-900/60 p-6 md:p-12 shadow-[0_30px_70px_rgba(0,0,0,0.2)]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-12 h-60 w-60 rounded-full bg-gradient-to-br from-sky-200/60 via-indigo-200/20 to-transparent blur-3xl dark:from-sky-400/10 dark:via-indigo-400/5"></div>
          <div className="absolute top-14 left-12 h-14 w-14 rotate-12 rounded-2xl bg-gradient-to-br from-amber-400/55 to-orange-500/55 blur-sm dark:from-amber-300/20 dark:to-orange-300/20"></div>
          <div className="absolute -bottom-20 -left-10 h-52 w-52 rounded-full bg-gradient-to-tr from-sky-200/60 via-indigo-200/20 to-transparent blur-3xl dark:from-sky-400/10 dark:via-indigo-400/5"></div>
          <div className="absolute top-24 left-10 h-14 w-14 rotate-45 border border-black/10 dark:border-white/10"></div>
          <div className="absolute bottom-14 right-1/3 h-10 w-10 rounded-full border border-indigo-300/40 dark:border-indigo-300/20"></div>
          <div className="absolute inset-x-0 top-10 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent dark:via-white/10"></div>
        </div>

        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 md:gap-8 mb-8 md:mb-12">
            <div>
              <SectionTitle category="EDITIONS" title="WORK PUBLICATIONS" number="03" color="amber" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-4">
              <p className="text-gray-800 dark:text-gray-200 leading-relaxed transition-all duration-300 hover:text-gray-900 dark:hover:text-gray-100 font-medium">
                Editorial-style snapshots of work projects and publications,
                with context and a live preview whenever possible.
              </p>
              <div className="space-y-3">
                {workProjects.length ? (
                  workProjects.map((project, index) => {
                    const isActive = index === activePublicationIndex;
                    const isDisplayed = isActive && index === displayedPublicationIndex;
                    return (
                      <div
                        key={`${project.name}-${index}`}
                        className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
                          isActive
                            ? "border-black/40 dark:border-white/30 bg-black/5 dark:bg-white/10 shadow-[0_12px_30px_rgba(0,0,0,0.15)]"
                            : "border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(0,0,0,0.12)]"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setActivePublicationIndex(index)}
                          className="w-full text-left px-4 py-4 cursor-pointer"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="text-base font-black text-black dark:text-white tracking-[0.08em]" style={{ fontFamily: "monospace" }}>
                                {project.name}
                              </div>
                              <div className="text-xs text-gray-700 dark:text-gray-300 font-bold tracking-[0.2em] mt-1">
                                {project.company}
                              </div>
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 font-bold tracking-[0.2em]">PREVIEW</div>
                          </div>
                          <p className="text-sm text-gray-800 dark:text-gray-200 mt-3 line-clamp-3">{project.description}</p>
                        </button>
                        {/* Mobile inline preview — slides out from bottom of card */}
                        <div
                          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                            isDisplayed ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className="border-t border-black/10 dark:border-white/10">
                            <MobilePublicationPreview
                              project={project}
                              projectUrl={project.url ? normalizePublicationUrl(project.url) : ""}
                              staticPreviewSrc={project.name === "Project Music Mode" ? "/Work-Projects/MusicMode.webp" : ""}
                              youtubeId={project.url ? getYoutubeVideoId(project.url) : null}
                              previewSrc={project.url ? getPublicationPreviewSrc(project.url) : ""}
                              previewLoadState={previewLoadState}
                              onIframeLoad={() => setPreviewLoadState("ready")}
                              onIframeError={() => setPreviewLoadState("failed")}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : null}
              </div>
            </div>

            <div className="hidden lg:block lg:col-span-7">
              <PublicationPreview
                project={workProjects[displayedPublicationIndex]}
                projectUrl={activeProjectUrl}
                staticPreviewSrc={activeProjectStaticPreviewSrc}
                youtubeId={activeProjectYoutubeId}
                previewSrc={activeProjectPreviewSrc}
                usesIframePreview={usesIframePreview}
                previewLoadState={previewLoadState}
                onIframeLoad={() => setPreviewLoadState("ready")}
                onIframeError={() => setPreviewLoadState("failed")}
                isTransitioning={isPublicationTransitioning}
              />
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

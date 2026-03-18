"use client";

import { useApp } from "@/components/providers/app-provider";
import { FileText, Home, Moon, Sun } from "lucide-react";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/writeups", label: "Writeups", dot: "bg-indigo-500", activeText: "text-indigo-600 dark:text-indigo-400" },
  { href: "/notes", label: "Notes", dot: "bg-emerald-500", activeText: "text-emerald-600 dark:text-emerald-400" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { isDarkMode, toggleDarkMode } = useApp();
  const isHome = pathname === "/";

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-black/[0.06] dark:border-white/[0.06] bg-[#f6f2ea]/80 dark:bg-[#0b0c0f]/80 md:backdrop-blur-xl">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 flex items-center justify-between h-12">
        <div className="flex items-center gap-1">
          <a
            href="/"
            className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 ${
              isHome
                ? "text-gray-900 dark:text-white bg-black/[0.04] dark:bg-white/[0.06]"
                : "text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
            }`}
            aria-label="Home"
          >
            <Home className="h-4 w-4" />
          </a>
          <div className="w-px h-4 bg-black/[0.08] dark:bg-white/[0.08] mx-1" />
          {NAV_ITEMS.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <a
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-mono font-bold tracking-[0.05em] transition-all duration-200 ${
                  isActive
                    ? `${item.activeText} bg-black/[0.04] dark:bg-white/[0.06]`
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${item.dot} ${isActive ? "opacity-100" : "opacity-60 group-hover:opacity-100"} transition-opacity`} />
                {item.label}
              </a>
            );
          })}
        </div>
        <div className="flex items-center gap-1">
          <a
            href="/resume.pdf"
            download
            aria-label="Download resume PDF"
            onClick={() => (window as any).gtag?.("event", "resume_download")}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-mono font-bold tracking-[0.05em] text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-all duration-200"
          >
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">CV</span>
          </a>
          <button
            onClick={toggleDarkMode}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 dark:text-gray-500 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-all duration-200"
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </nav>
  );
}

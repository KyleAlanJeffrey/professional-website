import type { MetadataRoute } from "next";
import { getPublishedNotes } from "@/lib/notes";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://kylejeffrey.com";
  const now = new Date();

  const notes = getPublishedNotes();
  const noteEntries: MetadataRoute.Sitemap = notes.map((note) => ({
    url: `${baseUrl}/notes/${note.slug}`,
    lastModified: note.date ? new Date(note.date) : now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/notes`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/writeups`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/writeups/senior-thesis`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/writeups/ahrs`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    ...noteEntries,
  ];
}

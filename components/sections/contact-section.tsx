"use client";

import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import SectionShell from "@/components/sections/section-shell";

export default function ContactSection() {
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactError, setContactError] = useState<string | null>(null);
  const [contactSent, setContactSent] = useState(false);

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContactError(null);
    setContactSent(false);

    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
      setContactError("Please fill out name, email, and message.");
      return;
    }

    const to = "kyle.alan.jeffrey@gmail.com";
    const subject = contactSubject.trim()
      ? contactSubject.trim()
      : `Website inquiry from ${contactName.trim()}`;

    const bodyLines = [
      `Name: ${contactName.trim()}`,
      `Email: ${contactEmail.trim()}`,
      "",
      contactMessage.trim(),
    ];

    const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

    window.location.href = mailto;
    setContactSent(true);
  };

  return (
    <SectionShell
      id="contact"
      className="mt-16 md:mt-24 max-w-7xl mx-auto cv-auto relative isolate"
      decorations={
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-16 right-36 h-14 w-14 rounded-full border border-indigo-300/40 dark:border-indigo-300/20"></div>
          <div className="absolute top-14 left-6 h-20 w-28 rotate-6 border border-black/10 dark:border-white/10"></div>
          <div className="absolute bottom-10 right-10 h-8 w-24 -rotate-6 border border-black/10 dark:border-white/10"></div>
          <div className="absolute bottom-14 left-20 h-10 w-10 rotate-45 border border-black/10 dark:border-white/10"></div>
          <div className="absolute inset-x-10 top-6 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent dark:via-white/10"></div>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start mb-10 md:mb-16">
        <div className="lg:col-span-6 text-left">
          <div className="mb-4">
            <div className="text-sm text-gray-700 dark:text-gray-300 tracking-[0.3em] font-bold mb-2" style={{ fontFamily: "monospace" }}>GET IN TOUCH</div>
            <div className="w-16 h-1 bg-black dark:bg-white mx-0 relative overflow-hidden"><div className="absolute inset-0 bg-black dark:bg-white transform -translate-x-full transition-transform duration-500 hover:translate-x-0"></div></div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black dark:text-white mb-2 transition-all duration-300 hover:text-gray-700 dark:hover:text-gray-300 tracking-[0.1em]" style={{ fontFamily: "monospace" }}>LET'S WORK</h2>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black dark:text-white mb-4 transition-all duration-300 hover:text-gray-700 dark:hover:text-gray-300 tracking-[0.1em]" style={{ fontFamily: "monospace" }}>TOGETHER</h2>
          <div className="text-sm text-gray-700 dark:text-gray-300 mb-2 font-bold tracking-[0.2em]" style={{ fontFamily: "monospace" }}>AT</div>
          <div className="inline-block text-5xl md:text-6xl font-black text-black dark:text-white mb-4 transition-all duration-300 hover:scale-105 origin-left tracking-[0.1em]" style={{ fontFamily: "monospace" }}>07</div>
          <div className="w-16 h-1 bg-black dark:bg-white mx-0 relative overflow-hidden"><div className="absolute inset-0 bg-black dark:bg-white transform -translate-x-full transition-transform duration-500 hover:translate-x-0"></div></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="space-y-6">
            <div className="flex items-start space-x-4 group cursor-pointer p-4 rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur shadow-[0_16px_34px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_44px_rgba(0,0,0,0.16)]">
              <div className="w-12 h-12 rounded-xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110"><Mail className="h-5 w-5 text-gray-800 dark:text-gray-200 transition-all duration-300 group-hover:text-gray-900 dark:group-hover:text-gray-100" /></div>
              <div className="min-w-0"><h3 className="text-lg font-black tracking-[0.1em]" style={{ fontFamily: "monospace" }}>EMAIL</h3><p className="text-gray-800 dark:text-gray-200 break-all">kyle.alan.jeffrey@gmail.com</p><p className="text-sm text-gray-700 dark:text-gray-300 font-medium">I'll respond within 24 hours</p></div>
            </div>
            <a href="https://github.com/KyleAlanJeffrey" className="flex items-start space-x-4 group cursor-pointer p-4 rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur shadow-[0_16px_34px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_44px_rgba(0,0,0,0.16)]">
              <div className="w-12 h-12 rounded-xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110"><Github className="h-5 w-5 text-gray-800 dark:text-gray-200 transition-all duration-300 group-hover:text-gray-900 dark:group-hover:text-gray-100" /></div>
              <div className="min-w-0"><h3 className="text-lg font-black tracking-[0.1em]" style={{ fontFamily: "monospace" }}>GITHUB</h3><p className="text-gray-800 dark:text-gray-200">@KyleAlanJeffrey</p><p className="text-sm text-gray-700 dark:text-gray-300 font-medium">Check out my latest projects</p></div>
            </a>
            <a href="https://www.linkedin.com/in/kyle-jeffrey-1651b5189/" className="flex items-start space-x-4 group cursor-pointer p-4 rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur shadow-[0_16px_34px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_44px_rgba(0,0,0,0.16)]">
              <div className="w-12 h-12 rounded-xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110"><Linkedin className="h-5 w-5 text-gray-800 dark:text-gray-200 transition-all duration-300 group-hover:text-gray-900 dark:group-hover:text-gray-100" /></div>
              <div className="min-w-0"><h3 className="text-lg font-black tracking-[0.1em]" style={{ fontFamily: "monospace" }}>LINKEDIN</h3><p className="text-gray-800 dark:text-gray-200">Kyle</p><p className="text-sm text-gray-700 dark:text-gray-300 font-medium">Let's connect professionally</p></div>
            </a>
            <div className="flex items-start space-x-4 group cursor-pointer p-4 rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur shadow-[0_16px_34px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_44px_rgba(0,0,0,0.16)]">
              <div className="w-12 h-12 rounded-xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110"><MapPin className="h-5 w-5 text-gray-800 dark:text-gray-200 transition-all duration-300 group-hover:text-gray-900 dark:group-hover:text-gray-100" /></div>
              <div className="min-w-0"><h3 className="text-lg font-black tracking-[0.1em]" style={{ fontFamily: "monospace" }}>LOCATION</h3><p className="text-gray-800 dark:text-gray-200">San Francisco, CA</p><p className="text-sm text-gray-700 dark:text-gray-300 font-medium">Open to remote work</p></div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <form
            className="space-y-8 relative rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur p-6 md:p-8 shadow-[0_18px_40px_rgba(0,0,0,0.12)]"
            onSubmit={handleContactSubmit}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-black text-black dark:text-white mb-2 transition-all duration-300 hover:text-gray-700 dark:hover:text-gray-300 tracking-[0.1em]" style={{ fontFamily: "monospace" }}>
                  NAME
                </label>
                <input type="text" id="name" name="name" className="w-full rounded-xl px-4 py-3 border border-black/15 dark:border-white/15 dark:bg-black/30 dark:text-white bg-white/80 focus:outline-none focus:ring-2 focus:ring-gray-500/60 dark:focus:ring-gray-400/60 focus:border-transparent transition-all duration-300 hover:border-black/25 dark:hover:border-white/25 font-medium" placeholder="Your name" style={{ fontFamily: "monospace" }} value={contactName} onChange={(e) => setContactName(e.target.value)} />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-black text-black dark:text-white mb-2 transition-all duration-300 hover:text-gray-700 dark:hover:text-gray-300 tracking-[0.1em]" style={{ fontFamily: "monospace" }}>
                  EMAIL
                </label>
                <input type="email" id="email" name="email" className="w-full rounded-xl px-4 py-3 border border-black/15 dark:border-white/15 dark:bg-black/30 dark:text-white bg-white/80 focus:outline-none focus:ring-2 focus:ring-gray-500/60 dark:focus:ring-gray-400/60 focus:border-transparent transition-all duration-300 hover:border-black/25 dark:hover:border-white/25 font-medium" placeholder="your@email.com" style={{ fontFamily: "monospace" }} value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-black text-black dark:text-white mb-2 transition-all duration-300 hover:text-gray-700 dark:hover:text-gray-300 tracking-[0.1em]" style={{ fontFamily: "monospace" }}>
                SUBJECT
              </label>
              <input type="text" id="subject" name="subject" className="w-full rounded-xl px-4 py-3 border border-black/15 dark:border-white/15 dark:bg-black/30 dark:text-white bg-white/80 focus:outline-none focus:ring-2 focus:ring-gray-500/60 dark:focus:ring-gray-400/60 focus:border-transparent transition-all duration-300 hover:border-black/25 dark:hover:border-white/25 font-medium" placeholder="What's this about?" style={{ fontFamily: "monospace" }} value={contactSubject} onChange={(e) => setContactSubject(e.target.value)} />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-black text-black dark:text-white mb-2 transition-all duration-300 hover:text-gray-700 dark:hover:text-gray-300 tracking-[0.1em]" style={{ fontFamily: "monospace" }}>
                MESSAGE
              </label>
              <textarea id="message" name="message" rows={6} className="w-full rounded-xl px-4 py-3 border border-black/15 dark:border-white/15 dark:bg-black/30 dark:text-white bg-white/80 focus:outline-none focus:ring-2 focus:ring-gray-500/60 dark:focus:ring-gray-400/60 focus:border-transparent resize-none transition-all duration-300 hover:border-black/25 dark:hover:border-white/25 font-medium" placeholder="Tell me about your project..." style={{ fontFamily: "monospace" }} value={contactMessage} onChange={(e) => setContactMessage(e.target.value)} />
            </div>
            {contactError ? <div className="border-2 border-red-500 bg-red-50 dark:bg-gray-800 p-3 text-sm font-bold text-red-700 dark:text-red-400 tracking-[0.1em]" style={{ fontFamily: "monospace" }}>{contactError}</div> : null}
            {contactSent ? <div className="border-2 border-green-600 bg-green-50 dark:bg-gray-800 p-3 text-sm font-bold text-green-700 dark:text-green-400 tracking-[0.1em]" style={{ fontFamily: "monospace" }}>Opening your email client...</div> : null}
            <Button className="w-full md:w-auto px-8 py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 font-black tracking-[0.1em] transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 border-black dark:border-white" style={{ fontFamily: "monospace" }} type="submit">SEND MESSAGE</Button>
          </form>
        </div>
      </div>
    </SectionShell>
  );
}

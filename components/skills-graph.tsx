"use client";

import { useEffect, useRef } from "react";

const CATEGORY_COLORS: Record<string, string> = {
  Frontend: "#60a5fa",
  Backend:  "#34d399",
  DevOps:   "#fb923c",
  Database: "#a78bfa",
  Other:    "#94a3b8",
};

const SKILL_CATEGORIES: Record<string, string> = {
  React: "Frontend", "React Native": "Frontend", Expo: "Frontend",
  Redux: "Frontend", "React Router": "Frontend", "React Query": "Frontend",
  Python: "Backend", FastAPI: "Backend", NestJS: "Backend", "Node.js": "Backend",
  SaltStack: "DevOps", AWS: "DevOps", Docker: "DevOps", "CI/CD": "DevOps",
  Gitlab: "DevOps", Linux: "DevOps", IOT: "DevOps",
  Postgres: "Database",
  "Google 3": "Other", "Google Cloud": "Other", Bash: "Other",
  "Automation Studio": "Other",
};

// Boids tuning
const MAX_SPEED   = 1.4;
const MIN_SPEED   = 0.4;
const PERCEPTION  = 120;
const SEP_DIST    = 52;
const W_SEP       = 0.22;
const W_ALIGN     = 0.05;
const W_COH_SAME  = 0.007;  // strong pull toward same-category flockmates
const W_COH_DIFF  = 0.0006; // weak pull toward everything else
const MARGIN      = 70;
const BOUNDARY    = 0.16;

type Boid = {
  id: string;
  category: string;
  x: number; y: number;
  vx: number; vy: number;
};

function clampSpeed(vx: number, vy: number): [number, number] {
  const mag = Math.hypot(vx, vy);
  if (mag === 0) return [(Math.random() - 0.5) * 0.6, (Math.random() - 0.5) * 0.6];
  if (mag > MAX_SPEED) return [(vx / mag) * MAX_SPEED, (vy / mag) * MAX_SPEED];
  if (mag < MIN_SPEED) return [(vx / mag) * MIN_SPEED, (vy / mag) * MIN_SPEED];
  return [vx, vy];
}

type Props = {
  jobs: { skills: string[] }[];
  onSkillClick?: (skill: string) => void;
};

export default function SkillsGraph({ jobs, onSkillClick }: Props) {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const onClickRef   = useRef(onSkillClick);

  useEffect(() => { onClickRef.current = onSkillClick; }, [onSkillClick]);

  useEffect(() => {
    const canvas    = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = window.devicePixelRatio ?? 1;
    const ctx  = canvas.getContext("2d")!;

    let w = 0, h = 0;
    function resize() {
      w = container!.clientWidth;
      h = container!.clientHeight;
      canvas!.width  = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width  = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    // Build boids from unique skills across all jobs
    const skillSet = new Set<string>();
    jobs.forEach((j) => j.skills.forEach((s) => skillSet.add(s)));

    const boids: Boid[] = Array.from(skillSet).map((id) => ({
      id,
      category: SKILL_CATEGORIES[id] ?? "Other",
      x:  MARGIN + Math.random() * (w - MARGIN * 2),
      y:  MARGIN + Math.random() * (h - MARGIN * 2),
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
    }));

    let mouse = { x: -9999, y: -9999 };
    let hoveredId: string | null = null;

    function update() {
      boids.forEach((b) => {
        let dvx = 0, dvy = 0;
        let sepX = 0, sepY = 0;
        let alignX = 0, alignY = 0, alignN = 0;
        let sameCX = 0, sameCY = 0, sameN = 0;
        let diffCX = 0, diffCY = 0, diffN = 0;

        for (const o of boids) {
          if (o === b) continue;
          const dx = o.x - b.x, dy = o.y - b.y;
          const dist = Math.hypot(dx, dy);

          if (dist < SEP_DIST && dist > 0) {
            sepX -= dx / dist;
            sepY -= dy / dist;
          }
          if (dist < PERCEPTION) {
            alignX += o.vx; alignY += o.vy; alignN++;
            if (o.category === b.category) { sameCX += o.x; sameCY += o.y; sameN++; }
            else                           { diffCX += o.x; diffCY += o.y; diffN++; }
          }
        }

        dvx += sepX * W_SEP;
        dvy += sepY * W_SEP;

        if (alignN > 0) {
          dvx += (alignX / alignN - b.vx) * W_ALIGN;
          dvy += (alignY / alignN - b.vy) * W_ALIGN;
        }
        if (sameN > 0) {
          dvx += (sameCX / sameN - b.x) * W_COH_SAME;
          dvy += (sameCY / sameN - b.y) * W_COH_SAME;
        }
        if (diffN > 0) {
          dvx += (diffCX / diffN - b.x) * W_COH_DIFF;
          dvy += (diffCY / diffN - b.y) * W_COH_DIFF;
        }

        // Soft boundary
        if (b.x < MARGIN)     dvx += BOUNDARY * ((MARGIN - b.x) / MARGIN);
        if (b.x > w - MARGIN) dvx -= BOUNDARY * ((b.x - (w - MARGIN)) / MARGIN);
        if (b.y < MARGIN)     dvy += BOUNDARY * ((MARGIN - b.y) / MARGIN);
        if (b.y > h - MARGIN) dvy -= BOUNDARY * ((b.y - (h - MARGIN)) / MARGIN);

        b.vx += dvx;
        b.vy += dvy;
        [b.vx, b.vy] = clampSpeed(b.vx, b.vy);
        b.x += b.vx;
        b.y += b.vy;
      });
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);

      // Find hovered boid
      hoveredId = null;
      let minDist = 32;
      for (const b of boids) {
        const d = Math.hypot(b.x - mouse.x, b.y - mouse.y);
        if (d < minDist) { minDist = d; hoveredId = b.id; }
      }

      canvas!.style.cursor = hoveredId ? "pointer" : "default";

      for (const b of boids) {
        const color     = CATEGORY_COLORS[b.category] ?? CATEGORY_COLORS.Other;
        const isHovered = b.id === hoveredId;
        const size      = isHovered ? 16 : 11;
        const angle     = Math.atan2(b.vy, b.vx);

        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(angle);

        // Triangle pointing in direction of travel
        ctx.beginPath();
        ctx.moveTo(size, 0);
        ctx.lineTo(-size * 0.65, -size * 0.52);
        ctx.lineTo(-size * 0.65,  size * 0.52);
        ctx.closePath();

        if (isHovered) {
          ctx.shadowColor = color;
          ctx.shadowBlur  = 14;
        }
        ctx.fillStyle   = color;
        ctx.globalAlpha = isHovered ? 1 : 0.82;
        ctx.fill();
        ctx.shadowBlur  = 0;

        ctx.restore();

        // Label below boid
        const label = b.id.toUpperCase();
        ctx.font        = `bold ${isHovered ? 11 : 9}px monospace`;
        ctx.fillStyle   = color;
        ctx.globalAlpha = isHovered ? 1 : 0.6;
        ctx.textAlign   = "center";
        ctx.fillText(label, b.x, b.y + size + 13);
        ctx.globalAlpha = 1;
      }
    }

    let rafId: number;
    function loop() {
      update();
      draw();
      rafId = requestAnimationFrame(loop);
    }
    rafId = requestAnimationFrame(loop);

    const onMouseMove  = (e: MouseEvent) => {
      const r = canvas!.getBoundingClientRect();
      mouse = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onMouseLeave = () => { mouse = { x: -9999, y: -9999 }; };
    const onClick      = () => { if (hoveredId) onClickRef.current?.(hoveredId); };

    canvas.addEventListener("mousemove",  onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("click",      onClick);

    const ro = new ResizeObserver(() => {
      resize();
      boids.forEach((b) => {
        b.x = Math.min(Math.max(b.x, MARGIN), w - MARGIN);
        b.y = Math.min(Math.max(b.y, MARGIN), h - MARGIN);
      });
    });
    ro.observe(container);

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener("mousemove",  onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("click",      onClick);
      ro.disconnect();
    };
  }, [jobs]);

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-3 mb-4">
        {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
          <div key={cat} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-xs font-bold tracking-[0.1em] text-gray-600 dark:text-gray-400" style={{ fontFamily: "monospace" }}>
              {cat.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
      <div
        ref={containerRef}
        className="w-full h-72 rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur overflow-hidden"
      >
        <canvas ref={canvasRef} style={{ display: "block" }} />
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-500 mt-2 font-medium tracking-[0.05em]" style={{ fontFamily: "monospace" }}>
        Same-color boids flock together · Hover to see skill · Click to filter jobs
      </p>
    </div>
  );
}

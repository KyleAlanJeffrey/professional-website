"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";

type Node = d3.SimulationNodeDatum & {
  id: string;
  category: string;
};

type Link = d3.SimulationLinkDatum<Node> & {
  source: string | Node;
  target: string | Node;
};

const CATEGORY_COLORS: Record<string, string> = {
  Frontend:  "#60a5fa", // blue-400
  Backend:   "#34d399", // emerald-400
  DevOps:    "#fb923c", // orange-400
  Database:  "#a78bfa", // violet-400
  Other:     "#94a3b8", // slate-400
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

type SkillsGraphProps = {
  jobs: { skills: string[] }[];
  onSkillClick?: (skill: string) => void;
};

export default function SkillsGraph({ jobs, onSkillClick }: SkillsGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Collect unique skills and build co-occurrence edges
    const skillSet = new Set<string>();
    jobs.forEach((job) => job.skills.forEach((s) => skillSet.add(s)));
    const skills = Array.from(skillSet);

    const nodes: Node[] = skills.map((id) => ({
      id,
      category: SKILL_CATEGORIES[id] ?? "Other",
    }));

    const linkSet = new Set<string>();
    const links: Link[] = [];
    jobs.forEach((job) => {
      for (let i = 0; i < job.skills.length; i++) {
        for (let j = i + 1; j < job.skills.length; j++) {
          const key = [job.skills[i], job.skills[j]].sort().join("||");
          if (!linkSet.has(key)) {
            linkSet.add(key);
            links.push({ source: job.skills[i], target: job.skills[j] });
          }
        }
      }
    });

    const width = svg.clientWidth || 600;
    const height = svg.clientHeight || 400;

    d3.select(svg).selectAll("*").remove();

    const root = d3.select(svg)
      .attr("width", width)
      .attr("height", height);

    const simulation = d3.forceSimulation<Node>(nodes)
      .force("link", d3.forceLink<Node, Link>(links).id((d) => d.id).distance(60))
      .force("charge", d3.forceManyBody().strength(-120))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide(28));

    const link = root.append("g")
      .selectAll<SVGLineElement, Link>("line")
      .data(links)
      .join("line")
      .attr("stroke", "rgba(128,128,128,0.25)")
      .attr("stroke-width", 1);

    const node = root.append("g")
      .selectAll<SVGGElement, Node>("g")
      .data(nodes)
      .join("g")
      .style("cursor", "pointer")
      .call(
        d3.drag<SVGGElement, Node>()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x; d.fy = d.y;
          })
          .on("drag", (event, d) => { d.fx = event.x; d.fy = event.y; })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null; d.fy = null;
          })
      );

    node.append("circle")
      .attr("r", 18)
      .attr("fill", (d) => CATEGORY_COLORS[d.category] ?? CATEGORY_COLORS.Other)
      .attr("fill-opacity", 0.85)
      .attr("stroke", "rgba(0,0,0,0.15)")
      .attr("stroke-width", 1);

    node.append("text")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("font-size", "7px")
      .attr("font-weight", "bold")
      .attr("font-family", "monospace")
      .attr("fill", "#000")
      .attr("fill-opacity", 0.75)
      .text((d) => d.id.length > 8 ? d.id.slice(0, 7) + "…" : d.id);

    // Hover: highlight connected nodes
    node
      .on("mouseenter", (_, hovered) => {
        const connectedIds = new Set<string>();
        links.forEach((l) => {
          const s = typeof l.source === "object" ? l.source.id : l.source;
          const t = typeof l.target === "object" ? l.target.id : l.target;
          if (s === hovered.id) connectedIds.add(t);
          if (t === hovered.id) connectedIds.add(s);
        });
        node.select("circle")
          .attr("fill-opacity", (d) =>
            d.id === hovered.id || connectedIds.has(d.id) ? 1 : 0.25
          );
        link
          .attr("stroke-opacity", (l) => {
            const s = typeof l.source === "object" ? l.source.id : l.source;
            const t = typeof l.target === "object" ? l.target.id : l.target;
            return s === hovered.id || t === hovered.id ? 0.8 : 0.1;
          })
          .attr("stroke-width", (l) => {
            const s = typeof l.source === "object" ? l.source.id : l.source;
            const t = typeof l.target === "object" ? l.target.id : l.target;
            return s === hovered.id || t === hovered.id ? 2 : 1;
          });
      })
      .on("mouseleave", () => {
        node.select("circle").attr("fill-opacity", 0.85);
        link.attr("stroke-opacity", 1).attr("stroke-width", 1);
      })
      .on("click", (_, d) => onSkillClick?.(d.id));

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => (d.source as Node).x ?? 0)
        .attr("y1", (d) => (d.source as Node).y ?? 0)
        .attr("x2", (d) => (d.target as Node).x ?? 0)
        .attr("y2", (d) => (d.target as Node).y ?? 0);
      node.attr("transform", (d) => `translate(${d.x ?? 0},${d.y ?? 0})`);
    });

    return () => { simulation.stop(); };
  }, [jobs, onSkillClick]);

  // Legend
  const categories = Object.entries(CATEGORY_COLORS);

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-3 mb-4">
        {categories.map(([cat, color]) => (
          <div key={cat} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-xs font-bold tracking-[0.1em] text-gray-600 dark:text-gray-400" style={{ fontFamily: "monospace" }}>
              {cat.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
      <svg
        ref={svgRef}
        className="w-full h-72 rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur"
      />
      <p className="text-xs text-gray-500 dark:text-gray-500 mt-2 font-medium tracking-[0.05em]" style={{ fontFamily: "monospace" }}>
        Drag nodes · Hover to highlight connections · Click to filter jobs
      </p>
    </div>
  );
}

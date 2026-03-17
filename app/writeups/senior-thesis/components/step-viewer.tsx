"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Center, Environment } from "@react-three/drei";
import { useEffect, useState, useMemo } from "react";
import * as THREE from "three";

interface StepMesh {
  positions: Float32Array;
  normals: Float32Array | null;
  indices: Uint32Array;
  color?: { r: number; g: number; b: number };
}

function useStepFile(url: string) {
  const [meshes, setMeshes] = useState<StepMesh[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const occtModule = await import("occt-import-js");
        const initFn = occtModule.default as unknown as (opts?: {
          locateFile: (path: string) => string;
        }) => Promise<{
          ReadStepFile: (data: Uint8Array, params: null) => {
            meshes: Array<{
              attributes: {
                position: { array: number[] };
                normal?: { array: number[] };
              };
              index: { array: number[] };
              color?: [number, number, number];
            }>;
          };
        }>;
        const occt = await initFn({
          locateFile: (path: string) => {
            if (path.endsWith(".wasm")) return "/occt-import-js.wasm";
            return path;
          },
        });

        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
        const buffer = await response.arrayBuffer();
        const result = occt.ReadStepFile(new Uint8Array(buffer), null);

        if (cancelled) return;

        const parsed: StepMesh[] = result.meshes.map((mesh) => ({
          positions: new Float32Array(mesh.attributes.position.array),
          normals: mesh.attributes.normal
            ? new Float32Array(mesh.attributes.normal.array)
            : null,
          indices: new Uint32Array(mesh.index.array),
          color: mesh.color
            ? { r: mesh.color[0], g: mesh.color[1], b: mesh.color[2] }
            : undefined,
        }));

        setMeshes(parsed);
        setLoading(false);
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to load STEP file");
          setLoading(false);
        }
      }
    }

    load();
    return () => { cancelled = true; };
  }, [url]);

  return { meshes, loading, error };
}

function StepMeshGeometry({ mesh }: { mesh: StepMesh }) {
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(mesh.positions, 3));
    if (mesh.normals) {
      geo.setAttribute("normal", new THREE.Float32BufferAttribute(mesh.normals, 3));
    } else {
      geo.computeVertexNormals();
    }
    geo.setIndex(new THREE.BufferAttribute(mesh.indices, 1));
    return geo;
  }, [mesh]);

  const color = mesh.color
    ? new THREE.Color(mesh.color.r, mesh.color.g, mesh.color.b)
    : new THREE.Color(0.6, 0.65, 0.75);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color={color} metalness={0.3} roughness={0.6} side={THREE.DoubleSide} />
    </mesh>
  );
}

export function StepViewer({
  url,
  name,
  className = "",
}: {
  url: string;
  name: string;
  className?: string;
}) {
  const { meshes, loading, error } = useStepFile(url);
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={className}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between gap-3 p-3 rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 hover:border-indigo-300 dark:hover:border-indigo-500/40 transition-all text-left group"
      >
        <div className="flex items-center gap-3">
          <div className="shrink-0 w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center">
            <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400">
              STEP
            </span>
          </div>
          <div>
            <span className="block text-sm font-mono text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {name}
            </span>
            <span className="block text-xs text-gray-400 dark:text-gray-500">
              {expanded ? "Click to collapse" : "Click to view 3D model"}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={url}
            download
            onClick={(e) => e.stopPropagation()}
            className="text-xs font-mono text-indigo-500 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 underline underline-offset-2"
          >
            Download
          </a>
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform ${expanded ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {expanded && (
        <div className="mt-2 rounded-xl border border-black/10 dark:border-white/10 overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 dark:from-[#111] dark:to-[#0a0a0a]" style={{ height: 400 }}>
          {loading && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="inline-block w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mb-2" />
                <p className="text-xs font-mono text-gray-500 dark:text-gray-400">Loading STEP file...</p>
              </div>
            </div>
          )}
          {error && (
            <div className="flex items-center justify-center h-full">
              <p className="text-xs font-mono text-red-400">Error: {error}</p>
            </div>
          )}
          {!loading && !error && (
            <Canvas camera={{ position: [3, 2, 3], fov: 50 }}>
              <ambientLight intensity={0.4} />
              <directionalLight position={[5, 5, 5]} intensity={0.8} />
              <directionalLight position={[-3, -3, 2]} intensity={0.3} />
              <Environment preset="studio" />
              <Center>
                {meshes.map((mesh, i) => (
                  <StepMeshGeometry key={i} mesh={mesh} />
                ))}
              </Center>
              <OrbitControls enableDamping dampingFactor={0.1} />
            </Canvas>
          )}
        </div>
      )}
    </div>
  );
}

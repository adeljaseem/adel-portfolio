"use client";

import { useEffect, useMemo, useRef } from "react";
import { useReducedMotion } from "motion/react";

type Point3D = { x: number; y: number; z: number; phase: number };
type Edge = [number, number];
type ProjectedPoint = { x: number; y: number; z: number; depth: number; phase: number };

function createSphere(count: number): Point3D[] {
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: count }, (_, index) => {
    const y = 1 - (index / Math.max(count - 1, 1)) * 2;
    const radius = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = goldenAngle * index;
    return {
      x: Math.cos(theta) * radius,
      y,
      z: Math.sin(theta) * radius,
      phase: (index * 0.731) % (Math.PI * 2),
    };
  });
}

function createEdges(points: Point3D[], neighbors = 3): Edge[] {
  const unique = new Set<string>();
  const edges: Edge[] = [];
  points.forEach((point, sourceIndex) => {
    const nearest = points
      .map((candidate, targetIndex) => ({
        targetIndex,
        distance:
          (point.x - candidate.x) ** 2 +
          (point.y - candidate.y) ** 2 +
          (point.z - candidate.z) ** 2,
      }))
      .filter(({ targetIndex }) => targetIndex !== sourceIndex)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, neighbors);

    nearest.forEach(({ targetIndex }) => {
      const start = Math.min(sourceIndex, targetIndex);
      const end = Math.max(sourceIndex, targetIndex);
      const key = `${start}-${end}`;
      if (!unique.has(key)) {
        unique.add(key);
        edges.push([start, end]);
      }
    });
  });
  return edges;
}

function rotatePoint(point: Point3D, rotationX: number, rotationY: number, rotationZ: number) {
  const cosY = Math.cos(rotationY);
  const sinY = Math.sin(rotationY);
  const x1 = point.x * cosY - point.z * sinY;
  const z1 = point.x * sinY + point.z * cosY;
  const cosX = Math.cos(rotationX);
  const sinX = Math.sin(rotationX);
  const y2 = point.y * cosX - z1 * sinX;
  const z2 = point.y * sinX + z1 * cosX;
  const cosZ = Math.cos(rotationZ);
  const sinZ = Math.sin(rotationZ);
  return {
    x: x1 * cosZ - y2 * sinZ,
    y: x1 * sinZ + y2 * cosZ,
    z: z2,
  };
}

export function NetworkOrb() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const visibleRef = useRef(true);
  const reduceMotion = useReducedMotion();
  const points = useMemo(() => createSphere(88), []);
  const edges = useMemo(() => createEdges(points, 3), [points]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !wrapper || !context) return;

    let animationFrame = 0;
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = wrapper.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      width = Math.max(rect.width, 1);
      height = Math.max(rect.height, 1);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const project = (time: number): ProjectedPoint[] => {
      const baseRotation = reduceMotion ? 0.48 : time * 0.00012;
      const rotationY = baseRotation + pointerRef.current.x * 0.3;
      const rotationX = -0.22 + Math.sin(baseRotation * 0.7) * 0.08 + pointerRef.current.y * 0.2;
      const rotationZ = reduceMotion ? 0.04 : Math.sin(baseRotation * 0.45) * 0.07;
      const radius = Math.min(width, height) * 0.32;
      const cameraDistance = 3.35;

      return points.map((point) => {
        const rotated = rotatePoint(point, rotationX, rotationY, rotationZ);
        const perspective = cameraDistance / (cameraDistance - rotated.z);
        const scale = radius * perspective;
        return {
          x: width / 2 + rotated.x * scale,
          y: height / 2 + rotated.y * scale,
          z: rotated.z,
          depth: (rotated.z + 1) / 2,
          phase: point.phase,
        };
      });
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      const centerX = width / 2;
      const centerY = height / 2;
      const auraRadius = Math.min(width, height) * 0.44;
      const aura = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, auraRadius);
      aura.addColorStop(0, "rgba(34, 211, 238, 0.10)");
      aura.addColorStop(0.48, "rgba(99, 102, 241, 0.055)");
      aura.addColorStop(1, "rgba(2, 6, 23, 0)");
      context.fillStyle = aura;
      context.fillRect(0, 0, width, height);

      const projected = project(time);
      edges.forEach(([fromIndex, toIndex], edgeIndex) => {
        const from = projected[fromIndex];
        const to = projected[toIndex];
        if (!from || !to) return;
        const averageDepth = (from.depth + to.depth) / 2;
        const pulse = reduceMotion ? 0.45 : 0.45 + Math.sin(time * 0.0012 + edgeIndex * 0.37) * 0.15;
        const alpha = Math.max(0.04, averageDepth * 0.28 * pulse);
        context.beginPath();
        context.moveTo(from.x, from.y);
        context.lineTo(to.x, to.y);
        context.strokeStyle = `rgba(103, 232, 249, ${alpha})`;
        context.lineWidth = 0.5 + averageDepth * 0.65;
        context.stroke();
      });

      projected
        .map((point, index) => ({ point, index }))
        .sort((a, b) => a.point.z - b.point.z)
        .forEach(({ point, index }) => {
          const shimmer = reduceMotion ? 0.5 : (Math.sin(time * 0.002 + point.phase) + 1) / 2;
          const radius = 0.9 + point.depth * 1.85 + shimmer * 0.45;
          const isAnchor = index % 17 === 0;
          if (isAnchor) {
            context.beginPath();
            context.arc(point.x, point.y, radius * 3.4, 0, Math.PI * 2);
            context.fillStyle = `rgba(167, 139, 250, ${0.03 + point.depth * 0.08})`;
            context.fill();
          }
          context.beginPath();
          context.arc(point.x, point.y, isAnchor ? radius * 1.35 : radius, 0, Math.PI * 2);
          context.fillStyle = isAnchor
            ? `rgba(196, 181, 253, ${0.55 + point.depth * 0.4})`
            : `rgba(103, 232, 249, ${0.3 + point.depth * 0.65})`;
          context.fill();
        });

      if (!reduceMotion && visibleRef.current) {
        animationFrame = window.requestAnimationFrame(draw);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = wrapper.getBoundingClientRect();
      pointerRef.current = {
        x: ((event.clientX - rect.left) / Math.max(rect.width, 1) - 0.5) * 2,
        y: ((event.clientY - rect.top) / Math.max(rect.height, 1) - 0.5) * 2,
      };
    };
    const handlePointerLeave = () => {
      pointerRef.current = { x: 0, y: 0 };
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw(performance.now());
    });
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      const wasVisible = visibleRef.current;
      visibleRef.current = Boolean(entry?.isIntersecting);
      if (!reduceMotion && entry?.isIntersecting && !wasVisible) {
        animationFrame = window.requestAnimationFrame(draw);
      }
    });

    resizeObserver.observe(wrapper);
    visibilityObserver.observe(wrapper);
    wrapper.addEventListener("pointermove", handlePointerMove, { passive: true });
    wrapper.addEventListener("pointerleave", handlePointerLeave);
    resize();
    draw(performance.now());

    return () => {
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      wrapper.removeEventListener("pointermove", handlePointerMove);
      wrapper.removeEventListener("pointerleave", handlePointerLeave);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, [edges, points, reduceMotion]);

  return (
    <div ref={wrapperRef} className="relative size-full min-h-[360px]" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
      <div className="absolute inset-1/2 grid size-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-cyan-200/15 bg-[#07101a]/75 text-center shadow-2xl shadow-cyan-400/10 backdrop-blur-md">
        <div>
          <span className="block font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-200/80">Build layer</span>
          <span className="mt-2 block text-sm font-semibold text-white">Product ↔ Systems</span>
        </div>
      </div>
    </div>
  );
}

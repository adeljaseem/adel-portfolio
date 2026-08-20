"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  KeyboardControls,
  PerspectiveCamera,
  RoundedBox,
  Sky,
  useKeyboardControls,
} from "@react-three/drei";
import * as THREE from "three";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Building2,
  BriefcaseBusiness,
  Code2,
  Mail,
  MapPin,
  MousePointerClick,
  Phone,
  Smartphone,
  Sparkles,
  X,
} from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useHasFinePointer } from "@/hooks/useHasFinePointer";
import {
  about,
  contact,
  district,
  earlierBuilds,
  experience,
  featuredProject,
  hero,
  profile,
  secondaryProjects,
  skills,
  WORLD_POSITIONS,
  SPAWN_POINT,
  EYE_HEIGHT,
  WORLD_RADIUS,
} from "@/lib/data";

const SIGNAL = "#6254d9";
const PULSE = "#f0568c";
const ROAD = "#2f3338";
const SIDEWALK = "#b9b4a8";
const SIDEWALK_EDGE = "#8e8a81";
const GRASS = "#66765a";
const MOVE_SPEED = 6.2;
const SPRINT_MULTIPLIER = 1.55;
const PLAYER_RADIUS = 0.42;
const ROAD_WIDTH = 8;
const CROSS_ROAD_WIDTH = 5.5;
const CITY_SIZE = 104;
const MOBILE_CAMERA_POSITION: [number, number, number] = [0, 86, 94];
const MOBILE_CAMERA_FOV = 56;

const MAIN_ROAD_X = 0;
// Four cross streets divide the boulevard into five ordered portfolio blocks.
const CROSS_ROADS_Z = [24, 8, -8, -24] as const;

type ControlName = "forward" | "back" | "left" | "right" | "sprint";
type BuildingStyle = "house" | "office" | "workshop" | "tower" | "cafe";
type VehicleModel = "sedan" | "hatchback" | "suv";
type Axis = "x" | "z";

type Collider = {
  x: number;
  z: number;
  halfX: number;
  halfZ: number;
};

type Architecture = {
  style: BuildingStyle;
  buildingName: string;
  signTitle: string;
  subtitle: string;
  width: number;
  depth: number;
  height: number;
  floors: number;
  rotationY: number;
  color: string;
  accent: string;
  trim: string;
  roof: string;
};

type SectionBuildingSpec = Architecture & {
  label: string;
  code: string;
  href: string;
  featured?: boolean;
  x: number;
  z: number;
};

type BackgroundBuildingSpec = {
  id: string;
  x: number;
  z: number;
  width: number;
  depth: number;
  height: number;
  floors: number;
  rotationY: number;
  color: string;
  trim: string;
  roof: string;
};

type CarRoute = {
  id: string;
  axis: Axis;
  lane: number;
  min: number;
  max: number;
  direction: 1 | -1;
  speed: number;
  offset: number;
  color: string;
  model: VehicleModel;
  scale?: number;
};

const KEY_MAP: { name: ControlName; keys: string[] }[] = [
  { name: "forward", keys: ["KeyW", "ArrowUp"] },
  { name: "back", keys: ["KeyS", "ArrowDown"] },
  { name: "left", keys: ["KeyA", "ArrowLeft"] },
  { name: "right", keys: ["KeyD", "ArrowRight"] },
  { name: "sprint", keys: ["ShiftLeft", "ShiftRight"] },
];

const SECTION_ARCHITECTURE: readonly Architecture[] = [
  {
    style: "house",
    buildingName: "About House",
    signTitle: "About",
    subtitle: "Story, values, and profile",
    width: 8.4,
    depth: 7.2,
    height: 5.4,
    floors: 2,
    rotationY: Math.PI / 2,
    color: "#b9684c",
    accent: "#f1c27d",
    trim: "#f0dfcb",
    roof: "#51362f",
  },
  {
    style: "office",
    buildingName: "Experience Offices",
    signTitle: "Experience",
    subtitle: "Roles, impact, and timeline",
    width: 9,
    depth: 7.8,
    height: 10.8,
    floors: 4,
    rotationY: -Math.PI / 2,
    color: "#526f8c",
    accent: "#f1bf5d",
    trim: "#d8e2e8",
    roof: "#344555",
  },
  {
    style: "tower",
    buildingName: "Project Tower",
    signTitle: "Projects I Worked On",
    subtitle: "Selected work and case studies",
    width: 9.4,
    depth: 8.6,
    height: 15,
    floors: 6,
    rotationY: Math.PI / 2,
    color: "#365b72",
    accent: PULSE,
    trim: "#b8d6e4",
    roof: "#203747",
  },
  {
    style: "workshop",
    buildingName: "Skills Workshop",
    signTitle: "Skills",
    subtitle: "Languages, tools, and systems",
    width: 9,
    depth: 7.4,
    height: 7.2,
    floors: 3,
    rotationY: -Math.PI / 2,
    color: "#55786c",
    accent: "#f2cf78",
    trim: "#dbe5d7",
    roof: "#364942",
  },
  {
    style: "cafe",
    buildingName: "Contact Cafe",
    signTitle: "Contact",
    subtitle: "Email, social links, and message form",
    width: 8.4,
    depth: 7.2,
    height: 6.2,
    floors: 2,
    rotationY: Math.PI / 2,
    color: "#c18c6d",
    accent: "#64836b",
    trim: "#f2e5d3",
    roof: "#5a4238",
  },
] as const;

const BACKGROUND_BUILDINGS: readonly BackgroundBuildingSpec[] = [
  {
    id: "north-east-apartments",
    x: 23,
    z: 35,
    width: 10.5,
    depth: 8.5,
    height: 12,
    floors: 5,
    rotationY: 0,
    color: "#7b6f84",
    trim: "#ded5e4",
    roof: "#47404e",
  },
  {
    id: "central-east-hotel",
    x: 23,
    z: 0,
    width: 10.5,
    depth: 8.5,
    height: 11,
    floors: 5,
    rotationY: 0,
    color: "#777c69",
    trim: "#e2e2cf",
    roof: "#44483d",
  },
  {
    id: "lower-west-offices",
    x: -23,
    z: -16,
    width: 10.5,
    depth: 8.5,
    height: 12.5,
    floors: 5,
    rotationY: 0,
    color: "#697986",
    trim: "#d3dde3",
    roof: "#3e4951",
  },
  {
    id: "south-east-residences",
    x: 23,
    z: -35,
    width: 10.5,
    depth: 9,
    height: 10.5,
    floors: 4,
    rotationY: 0,
    color: "#87685f",
    trim: "#ddcbc4",
    roof: "#4d3b36",
  },
] as const;

const CAR_ROUTES: readonly CarRoute[] = [
  {
    id: "boulevard-northbound-sedan",
    axis: "z",
    lane: -1.65,
    min: -50,
    max: 50,
    direction: 1,
    speed: 4.35,
    offset: 7,
    color: "#b83f42",
    model: "sedan",
  },
  {
    id: "boulevard-southbound-suv",
    axis: "z",
    lane: 1.65,
    min: -50,
    max: 50,
    direction: -1,
    speed: 4.65,
    offset: 39,
    color: "#c99b32",
    model: "suv",
    scale: 1.02,
  },
  {
    id: "cross-24-eastbound",
    axis: "x",
    lane: 22.85,
    min: -50,
    max: 50,
    direction: 1,
    speed: 4.15,
    offset: 18,
    color: "#4d74b8",
    model: "hatchback",
  },
  {
    id: "cross-8-westbound",
    axis: "x",
    lane: 9.15,
    min: -50,
    max: 50,
    direction: -1,
    speed: 4.25,
    offset: 66,
    color: "#6c5ca8",
    model: "sedan",
  },
  {
    id: "cross-minus-24-eastbound",
    axis: "x",
    lane: -25.15,
    min: -50,
    max: 50,
    direction: 1,
    speed: 4.3,
    offset: 48,
    color: "#4b8b68",
    model: "suv",
    scale: 0.98,
  },
];

const MAIN_LAMP_Z = [-45, -32, -18, -5, 8, 21, 34, 46] as const;
const TREE_Z = [-44, -30, -16, -2, 13, 27, 40] as const;

function evenlySpaced(count: number, span: number): number[] {
  if (count <= 0) return [];
  return Array.from({ length: count }, (_, index) =>
    -span / 2 + ((index + 1) * span) / (count + 1)
  );
}

function colliderFromFootprint({
  x,
  z,
  width,
  depth,
  rotationY,
}: {
  x: number;
  z: number;
  width: number;
  depth: number;
  rotationY: number;
}): Collider {
  const cos = Math.abs(Math.cos(rotationY));
  const sin = Math.abs(Math.sin(rotationY));

  return {
    x,
    z,
    halfX: (width * cos + depth * sin) / 2 + PLAYER_RADIUS,
    halfZ: (width * sin + depth * cos) / 2 + PLAYER_RADIUS,
  };
}

function resolveCollider(position: THREE.Vector3, collider: Collider) {
  const minX = collider.x - collider.halfX;
  const maxX = collider.x + collider.halfX;
  const minZ = collider.z - collider.halfZ;
  const maxZ = collider.z + collider.halfZ;

  if (
    position.x <= minX ||
    position.x >= maxX ||
    position.z <= minZ ||
    position.z >= maxZ
  ) {
    return;
  }

  const pushLeft = position.x - minX;
  const pushRight = maxX - position.x;
  const pushBack = position.z - minZ;
  const pushForward = maxZ - position.z;
  const smallest = Math.min(pushLeft, pushRight, pushBack, pushForward);

  if (smallest === pushLeft) position.x = minX;
  else if (smallest === pushRight) position.x = maxX;
  else if (smallest === pushBack) position.z = minZ;
  else position.z = maxZ;
}

function Player({
  colliders,
  disabled,
  locked,
}: {
  colliders: Collider[];
  disabled: boolean;
  locked: boolean;
}) {
  const [, getKeys] = useKeyboardControls<ControlName>();
  const camera = useThree((state) => state.camera);
  const get = useThree((state) => state.get);
  const setEvents = useThree((state) => state.setEvents);
  const lookEuler = useMemo(() => new THREE.Euler(0, 0, 0, "YXZ"), []);
  const forwardVector = useMemo(() => new THREE.Vector3(), []);
  const rightVector = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    if (!locked) return;

    const handleMouseMove = (event: MouseEvent) => {
      lookEuler.setFromQuaternion(camera.quaternion);
      lookEuler.y -= event.movementX * 0.002;
      lookEuler.x -= event.movementY * 0.002;
      lookEuler.x = THREE.MathUtils.clamp(
        lookEuler.x,
        -Math.PI / 2 + 0.03,
        Math.PI / 2 - 0.03
      );
      camera.quaternion.setFromEuler(lookEuler);
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [camera, locked, lookEuler]);

  useEffect(() => {
    if (!locked) return;

    const previousCompute = get().events.compute;
    setEvents({
      compute: (_event, state) => {
        state.pointer.set(0, 0);
        state.raycaster.setFromCamera(state.pointer, state.camera);
      },
    });

    return () => setEvents({ compute: previousCompute });
  }, [get, locked, setEvents]);

  useFrame((_, delta) => {
    if (disabled || !locked) return;

    const { forward, back, left, right, sprint } = getKeys();
    const forwardAxis = Number(forward) - Number(back);
    const sideAxis = Number(right) - Number(left);
    const magnitude = Math.hypot(forwardAxis, sideAxis) || 1;
    const speed = MOVE_SPEED * (sprint ? SPRINT_MULTIPLIER : 1);
    const distance = Math.min(delta, 0.05) * speed;

    camera.getWorldDirection(forwardVector);
    forwardVector.y = 0;
    forwardVector.normalize();

    rightVector.set(1, 0, 0).applyQuaternion(camera.quaternion);
    rightVector.y = 0;
    rightVector.normalize();

    if (forwardAxis !== 0) {
      camera.position.addScaledVector(
        forwardVector,
        (forwardAxis / magnitude) * distance
      );
    }
    if (sideAxis !== 0) {
      camera.position.addScaledVector(rightVector, (sideAxis / magnitude) * distance);
    }

    camera.position.x = THREE.MathUtils.clamp(
      camera.position.x,
      -WORLD_RADIUS,
      WORLD_RADIUS
    );
    camera.position.z = THREE.MathUtils.clamp(
      camera.position.z,
      -WORLD_RADIUS,
      WORLD_RADIUS
    );

    colliders.forEach((collider) => resolveCollider(camera.position, collider));
    camera.position.y = EYE_HEIGHT;
  });

  return null;
}

type CameraAnimation = {
  mode: "focus" | "return";
  elapsed: number;
  duration: number;
  startPosition: THREE.Vector3;
  endPosition: THREE.Vector3;
  startQuaternion: THREE.Quaternion;
  endQuaternion: THREE.Quaternion;
  startFov: number;
  endFov: number;
};

type CameraPose = {
  position: THREE.Vector3;
  quaternion: THREE.Quaternion;
  fov: number;
};

type CameraDirectorApi = {
  restoreWalkingPose: () => boolean;
};

function CameraDirector({
  focus,
  reducedMotion,
  apiRef,
  onFocusComplete,
  onReturnComplete,
}: {
  focus: SectionBuildingSpec | null;
  reducedMotion: boolean;
  apiRef: MutableRefObject<CameraDirectorApi | null>;
  onFocusComplete: () => void;
  onReturnComplete: () => void;
}) {
  const { camera } = useThree();
  const animationRef = useRef<CameraAnimation | null>(null);
  const returnPoseRef = useRef<CameraPose | null>(null);
  const lastWalkingPoseRef = useRef<CameraPose | null>(null);

  const restoreWalkingPose = useCallback(() => {
    const returnPose = returnPoseRef.current ?? lastWalkingPoseRef.current;
    if (!returnPose) return false;

    // Restore the exact first-person pose synchronously while the modal close
    // action is still a user gesture. A second saved walking pose protects
    // against a fast focus/close race and prevents the camera staying at a house.
    animationRef.current = null;
    camera.position.copy(returnPose.position);
    camera.quaternion.copy(returnPose.quaternion);

    const perspectiveCamera = camera as THREE.PerspectiveCamera;
    perspectiveCamera.fov = returnPose.fov;
    perspectiveCamera.updateProjectionMatrix();

    lastWalkingPoseRef.current = {
      position: returnPose.position.clone(),
      quaternion: returnPose.quaternion.clone(),
      fov: returnPose.fov,
    };
    returnPoseRef.current = null;
    onReturnComplete();
    return true;
  }, [camera, onReturnComplete]);

  useEffect(() => {
    const api: CameraDirectorApi = { restoreWalkingPose };
    apiRef.current = api;

    return () => {
      if (apiRef.current === api) apiRef.current = null;
    };
  }, [apiRef, restoreWalkingPose]);

  useEffect(() => {
    const perspectiveCamera = camera as THREE.PerspectiveCamera;

    if (focus) {
      if (!returnPoseRef.current) {
        const walkingPose = lastWalkingPoseRef.current;
        returnPoseRef.current = walkingPose
          ? {
              position: walkingPose.position.clone(),
              quaternion: walkingPose.quaternion.clone(),
              fov: walkingPose.fov,
            }
          : {
              position: camera.position.clone(),
              quaternion: camera.quaternion.clone(),
              fov: perspectiveCamera.fov,
            };
      }

      const front = new THREE.Vector3(
        Math.sin(focus.rotationY),
        0,
        Math.cos(focus.rotationY)
      ).normalize();
      const distance = focus.style === "tower" ? 11.5 : focus.style === "office" ? 9.8 : 8.8;
      const targetPosition = new THREE.Vector3(focus.x, 0, focus.z).addScaledVector(
        front,
        distance
      );
      targetPosition.y = THREE.MathUtils.clamp(focus.height * 0.34 + 1.7, 3.1, 6.1);

      const lookAt = new THREE.Vector3(
        focus.x,
        THREE.MathUtils.clamp(focus.height * 0.46, 2.8, 7.2),
        focus.z
      );
      const lookMatrix = new THREE.Matrix4().lookAt(targetPosition, lookAt, camera.up);
      const targetQuaternion = new THREE.Quaternion().setFromRotationMatrix(lookMatrix);

      animationRef.current = {
        mode: "focus",
        elapsed: 0,
        duration: reducedMotion ? 0.01 : 0.82,
        startPosition: camera.position.clone(),
        endPosition: targetPosition,
        startQuaternion: camera.quaternion.clone(),
        endQuaternion: targetQuaternion,
        startFov: perspectiveCamera.fov,
        endFov: focus.style === "tower" ? 47 : 50,
      };
      return;
    }

    if (returnPoseRef.current) {
      animationRef.current = {
        mode: "return",
        elapsed: 0,
        duration: reducedMotion ? 0.01 : 0.68,
        startPosition: camera.position.clone(),
        endPosition: returnPoseRef.current.position.clone(),
        startQuaternion: camera.quaternion.clone(),
        endQuaternion: returnPoseRef.current.quaternion.clone(),
        startFov: perspectiveCamera.fov,
        endFov: returnPoseRef.current.fov,
      };
    }
  }, [camera, focus, reducedMotion]);

  useFrame((_, delta) => {
    const animation = animationRef.current;

    if (!animation) {
      if (!focus) {
        const perspectiveCamera = camera as THREE.PerspectiveCamera;
        lastWalkingPoseRef.current = {
          position: camera.position.clone(),
          quaternion: camera.quaternion.clone(),
          fov: perspectiveCamera.fov,
        };
      }
      return;
    }

    animation.elapsed += Math.min(delta, 0.05);
    const progress = THREE.MathUtils.clamp(animation.elapsed / animation.duration, 0, 1);
    const eased = 1 - Math.pow(1 - progress, 4);

    camera.position.lerpVectors(animation.startPosition, animation.endPosition, eased);
    camera.quaternion.slerpQuaternions(
      animation.startQuaternion,
      animation.endQuaternion,
      eased
    );

    const perspectiveCamera = camera as THREE.PerspectiveCamera;
    perspectiveCamera.fov = THREE.MathUtils.lerp(
      animation.startFov,
      animation.endFov,
      eased
    );
    perspectiveCamera.updateProjectionMatrix();

    if (progress < 1) return;

    const mode = animation.mode;
    animationRef.current = null;

    if (mode === "focus") {
      onFocusComplete();
    } else {
      returnPoseRef.current = null;
      onReturnComplete();
    }
  });

  return null;
}

type SignLayout = {
  width: number;
  height: number;
  y: number;
  offset: number;
  x?: number;
  tilt?: number;
};

// Each section board is mounted around the visual middle of its facade.
// The house and cafe boards sit on the front edge of their porch/awning,
// while the taller buildings use shallow wall brackets. Because the board
// remains inside the building group, it automatically matches that facade's
// street-facing rotation and the whole board remains clickable.
const SIGN_LAYOUTS: Record<BuildingStyle, SignLayout> = {
  house: { width: 4.8, height: 1.12, y: 3.28, offset: 1.92, tilt: 0.015 },
  office: { width: 5.45, height: 1.22, y: 5.35, offset: 0.22 },
  tower: { width: 6.25, height: 1.32, y: 7.75, offset: 0.24 },
  workshop: { width: 5.45, height: 1.22, y: 4.25, offset: 0.22 },
  cafe: { width: 4.95, height: 1.14, y: 3.52, offset: 1.18, tilt: 0.012 },
};

function traceRoundedRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  const r = Math.min(radius, width / 2, height / 2);
  context.beginPath();
  context.moveTo(x + r, y);
  context.lineTo(x + width - r, y);
  context.quadraticCurveTo(x + width, y, x + width, y + r);
  context.lineTo(x + width, y + height - r);
  context.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  context.lineTo(x + r, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - r);
  context.lineTo(x, y + r);
  context.quadraticCurveTo(x, y, x + r, y);
  context.closePath();
}

function fitCanvasFont(
  context: CanvasRenderingContext2D,
  text: string,
  maximumWidth: number,
  startSize: number,
  minimumSize: number,
  fontFamily: string
) {
  let size = startSize;
  context.font = `700 ${size}px ${fontFamily}`;

  while (size > minimumSize && context.measureText(text).width > maximumWidth) {
    size -= 2;
    context.font = `700 ${size}px ${fontFamily}`;
  }

  return size;
}

function useBuildingSignTexture(spec: SectionBuildingSpec) {
  const texture = useMemo(() => {
    if (typeof document === "undefined") return null;

    const canvas = document.createElement("canvas");
    canvas.width = 1280;
    canvas.height = 340;
    const context = canvas.getContext("2d");
    if (!context) return null;

    context.clearRect(0, 0, canvas.width, canvas.height);

    const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#ffffff");
    gradient.addColorStop(1, "#f5f2e9");
    context.fillStyle = gradient;
    traceRoundedRect(context, 10, 10, canvas.width - 20, canvas.height - 20, 28);
    context.fill();

    context.strokeStyle = "#d8d2c6";
    context.lineWidth = 8;
    traceRoundedRect(context, 10, 10, canvas.width - 20, canvas.height - 20, 28);
    context.stroke();

    context.fillStyle = spec.accent;
    context.fillRect(28, 28, 26, canvas.height - 56);

    context.textBaseline = "middle";
    context.textAlign = "left";
    context.fillStyle = "#746f67";
    context.font = "700 34px Arial, sans-serif";
    context.fillText(`SECTION ${spec.code}`, 92, 70);

    context.textAlign = "center";
    const titleFont = "Arial, Helvetica, sans-serif";
    const titleSize = fitCanvasFont(context, spec.signTitle, 1010, 82, 38, titleFont);
    context.font = `800 ${titleSize}px ${titleFont}`;
    context.fillStyle = "#111827";
    context.fillText(spec.signTitle, 685, 158);

    context.fillStyle = spec.featured ? "#6254d9" : "#4b5563";
    context.font = "700 27px Arial, sans-serif";
    context.fillText(spec.buildingName.toUpperCase(), 685, 225);

    context.fillStyle = "#667085";
    context.font = "500 24px Arial, sans-serif";
    context.fillText(spec.subtitle, 685, 286);

    const nextTexture = new THREE.CanvasTexture(canvas);
    nextTexture.colorSpace = THREE.SRGBColorSpace;
    nextTexture.minFilter = THREE.LinearMipmapLinearFilter;
    nextTexture.magFilter = THREE.LinearFilter;
    nextTexture.generateMipmaps = true;
    nextTexture.anisotropy = 8;
    nextTexture.needsUpdate = true;
    return nextTexture;
  }, [
    spec.accent,
    spec.buildingName,
    spec.code,
    spec.featured,
    spec.signTitle,
    spec.subtitle,
  ]);

  useEffect(() => () => texture?.dispose(), [texture]);
  return texture;
}

function BuildingNameBoard({
  spec,
  hovered,
}: {
  spec: SectionBuildingSpec;
  hovered: boolean;
}) {
  const layout = SIGN_LAYOUTS[spec.style];
  const texture = useBuildingSignTexture(spec);
  const bracketDepth = Math.max(0.24, layout.offset + 0.08);

  return (
    <group
      position={[layout.x ?? 0, layout.y, spec.depth / 2 + layout.offset]}
      rotation={[layout.tilt ?? 0, 0, 0]}
      scale={hovered ? 1.025 : 1}
    >
      {[-layout.width * 0.33, layout.width * 0.33].map((x) => (
        <group key={`facade-bracket-${x}`} position={[x, 0, -bracketDepth / 2]}>
          <mesh castShadow>
            <boxGeometry args={[0.14, 0.14, bracketDepth]} />
            <meshStandardMaterial color="#a9a297" metalness={0.22} roughness={0.62} />
          </mesh>
          <mesh castShadow position={[0, 0, -bracketDepth / 2 + 0.03]}>
            <boxGeometry args={[0.42, 0.42, 0.08]} />
            <meshStandardMaterial color="#c7c0b4" metalness={0.16} roughness={0.68} />
          </mesh>
        </group>
      ))}

      <RoundedBox
        args={[layout.width + 0.34, layout.height + 0.34, 0.22]}
        radius={0.1}
        smoothness={4}
        castShadow
      >
        <meshStandardMaterial
          color="#e8e3d8"
          emissive="#6254d9"
          emissiveIntensity={hovered ? 0.12 : 0.018}
          metalness={0.16}
          roughness={0.62}
        />
      </RoundedBox>

      {texture && (
        <mesh position={[0, 0, 0.116]} renderOrder={3}>
          <planeGeometry args={[layout.width, layout.height]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
      )}

      <mesh castShadow position={[0, layout.height / 2 + 0.15, 0.01]}>
        <boxGeometry args={[layout.width + 0.5, 0.11, 0.32]} />
        <meshStandardMaterial color="#c7c0b4" metalness={0.16} roughness={0.65} />
      </mesh>
      <mesh castShadow position={[0, -layout.height / 2 - 0.15, 0.01]}>
        <boxGeometry args={[layout.width + 0.5, 0.11, 0.32]} />
        <meshStandardMaterial color="#c7c0b4" metalness={0.16} roughness={0.65} />
      </mesh>

      {[-layout.width * 0.28, layout.width * 0.28].map((x) => (
        <group key={`board-light-${x}`} position={[x, layout.height / 2 + 0.29, 0.2]}>
          <mesh castShadow rotation={[0.92, 0, 0]}>
            <boxGeometry args={[0.2, 0.1, 0.24]} />
            <meshStandardMaterial color="#aaa397" metalness={0.28} roughness={0.55} />
          </mesh>
          <mesh position={[0, -0.11, 0.08]} rotation={[0.92, 0, 0]}>
            <circleGeometry args={[0.07, 18]} />
            <meshStandardMaterial
              color="#fff0c2"
              emissive="#ffd78b"
              emissiveIntensity={hovered ? 1.8 : 1.05}
              roughness={0.2}
            />
          </mesh>
        </group>
      ))}

      {hovered && (
        <pointLight
          position={[0, 0.12, 0.5]}
          color="#ffd79d"
          intensity={0.55}
          distance={5.2}
          decay={2}
        />
      )}
    </group>
  );
}

function BuildingFooting({ spec }: { spec: SectionBuildingSpec }) {
  return (
    <RoundedBox
      args={[spec.width + 0.22, 0.5, spec.depth + 0.22]}
      radius={0.1}
      smoothness={3}
      position={[0, 0.25, 0]}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial color={spec.roof} roughness={0.82} metalness={0.05} />
    </RoundedBox>
  );
}

function WindowPane({
  position,
  rotation = [0, 0, 0],
  width = 1,
  height = 1.15,
  trim,
  lit = false,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  width?: number;
  height?: number;
  trim: string;
  lit?: boolean;
}) {
  const glass = lit ? "#f4ca82" : "#7da5b8";

  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow>
        <boxGeometry args={[width + 0.18, height + 0.18, 0.1]} />
        <meshStandardMaterial color={trim} roughness={0.72} />
      </mesh>
      <mesh position={[0, 0, 0.075]}>
        <boxGeometry args={[width, height, 0.055]} />
        <meshStandardMaterial
          color={glass}
          emissive={lit ? "#f4b65a" : "#173344"}
          emissiveIntensity={lit ? 0.65 : 0.06}
          metalness={0.2}
          roughness={0.24}
        />
      </mesh>
      <mesh castShadow position={[0, -height / 2 - 0.1, 0.13]}>
        <boxGeometry args={[width + 0.32, 0.1, 0.28]} />
        <meshStandardMaterial color={trim} roughness={0.8} />
      </mesh>
    </group>
  );
}

function WindowBand({
  position,
  rotation = [0, 0, 0],
  width,
  height,
  trim,
  lit = false,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  width: number;
  height: number;
  trim: string;
  lit?: boolean;
}) {
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow>
        <boxGeometry args={[width + 0.18, height + 0.16, 0.095]} />
        <meshStandardMaterial color={trim} roughness={0.76} />
      </mesh>
      <mesh position={[0, 0, 0.073]}>
        <boxGeometry args={[width, height, 0.05]} />
        <meshStandardMaterial
          color={lit ? "#d9b06f" : "#668a9b"}
          emissive={lit ? "#e4a84f" : "#18313d"}
          emissiveIntensity={lit ? 0.42 : 0.04}
          metalness={0.18}
          roughness={0.3}
        />
      </mesh>
      <mesh castShadow position={[0, -height / 2 - 0.08, 0.12]}>
        <boxGeometry args={[width + 0.3, 0.085, 0.24]} />
        <meshStandardMaterial color={trim} roughness={0.82} />
      </mesh>
    </group>
  );
}

function FacadeWindowGrid({
  width,
  depth,
  height,
  floors,
  frontColumns,
  sideColumns,
  trim,
  skipFrontBottomCenter = true,
}: {
  width: number;
  depth: number;
  height: number;
  floors: number;
  frontColumns: number;
  sideColumns: number;
  trim: string;
  skipFrontBottomCenter?: boolean;
}) {
  const floorHeight = height / floors;
  const paneHeight = Math.min(1.25, floorHeight * 0.5);
  const frontX = evenlySpaced(frontColumns, width * 0.82);
  const sideZ = evenlySpaced(sideColumns, depth * 0.76);
  const rows = Array.from({ length: floors }, (_, row) =>
    Math.min(height - 0.72, floorHeight * (row + 0.55))
  );

  return (
    <>
      {rows.flatMap((y, row) =>
        frontX.map((x, column) => {
          const isDoorZone =
            skipFrontBottomCenter && row === 0 && Math.abs(x) < Math.max(1.1, width * 0.14);
          if (isDoorZone) return null;

          return (
            <WindowPane
              key={`front-${row}-${column}`}
              position={[x, y, depth / 2 + 0.065]}
              width={Math.min(1.2, width / (frontColumns + 1.8))}
              height={paneHeight}
              trim={trim}
              lit={(row + column) % 3 === 0}
            />
          );
        })
      )}

      {rows.flatMap((y, row) =>
        sideZ.flatMap((z, column) => [
          <WindowPane
            key={`left-${row}-${column}`}
            position={[-width / 2 - 0.065, y, z]}
            rotation={[0, -Math.PI / 2, 0]}
            width={Math.min(1.1, depth / (sideColumns + 1.8))}
            height={paneHeight}
            trim={trim}
            lit={(row + column + 1) % 4 === 0}
          />,
          <WindowPane
            key={`right-${row}-${column}`}
            position={[width / 2 + 0.065, y, z]}
            rotation={[0, Math.PI / 2, 0]}
            width={Math.min(1.1, depth / (sideColumns + 1.8))}
            height={paneHeight}
            trim={trim}
            lit={(row + column + 2) % 4 === 0}
          />,
        ])
      )}
    </>
  );
}

function Entrance({
  depth,
  accent,
  trim,
  x = 0,
  canopy = true,
}: {
  depth: number;
  accent: string;
  trim: string;
  x?: number;
  canopy?: boolean;
}) {
  return (
    <group position={[x, 0, depth / 2 + 0.075]}>
      <mesh castShadow position={[0, 1.18, 0]}>
        <boxGeometry args={[1.62, 2.38, 0.14]} />
        <meshStandardMaterial color={trim} roughness={0.72} />
      </mesh>
      <mesh position={[0, 1.18, 0.085]}>
        <boxGeometry args={[1.38, 2.14, 0.08]} />
        <meshStandardMaterial color="#26323a" roughness={0.42} />
      </mesh>
      <mesh position={[0, 1.18, 0.135]}>
        <boxGeometry args={[0.055, 2.02, 0.035]} />
        <meshStandardMaterial color={accent} metalness={0.35} roughness={0.45} />
      </mesh>
      <mesh position={[0.48, 1.15, 0.18]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial color="#d8b66f" metalness={0.7} roughness={0.3} />
      </mesh>

      {canopy && (
        <mesh castShadow position={[0, 2.58, 0.52]} rotation={[-0.08, 0, 0]}>
          <boxGeometry args={[2.45, 0.18, 1.15]} />
          <meshStandardMaterial color={accent} roughness={0.65} />
        </mesh>
      )}

      <mesh receiveShadow position={[0, 0.08, 0.45]}>
        <boxGeometry args={[2, 0.16, 0.9]} />
        <meshStandardMaterial color="#9a958b" roughness={0.95} />
      </mesh>
      <mesh receiveShadow position={[0, 0.035, 0.95]}>
        <boxGeometry args={[2.25, 0.07, 0.55]} />
        <meshStandardMaterial color="#aaa59a" roughness={0.95} />
      </mesh>
    </group>
  );
}

function GableRoof({
  width,
  depth,
  height,
  color,
  positionY,
}: {
  width: number;
  depth: number;
  height: number;
  color: string;
  positionY: number;
}) {
  const geometry = useMemo(() => {
    const roof = new THREE.BufferGeometry();
    const vertices = new Float32Array([
      -width / 2,
      0,
      -depth / 2,
      width / 2,
      0,
      -depth / 2,
      width / 2,
      0,
      depth / 2,
      -width / 2,
      0,
      depth / 2,
      0,
      height,
      -depth / 2,
      0,
      height,
      depth / 2,
    ]);

    roof.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
    roof.setIndex([
      0, 3, 5,
      0, 5, 4,
      1, 4, 5,
      1, 5, 2,
      3, 2, 5,
      0, 4, 1,
    ]);
    roof.computeVertexNormals();
    return roof;
  }, [depth, height, width]);

  return (
    <mesh geometry={geometry} position={[0, positionY, 0]} castShadow receiveShadow>
      <meshStandardMaterial color={color} roughness={0.88} side={THREE.DoubleSide} />
    </mesh>
  );
}

function BuildingEdgeDetails({ spec }: { spec: SectionBuildingSpec }) {
  const isTower = spec.style === "tower";
  const bodyBase = isTower ? 1.05 : 0;
  const bodyHeight = spec.height;
  const bodyCenterY = bodyBase + bodyHeight / 2;
  const edgeThickness = isTower || spec.style === "office" ? 0.14 : 0.2;
  const edgeColor = isTower || spec.style === "office" ? spec.trim : spec.roof;
  const gabled = spec.style === "house" || spec.style === "workshop" || spec.style === "cafe";

  return (
    <group>

      {([-1, 1] as const).flatMap((xSide) =>
        ([-1, 1] as const).map((zSide) => (
          <mesh
            key={`${xSide}-${zSide}`}
            castShadow
            position={[
              xSide * (spec.width / 2 + edgeThickness * 0.12),
              bodyCenterY,
              zSide * (spec.depth / 2 + edgeThickness * 0.12),
            ]}
          >
            <boxGeometry args={[edgeThickness, bodyHeight * 0.96, edgeThickness]} />
            <meshStandardMaterial
              color={edgeColor}
              roughness={isTower ? 0.48 : 0.76}
              metalness={isTower ? 0.24 : 0.08}
            />
          </mesh>
        ))
      )}

      <mesh castShadow position={[0, bodyBase + 0.42, spec.depth / 2 + 0.08]}>
        <boxGeometry args={[spec.width * 0.96, 0.13, 0.18]} />
        <meshStandardMaterial color={edgeColor} roughness={0.75} metalness={0.08} />
      </mesh>

      {gabled && (
        <>
          {([-1, 1] as const).map((side) => (
            <mesh
              key={side}
              castShadow
              position={[0, spec.height + 0.04, side * (spec.depth / 2 + 0.28)]}
            >
              <boxGeometry args={[spec.width + 0.45, 0.16, 0.16]} />
              <meshStandardMaterial color="#4a4d4d" roughness={0.72} metalness={0.18} />
            </mesh>
          ))}
          <mesh
            castShadow
            position={[-spec.width / 2 - 0.12, spec.height / 2, spec.depth / 2 + 0.23]}
          >
            <cylinderGeometry args={[0.065, 0.075, spec.height * 0.92, 10]} />
            <meshStandardMaterial color="#4a4d4d" roughness={0.68} metalness={0.2} />
          </mesh>
        </>
      )}
    </group>
  );
}

function HouseBuilding({ spec, hovered }: { spec: SectionBuildingSpec; hovered: boolean }) {
  return (
    <group>
      <RoundedBox
        args={[spec.width, spec.height, spec.depth]}
        radius={0.14}
        smoothness={3}
        position={[0, spec.height / 2, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={spec.color}
          roughness={0.88}
          emissive={spec.accent}
          emissiveIntensity={hovered ? 0.1 : 0}
        />
      </RoundedBox>
      <mesh castShadow position={[0, spec.height - 0.18, 0]}>
        <boxGeometry args={[spec.width + 0.18, 0.3, spec.depth + 0.18]} />
        <meshStandardMaterial color={spec.trim} roughness={0.82} />
      </mesh>
      <GableRoof
        width={spec.width + 0.55}
        depth={spec.depth + 0.6}
        height={2.25}
        color={spec.roof}
        positionY={spec.height}
      />
      <FacadeWindowGrid
        width={spec.width}
        depth={spec.depth}
        height={spec.height}
        floors={2}
        frontColumns={3}
        sideColumns={2}
        trim={spec.trim}
      />
      <Entrance depth={spec.depth} accent={spec.accent} trim={spec.trim} canopy={false} />

      <group position={[0, 0, spec.depth / 2 + 1.08]}>
        {[-1.55, 1.55].map((x) => (
          <mesh key={x} castShadow position={[x, 1.32, 0]}>
            <cylinderGeometry args={[0.1, 0.12, 2.65, 12]} />
            <meshStandardMaterial color={spec.trim} roughness={0.74} />
          </mesh>
        ))}
        <mesh castShadow position={[0, 2.68, 0]} rotation={[-0.07, 0, 0]}>
          <boxGeometry args={[4.1, 0.18, 1.65]} />
          <meshStandardMaterial color={spec.roof} roughness={0.82} />
        </mesh>
      </group>

      <mesh castShadow position={[spec.width * 0.28, spec.height + 1.05, -spec.depth * 0.16]}>
        <boxGeometry args={[0.72, 2.1, 0.72]} />
        <meshStandardMaterial color="#654438" roughness={0.92} />
      </mesh>
    </group>
  );
}

function OfficeBuilding({ spec, hovered }: { spec: SectionBuildingSpec; hovered: boolean }) {
  return (
    <group>
      <RoundedBox
        args={[spec.width, spec.height, spec.depth]}
        radius={0.2}
        smoothness={3}
        position={[0, spec.height / 2, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={spec.color}
          roughness={0.66}
          metalness={0.08}
          emissive={spec.accent}
          emissiveIntensity={hovered ? 0.08 : 0}
        />
      </RoundedBox>
      <FacadeWindowGrid
        width={spec.width}
        depth={spec.depth}
        height={spec.height}
        floors={spec.floors}
        frontColumns={4}
        sideColumns={3}
        trim={spec.trim}
      />
      <Entrance depth={spec.depth} accent={spec.accent} trim={spec.trim} />

      <mesh castShadow position={[-spec.width / 2 + 0.48, spec.height / 2, spec.depth / 2 + 0.1]}>
        <boxGeometry args={[0.62, spec.height * 0.92, 0.2]} />
        <meshStandardMaterial color={spec.accent} roughness={0.62} />
      </mesh>
      <mesh castShadow position={[0, spec.height - 0.16, 0]}>
        <boxGeometry args={[spec.width + 0.18, 0.24, spec.depth + 0.18]} />
        <meshStandardMaterial color={spec.trim} roughness={0.68} metalness={0.12} />
      </mesh>
      <RoundedBox
        args={[spec.width + 0.32, 0.56, spec.depth + 0.32]}
        radius={0.09}
        smoothness={2}
        position={[0, spec.height + 0.28, 0]}
        castShadow
      >
        <meshStandardMaterial color={spec.roof} roughness={0.78} />
      </RoundedBox>
      <mesh castShadow position={[-1.5, spec.height + 0.72, 0.2]}>
        <boxGeometry args={[1.8, 0.8, 1.35]} />
        <meshStandardMaterial color="#5d6770" roughness={0.85} />
      </mesh>
      <mesh castShadow position={[1.4, spec.height + 0.6, -0.8]}>
        <boxGeometry args={[1.3, 0.58, 1.1]} />
        <meshStandardMaterial color="#67727b" roughness={0.85} />
      </mesh>
    </group>
  );
}

function WorkshopBuilding({ spec, hovered }: { spec: SectionBuildingSpec; hovered: boolean }) {
  const shutterLines = Array.from({ length: 7 }, (_, index) => index);

  return (
    <group>
      <RoundedBox
        args={[spec.width, spec.height, spec.depth]}
        radius={0.13}
        smoothness={3}
        position={[0, spec.height / 2, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={spec.color}
          roughness={0.92}
          emissive={spec.accent}
          emissiveIntensity={hovered ? 0.09 : 0}
        />
      </RoundedBox>
      <mesh castShadow position={[0, spec.height - 0.2, 0]}>
        <boxGeometry args={[spec.width + 0.18, 0.28, spec.depth + 0.18]} />
        <meshStandardMaterial color={spec.trim} roughness={0.82} />
      </mesh>
      <GableRoof
        width={spec.width + 0.45}
        depth={spec.depth + 0.5}
        height={1.75}
        color={spec.roof}
        positionY={spec.height}
      />
      <FacadeWindowGrid
        width={spec.width}
        depth={spec.depth}
        height={spec.height}
        floors={spec.floors}
        frontColumns={4}
        sideColumns={2}
        trim={spec.trim}
      />
      <Entrance depth={spec.depth} accent={spec.accent} trim={spec.trim} x={-2.45} />

      <group position={[2.25, 0, spec.depth / 2 + 0.085]}>
        <mesh castShadow position={[0, 1.45, 0]}>
          <boxGeometry args={[3.15, 2.9, 0.15]} />
          <meshStandardMaterial color={spec.trim} roughness={0.8} />
        </mesh>
        <mesh position={[0, 1.45, 0.09]}>
          <boxGeometry args={[2.9, 2.65, 0.07]} />
          <meshStandardMaterial color="#657078" roughness={0.65} metalness={0.18} />
        </mesh>
        {shutterLines.map((line) => (
          <mesh key={line} position={[0, 0.38 + line * 0.35, 0.14]}>
            <boxGeometry args={[2.82, 0.045, 0.025]} />
            <meshStandardMaterial color="#3d474d" roughness={0.62} />
          </mesh>
        ))}
      </group>

      <mesh castShadow position={[spec.width * 0.3, spec.height + 1.05, -spec.depth * 0.22]}>
        <cylinderGeometry args={[0.42, 0.52, 2.1, 14]} />
        <meshStandardMaterial color="#59636a" roughness={0.76} metalness={0.25} />
      </mesh>
    </group>
  );
}

function TowerBuilding({ spec, hovered }: { spec: SectionBuildingSpec; hovered: boolean }) {
  const floorBands = Array.from({ length: spec.floors - 1 }, (_, index) =>
    ((index + 1) * spec.height) / spec.floors
  );

  return (
    <group>
      <RoundedBox
        args={[spec.width + 1.25, 1.24, spec.depth + 1.1]}
        radius={0.18}
        smoothness={3}
        position={[0, 0.62, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={spec.roof} roughness={0.62} metalness={0.18} />
      </RoundedBox>
      <RoundedBox
        args={[spec.width, spec.height, spec.depth]}
        radius={0.18}
        smoothness={3}
        position={[0, spec.height / 2 + 1.05, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={spec.color}
          roughness={0.3}
          metalness={0.32}
          emissive={spec.accent}
          emissiveIntensity={hovered ? 0.13 : 0.025}
        />
      </RoundedBox>
      <group position={[0, 1.05, 0]}>
        <FacadeWindowGrid
          width={spec.width}
          depth={spec.depth}
          height={spec.height}
          floors={spec.floors}
          frontColumns={5}
          sideColumns={4}
          trim={spec.trim}
        />
        {floorBands.map((y) => (
          <mesh key={y} position={[0, y, 0]} castShadow>
            <boxGeometry args={[spec.width + 0.16, 0.12, spec.depth + 0.16]} />
            <meshStandardMaterial color={spec.trim} roughness={0.6} metalness={0.18} />
          </mesh>
        ))}
      </group>
      <Entrance depth={spec.depth + 1.1} accent={spec.accent} trim={spec.trim} />

      <mesh castShadow position={[0, spec.height + 1.48, 0]}>
        <boxGeometry args={[spec.width + 0.35, 0.82, spec.depth + 0.35]} />
        <meshStandardMaterial
          color={spec.accent}
          emissive={spec.accent}
          emissiveIntensity={hovered ? 0.65 : 0.3}
          roughness={0.45}
        />
      </mesh>
      <mesh castShadow position={[0, spec.height + 3.3, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 3.1, 10]} />
        <meshStandardMaterial color="#b8c1c7" metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[0, spec.height + 4.85, 0]}>
        <sphereGeometry args={[0.14, 12, 12]} />
        <meshStandardMaterial
          color={PULSE}
          emissive={PULSE}
          emissiveIntensity={1.5}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
}

function CafeBuilding({ spec, hovered }: { spec: SectionBuildingSpec; hovered: boolean }) {
  const awningStripes = Array.from({ length: 8 }, (_, index) => index);
  const stripeWidth = (spec.width * 0.82) / awningStripes.length;

  return (
    <group>
      <RoundedBox
        args={[spec.width, spec.height, spec.depth]}
        radius={0.15}
        smoothness={3}
        position={[0, spec.height / 2, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={spec.color}
          roughness={0.88}
          emissive={spec.accent}
          emissiveIntensity={hovered ? 0.09 : 0}
        />
      </RoundedBox>
      <mesh castShadow position={[0, spec.height - 0.18, 0]}>
        <boxGeometry args={[spec.width + 0.18, 0.28, spec.depth + 0.18]} />
        <meshStandardMaterial color={spec.trim} roughness={0.82} />
      </mesh>
      <GableRoof
        width={spec.width + 0.5}
        depth={spec.depth + 0.55}
        height={1.85}
        color={spec.roof}
        positionY={spec.height}
      />

      <Entrance depth={spec.depth} accent={spec.accent} trim={spec.trim} />
      {[-2.35, 2.35].map((x, index) => (
        <WindowPane
          key={x}
          position={[x, 1.35, spec.depth / 2 + 0.07]}
          width={2.1}
          height={1.85}
          trim={spec.trim}
          lit={index === 0}
        />
      ))}
      {[-2.25, 0, 2.25].map((x, index) => (
        <WindowPane
          key={`upper-${x}`}
          position={[x, 4.55, spec.depth / 2 + 0.07]}
          width={1.25}
          height={1.15}
          trim={spec.trim}
          lit={index === 1}
        />
      ))}

      <group position={[0, 2.72, spec.depth / 2 + 0.56]} rotation={[-0.12, 0, 0]}>
        {awningStripes.map((stripe) => (
          <mesh
            key={stripe}
            castShadow
            position={[-(spec.width * 0.82) / 2 + stripeWidth / 2 + stripe * stripeWidth, 0, 0]}
          >
            <boxGeometry args={[stripeWidth, 0.14, 1.05]} />
            <meshStandardMaterial
              color={stripe % 2 === 0 ? spec.accent : spec.trim}
              roughness={0.78}
            />
          </mesh>
        ))}
      </group>

    </group>
  );
}

function SectionBuilding({
  spec,
  onEnter,
  onHoverChange,
  interactionEnabled,
}: {
  spec: SectionBuildingSpec;
  onEnter: (spec: SectionBuildingSpec) => void;
  onHoverChange: (label: string | null) => void;
  interactionEnabled: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!interactionEnabled) {
      setHovered(false);
      onHoverChange(null);
    }
  }, [interactionEnabled, onHoverChange]);

  const model = (() => {
    switch (spec.style) {
      case "house":
        return <HouseBuilding spec={spec} hovered={hovered} />;
      case "office":
        return <OfficeBuilding spec={spec} hovered={hovered} />;
      case "workshop":
        return <WorkshopBuilding spec={spec} hovered={hovered} />;
      case "tower":
        return <TowerBuilding spec={spec} hovered={hovered} />;
      case "cafe":
        return <CafeBuilding spec={spec} hovered={hovered} />;
    }
  })();

  return (
    <group position={[spec.x, 0, spec.z]} rotation={[0, spec.rotationY, 0]}>
      {/* Pavement remains decorative so clicking the road/curb cannot open a modal. */}
      <RoundedBox
        args={[spec.width + 2.1, 0.18, spec.depth + 3.2]}
        radius={0.12}
        smoothness={2}
        position={[0, 0.09, 0.8]}
        receiveShadow
      >
        <meshStandardMaterial color="#9e9a91" roughness={0.98} />
      </RoundedBox>

      <RoundedBox
        args={[2.25, 0.12, 2.6]}
        radius={0.08}
        smoothness={2}
        position={[0, 0.14, spec.depth / 2 + 1.45]}
        receiveShadow
      >
        <meshStandardMaterial color="#c2bdb1" roughness={0.96} />
      </RoundedBox>

      <group
        onClick={(event) => {
          event.stopPropagation();
          if (!interactionEnabled || event.delta > 5) return;
          onEnter(spec);
        }}
        onPointerOver={(event) => {
          event.stopPropagation();
          if (!interactionEnabled) return;
          setHovered(true);
          onHoverChange(spec.label);
        }}
        onPointerOut={(event) => {
          event.stopPropagation();
          setHovered(false);
          if (interactionEnabled) onHoverChange(null);
        }}
      >
        <BuildingFooting spec={spec} />
        {model}
        <BuildingEdgeDetails spec={spec} />
        <BuildingNameBoard spec={spec} hovered={hovered} />

        {hovered && (
          <pointLight
            position={[0, Math.min(spec.height, 5), spec.depth / 2 + 1.2]}
            color={spec.accent}
            intensity={1.4}
            distance={8}
            decay={2}
          />
        )}
      </group>
    </group>
  );
}

function BackgroundBuilding({ spec }: { spec: BackgroundBuildingSpec }) {
  const bandLevels = Array.from({ length: Math.max(1, spec.floors - 1) }, (_, index) =>
    ((index + 1) * spec.height) / spec.floors
  );

  return (
    <group position={[spec.x, 0, spec.z]} rotation={[0, spec.rotationY, 0]}>
      <RoundedBox
        args={[spec.width + 0.4, 0.42, spec.depth + 0.4]}
        radius={0.08}
        smoothness={2}
        position={[0, 0.21, 0]}
        castShadow
      >
        <meshStandardMaterial color={spec.roof} roughness={0.84} />
      </RoundedBox>

      <RoundedBox
        args={[spec.width, spec.height, spec.depth]}
        radius={0.16}
        smoothness={3}
        position={[0, spec.height / 2 + 0.2, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={spec.color} roughness={0.84} />
      </RoundedBox>

      <mesh castShadow position={[0, spec.height + 0.34, 0]}>
        <boxGeometry args={[spec.width + 0.26, 0.28, spec.depth + 0.26]} />
        <meshStandardMaterial color={spec.trim} roughness={0.78} />
      </mesh>
      <RoundedBox
        args={[spec.width + 0.36, 0.64, spec.depth + 0.36]}
        radius={0.08}
        smoothness={2}
        position={[0, spec.height + 0.62, 0]}
        castShadow
      >
        <meshStandardMaterial color={spec.roof} roughness={0.82} />
      </RoundedBox>

      {([-1, 1] as const).flatMap((sideX) =>
        ([-1, 1] as const).map((sideZ) => (
          <mesh
            key={`${sideX}-${sideZ}`}
            castShadow
            position={[
              sideX * (spec.width / 2 + 0.03),
              spec.height / 2 + 0.2,
              sideZ * (spec.depth / 2 + 0.03),
            ]}
          >
            <boxGeometry args={[0.16, spec.height * 0.96, 0.16]} />
            <meshStandardMaterial color={spec.trim} roughness={0.78} />
          </mesh>
        ))
      )}

      {bandLevels.map((y) => (
        <mesh key={`band-${y}`} position={[0, y + 0.2, spec.depth / 2 + 0.072]} castShadow>
          <boxGeometry args={[spec.width * 0.96, 0.08, 0.09]} />
          <meshStandardMaterial color={spec.trim} roughness={0.82} />
        </mesh>
      ))}

      {Array.from({ length: spec.floors }, (_, floor) => {
        const floorHeight = spec.height / spec.floors;
        const y = Math.min(spec.height - 0.7, floorHeight * (floor + 0.55)) + 0.2;
        const bandHeight = Math.min(1.05, floorHeight * 0.43);
        return (
          <group key={floor}>
            <WindowBand
              position={[0, y, spec.depth / 2 + 0.065]}
              width={spec.width * 0.72}
              height={bandHeight}
              trim={spec.trim}
              lit={floor % 3 === 0}
            />
            <WindowBand
              position={[-spec.width / 2 - 0.065, y, 0]}
              rotation={[0, -Math.PI / 2, 0]}
              width={spec.depth * 0.65}
              height={bandHeight}
              trim={spec.trim}
              lit={floor % 4 === 1}
            />
            <WindowBand
              position={[spec.width / 2 + 0.065, y, 0]}
              rotation={[0, Math.PI / 2, 0]}
              width={spec.depth * 0.65}
              height={bandHeight}
              trim={spec.trim}
              lit={floor % 4 === 2}
            />
          </group>
        );
      })}

      <group position={[0, 0.2, spec.depth / 2 + 0.09]}>
        <Entrance depth={spec.depth} accent={spec.trim} trim={spec.trim} canopy={false} />
      </group>

      <mesh castShadow position={[spec.width * 0.2, spec.height + 1.08, -spec.depth * 0.1]}>
        <boxGeometry args={[1.25, 1, 1.15]} />
        <meshStandardMaterial color="#626a6d" roughness={0.86} />
      </mesh>
      <mesh castShadow position={[-spec.width * 0.18, spec.height + 1.14, spec.depth * 0.18]}>
        <cylinderGeometry args={[0.38, 0.44, 1.2, 16]} />
        <meshStandardMaterial color="#5f6669" roughness={0.84} />
      </mesh>

      <mesh receiveShadow position={[0, 0.07, spec.depth / 2 + 1.45]}>
        <boxGeometry args={[spec.width + 1.7, 0.14, 2.9]} />
        <meshStandardMaterial color="#9d998f" roughness={0.96} />
      </mesh>
    </group>
  );
}

function RoadSurface({
  axis,
  center,
  length,
  width = ROAD_WIDTH,
}: {
  axis: Axis;
  center: number;
  length: number;
  width?: number;
}) {
  const size: [number, number, number] =
    axis === "z" ? [width, 0.08, length] : [length, 0.08, width];
  const position: [number, number, number] =
    axis === "z" ? [center, 0.015, 0] : [0, 0.018, center];

  return (
    <mesh position={position} receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={ROAD} roughness={0.98} />
    </mesh>
  );
}

function DashedRoadLine({
  axis,
  fixed,
  min,
  max,
  color = "#e5c34f",
}: {
  axis: Axis;
  fixed: number;
  min: number;
  max: number;
  color?: string;
}) {
  const dashLength = 1.8;
  const gap = 2.3;
  const count = Math.floor((max - min) / (dashLength + gap));

  return (
    <group>
      {Array.from({ length: count }, (_, index) => {
        const coordinate = min + index * (dashLength + gap) + dashLength / 2;
        const position: [number, number, number] =
          axis === "z" ? [fixed, 0.072, coordinate] : [coordinate, 0.073, fixed];
        const size: [number, number, number] =
          axis === "z" ? [0.13, 0.018, dashLength] : [dashLength, 0.018, 0.13];

        return (
          <mesh key={`${axis}-${fixed}-${index}`} position={position} receiveShadow>
            <boxGeometry args={size} />
            <meshStandardMaterial color={color} roughness={0.78} />
          </mesh>
        );
      })}
    </group>
  );
}

function SolidRoadEdge({
  axis,
  fixed,
  length,
}: {
  axis: Axis;
  fixed: number;
  length: number;
}) {
  const size: [number, number, number] =
    axis === "z" ? [0.1, 0.018, length] : [length, 0.018, 0.1];
  const position: [number, number, number] =
    axis === "z" ? [fixed, 0.073, 0] : [0, 0.074, fixed];

  return (
    <mesh position={position} receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color="#d7d4cb" roughness={0.82} />
    </mesh>
  );
}

function StormDrain({
  x,
  z,
  rotationY = 0,
}: {
  x: number;
  z: number;
  rotationY?: number;
}) {
  return (
    <group position={[x, 0.082, z]} rotation={[0, rotationY, 0]}>
      <RoundedBox args={[0.7, 0.04, 0.34]} radius={0.04} smoothness={2} receiveShadow>
        <meshStandardMaterial color="#31373a" metalness={0.45} roughness={0.62} />
      </RoundedBox>
      {[-0.22, -0.07, 0.08, 0.23].map((offset) => (
        <mesh key={offset} position={[offset, 0.024, 0]}>
          <boxGeometry args={[0.035, 0.018, 0.25]} />
          <meshStandardMaterial color="#111518" metalness={0.5} roughness={0.58} />
        </mesh>
      ))}
    </group>
  );
}

function ManholeCover({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x, 0.083, z]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh receiveShadow>
        <circleGeometry args={[0.42, 28]} />
        <meshStandardMaterial color="#3f4548" metalness={0.38} roughness={0.72} />
      </mesh>
      <mesh position={[0, 0, 0.006]}>
        <ringGeometry args={[0.27, 0.32, 28]} />
        <meshStandardMaterial color="#252a2d" metalness={0.44} roughness={0.66} />
      </mesh>
    </group>
  );
}

function SidewalkSegment({
  axis,
  fixed,
  center,
  length,
}: {
  axis: Axis;
  fixed: number;
  center: number;
  length: number;
}) {
  const width = 1.8;
  const size: [number, number, number] =
    axis === "z" ? [width, 0.16, length] : [length, 0.16, width];
  const position: [number, number, number] =
    axis === "z" ? [fixed, 0.08, center] : [center, 0.08, fixed];
  const jointCount = Math.max(1, Math.floor(length / 2.5));

  return (
    <group>
      <RoundedBox
        args={size}
        radius={0.07}
        smoothness={2}
        position={position}
        receiveShadow
        castShadow
      >
        <meshStandardMaterial color={SIDEWALK} roughness={0.98} />
      </RoundedBox>

      {Array.from({ length: jointCount - 1 }, (_, index) => {
        const offset = -length / 2 + ((index + 1) * length) / jointCount;
        const jointPosition: [number, number, number] =
          axis === "z" ? [fixed, 0.168, center + offset] : [center + offset, 0.168, fixed];
        const jointSize: [number, number, number] =
          axis === "z" ? [width - 0.12, 0.012, 0.035] : [0.035, 0.012, width - 0.12];

        return (
          <mesh key={index} position={jointPosition} receiveShadow>
            <boxGeometry args={jointSize} />
            <meshStandardMaterial color="#8f8b84" roughness={0.94} />
          </mesh>
        );
      })}

      <mesh
        position={
          axis === "z"
            ? [fixed - Math.sign(fixed) * 0.94, 0.115, center]
            : [center, 0.115, fixed]
        }
        visible={axis === "z"}
        castShadow
      >
        <boxGeometry args={[0.12, 0.23, length]} />
        <meshStandardMaterial color={SIDEWALK_EDGE} roughness={0.94} />
      </mesh>

      {axis === "z" && (
        <mesh position={[fixed - Math.sign(fixed) * 1.02, 0.03, center]} receiveShadow>
          <boxGeometry args={[0.09, 0.035, length]} />
          <meshStandardMaterial color="#474b4e" roughness={0.98} />
        </mesh>
      )}
    </group>
  );
}

function HorizontalSidewalkSegment({
  roadCenter,
  side,
  centerX,
  length,
}: {
  roadCenter: number;
  side: 1 | -1;
  centerX: number;
  length: number;
}) {
  const z = roadCenter + side * (CROSS_ROAD_WIDTH / 2 + 0.9);
  const jointCount = Math.max(1, Math.floor(length / 2.5));

  return (
    <group>
      <RoundedBox
        args={[length, 0.16, 1.8]}
        radius={0.07}
        smoothness={2}
        position={[centerX, 0.08, z]}
        receiveShadow
        castShadow
      >
        <meshStandardMaterial color={SIDEWALK} roughness={0.98} />
      </RoundedBox>

      {Array.from({ length: jointCount - 1 }, (_, index) => {
        const offset = -length / 2 + ((index + 1) * length) / jointCount;
        return (
          <mesh key={index} position={[centerX + offset, 0.168, z]} receiveShadow>
            <boxGeometry args={[0.035, 0.012, 1.68]} />
            <meshStandardMaterial color="#8f8b84" roughness={0.94} />
          </mesh>
        );
      })}

      <mesh
        position={[centerX, 0.115, roadCenter + side * (CROSS_ROAD_WIDTH / 2 + 0.05)]}
        receiveShadow
        castShadow
      >
        <boxGeometry args={[length, 0.23, 0.12]} />
        <meshStandardMaterial color={SIDEWALK_EDGE} roughness={0.94} />
      </mesh>
      <mesh
        position={[centerX, 0.03, roadCenter + side * (CROSS_ROAD_WIDTH / 2 + 0.13)]}
        receiveShadow
      >
        <boxGeometry args={[length, 0.035, 0.09]} />
        <meshStandardMaterial color="#474b4e" roughness={0.98} />
      </mesh>
    </group>
  );
}

function Crosswalk({
  axis,
  x = 0,
  z = 0,
}: {
  axis: Axis;
  x?: number;
  z?: number;
}) {
  const stripeCount = 7;

  return (
    <group position={[x, 0, z]}>
      {Array.from({ length: stripeCount }, (_, index) => {
        const offset = (index - (stripeCount - 1) / 2) * 0.72;
        const position: [number, number, number] =
          axis === "x" ? [0, 0.076, offset] : [offset, 0.076, 0];
        const size: [number, number, number] =
          axis === "x" ? [6.8, 0.02, 0.4] : [0.4, 0.02, 6.8];

        return (
          <mesh key={index} position={position} receiveShadow>
            <boxGeometry args={size} />
            <meshStandardMaterial color="#e8e6df" roughness={0.75} />
          </mesh>
        );
      })}
    </group>
  );
}

function StreetLamp({
  x,
  z,
  facing,
  lit = false,
}: {
  x: number;
  z: number;
  facing: 1 | -1;
  lit?: boolean;
}) {
  return (
    <group position={[x, 0, z]} rotation={[0, facing === 1 ? 0 : Math.PI, 0]}>
      <mesh castShadow position={[0, 1.85, 0]}>
        <cylinderGeometry args={[0.075, 0.11, 3.7, 12]} />
        <meshStandardMaterial color="#303a40" metalness={0.48} roughness={0.5} />
      </mesh>
      <mesh castShadow position={[0, 0.13, 0]}>
        <cylinderGeometry args={[0.24, 0.28, 0.26, 14]} />
        <meshStandardMaterial color="#303a40" metalness={0.45} roughness={0.56} />
      </mesh>
      <mesh castShadow position={[0.42, 3.48, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <cylinderGeometry args={[0.055, 0.065, 0.84, 10]} />
        <meshStandardMaterial color="#303a40" metalness={0.48} roughness={0.5} />
      </mesh>
      <mesh castShadow position={[0.83, 3.39, 0]}>
        <boxGeometry args={[0.38, 0.18, 0.28]} />
        <meshStandardMaterial color="#273036" metalness={0.38} roughness={0.54} />
      </mesh>
      <mesh position={[0.83, 3.29, 0]}>
        <sphereGeometry args={[0.11, 12, 12]} />
        <meshStandardMaterial
          color="#ffd79a"
          emissive="#ffc96d"
          emissiveIntensity={1.35}
          roughness={0.28}
        />
      </mesh>
      {lit && (
        <pointLight
          position={[0.83, 3.25, 0]}
          color="#ffd59a"
          intensity={0.7}
          distance={8.5}
          decay={2}
        />
      )}
    </group>
  );
}

function Tree({ x, z, scale = 1 }: { x: number; z: number; scale?: number }) {
  return (
    <group position={[x, 0, z]} scale={scale}>
      <mesh castShadow position={[0, 1.15, 0]}>
        <cylinderGeometry args={[0.16, 0.22, 2.3, 10]} />
        <meshStandardMaterial color="#6a4730" roughness={0.96} />
      </mesh>
      <mesh castShadow position={[0, 2.65, 0]}>
        <sphereGeometry args={[1.05, 14, 12]} />
        <meshStandardMaterial color="#4e7048" roughness={0.98} />
      </mesh>
      <mesh castShadow position={[-0.55, 2.38, 0.22]}>
        <sphereGeometry args={[0.72, 12, 10]} />
        <meshStandardMaterial color="#587b50" roughness={0.98} />
      </mesh>
      <mesh castShadow position={[0.52, 2.42, -0.18]}>
        <sphereGeometry args={[0.76, 12, 10]} />
        <meshStandardMaterial color="#496b45" roughness={0.98} />
      </mesh>
    </group>
  );
}

function Bench({ x, z, rotationY = 0 }: { x: number; z: number; rotationY?: number }) {
  return (
    <group position={[x, 0, z]} rotation={[0, rotationY, 0]}>
      {[-0.65, 0.65].map((leg) => (
        <mesh key={leg} castShadow position={[leg, 0.33, 0]}>
          <boxGeometry args={[0.1, 0.66, 0.46]} />
          <meshStandardMaterial color="#3b4449" metalness={0.35} roughness={0.55} />
        </mesh>
      ))}
      <mesh castShadow position={[0, 0.62, 0]}>
        <boxGeometry args={[1.75, 0.14, 0.55]} />
        <meshStandardMaterial color="#7d5637" roughness={0.88} />
      </mesh>
      <mesh castShadow position={[0, 1.02, 0.22]} rotation={[-0.13, 0, 0]}>
        <boxGeometry args={[1.75, 0.52, 0.12]} />
        <meshStandardMaterial color="#7d5637" roughness={0.88} />
      </mesh>
    </group>
  );
}

function TrafficSignal({ x, z, rotationY }: { x: number; z: number; rotationY: number }) {
  return (
    <group position={[x, 0, z]} rotation={[0, rotationY, 0]}>
      <mesh castShadow position={[0, 1.75, 0]}>
        <cylinderGeometry args={[0.065, 0.09, 3.5, 10]} />
        <meshStandardMaterial color="#343d42" metalness={0.42} roughness={0.54} />
      </mesh>
      <mesh castShadow position={[0.58, 3.35, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.06, 1.15, 10]} />
        <meshStandardMaterial color="#343d42" metalness={0.42} roughness={0.54} />
      </mesh>
      <mesh castShadow position={[1.08, 3.05, 0]}>
        <boxGeometry args={[0.38, 0.96, 0.32]} />
        <meshStandardMaterial color="#1f272b" roughness={0.64} />
      </mesh>
      {[
        { y: 3.34, color: "#d84949", glow: 0.15 },
        { y: 3.05, color: "#e1b84b", glow: 0.12 },
        { y: 2.76, color: "#4fc879", glow: 1.2 },
      ].map((light) => (
        <mesh key={light.y} position={[1.08, light.y, -0.175]} rotation={[0, Math.PI, 0]}>
          <circleGeometry args={[0.1, 16]} />
          <meshStandardMaterial
            color={light.color}
            emissive={light.color}
            emissiveIntensity={light.glow}
            roughness={0.35}
          />
        </mesh>
      ))}
    </group>
  );
}

type VehicleProfile = {
  width: number;
  length: number;
  bodyHeight: number;
  cabinWidth: number;
  cabinLength: number;
  cabinHeight: number;
  cabinBaseY: number;
  cabinOffsetZ: number;
  wheelRadius: number;
  wheelZ: number;
  hoodLength: number;
  trunkLength: number;
};

const VEHICLE_PROFILES: Record<VehicleModel, VehicleProfile> = {
  sedan: {
    width: 1.5,
    length: 2.95,
    bodyHeight: 0.5,
    cabinWidth: 1.22,
    cabinLength: 1.48,
    cabinHeight: 0.56,
    cabinBaseY: 0.58,
    cabinOffsetZ: 0.08,
    wheelRadius: 0.27,
    wheelZ: 0.92,
    hoodLength: 0.72,
    trunkLength: 0.55,
  },
  suv: {
    width: 1.58,
    length: 3.18,
    bodyHeight: 0.62,
    cabinWidth: 1.34,
    cabinLength: 1.68,
    cabinHeight: 0.7,
    cabinBaseY: 0.67,
    cabinOffsetZ: 0.05,
    wheelRadius: 0.31,
    wheelZ: 1.02,
    hoodLength: 0.75,
    trunkLength: 0.46,
  },
  hatchback: {
    width: 1.46,
    length: 2.72,
    bodyHeight: 0.54,
    cabinWidth: 1.2,
    cabinLength: 1.5,
    cabinHeight: 0.62,
    cabinBaseY: 0.61,
    cabinOffsetZ: 0.17,
    wheelRadius: 0.27,
    wheelZ: 0.82,
    hoodLength: 0.62,
    trunkLength: 0.32,
  },
};

function createCabinGeometry(
  width: number,
  length: number,
  height: number,
  model: VehicleModel
) {
  const bottomHalfWidth = width / 2;
  const bottomHalfLength = length / 2;
  const topHalfWidth = width * (model === "suv" ? 0.43 : 0.39);
  const frontInset = length * (model === "suv" ? 0.17 : 0.23);
  const rearInset = length * (model === "hatchback" ? 0.1 : 0.2);

  const vertices = new Float32Array([
    -bottomHalfWidth, 0, -bottomHalfLength,
    bottomHalfWidth, 0, -bottomHalfLength,
    bottomHalfWidth, 0, bottomHalfLength,
    -bottomHalfWidth, 0, bottomHalfLength,
    -topHalfWidth, height, -bottomHalfLength + frontInset,
    topHalfWidth, height, -bottomHalfLength + frontInset,
    topHalfWidth, height, bottomHalfLength - rearInset,
    -topHalfWidth, height, bottomHalfLength - rearInset,
  ]);

  const indices = [
    0, 3, 2, 0, 2, 1,
    4, 5, 6, 4, 6, 7,
    0, 1, 5, 0, 5, 4,
    1, 2, 6, 1, 6, 5,
    2, 3, 7, 2, 7, 6,
    3, 0, 4, 3, 4, 7,
  ];

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.clearGroups();
  geometry.addGroup(0, 12, 0);
  geometry.addGroup(12, 24, 1);
  geometry.computeVertexNormals();
  return geometry;
}

function TaperedCabin({
  profile,
  model,
  color,
}: {
  profile: VehicleProfile;
  model: VehicleModel;
  color: string;
}) {
  const geometry = useMemo(
    () => createCabinGeometry(profile.cabinWidth, profile.cabinLength, profile.cabinHeight, model),
    [model, profile.cabinHeight, profile.cabinLength, profile.cabinWidth]
  );

  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <mesh
      geometry={geometry}
      position={[0, profile.cabinBaseY, profile.cabinOffsetZ]}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial
        attach="material-0"
        color={color}
        roughness={0.46}
        metalness={0.18}
      />
      <meshStandardMaterial
        attach="material-1"
        color="#4f6f7f"
        emissive="#102631"
        emissiveIntensity={0.08}
        roughness={0.18}
        metalness={0.34}
        transparent
        opacity={0.94}
      />
    </mesh>
  );
}

function CarWheel({
  x,
  z,
  radius,
}: {
  x: number;
  z: number;
  radius: number;
}) {
  return (
    <group position={[x, radius, z]} rotation={[0, 0, Math.PI / 2]}>
      <mesh castShadow>
        <cylinderGeometry args={[radius, radius, 0.22, 22]} />
        <meshStandardMaterial color="#141719" roughness={0.9} />
      </mesh>
      {[-0.116, 0.116].map((side) => (
        <group key={side} position={[0, side, 0]}>
          <mesh>
            <cylinderGeometry args={[radius * 0.61, radius * 0.61, 0.022, 18]} />
            <meshStandardMaterial color="#9aa2a8" metalness={0.72} roughness={0.34} />
          </mesh>
          <mesh position={[0, side > 0 ? 0.014 : -0.014, 0]}>
            <cylinderGeometry args={[radius * 0.22, radius * 0.22, 0.028, 16]} />
            <meshStandardMaterial color="#3d4449" metalness={0.65} roughness={0.4} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function RealisticVehicle({
  model,
  color,
}: {
  model: VehicleModel;
  color: string;
}) {
  const profile = VEHICLE_PROFILES[model];
  const bodyCenterY = profile.wheelRadius + profile.bodyHeight * 0.52;
  const frontZ = -profile.length / 2;
  const rearZ = profile.length / 2;
  const roofWidth = profile.cabinWidth * (model === "suv" ? 0.82 : 0.76);
  const roofLength = profile.cabinLength * (model === "hatchback" ? 0.68 : 0.58);

  return (
    <group>
      <mesh
        position={[0, 0.035, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[profile.width * 0.53, profile.length * 0.46, 1]}
        receiveShadow
      >
        <circleGeometry args={[1, 28]} />
        <meshBasicMaterial color="#111315" transparent opacity={0.2} depthWrite={false} />
      </mesh>

      <RoundedBox
        args={[profile.width, profile.bodyHeight, profile.length]}
        radius={0.16}
        smoothness={4}
        position={[0, bodyCenterY, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.18} />
      </RoundedBox>

      <RoundedBox
        args={[profile.width + 0.035, 0.15, profile.length * 0.84]}
        radius={0.06}
        smoothness={3}
        position={[0, profile.wheelRadius + 0.11, 0]}
        castShadow
      >
        <meshStandardMaterial color="#2d3236" roughness={0.72} metalness={0.2} />
      </RoundedBox>

      <RoundedBox
        args={[profile.width * 0.91, 0.17, profile.hoodLength]}
        radius={0.07}
        smoothness={3}
        position={[
          0,
          bodyCenterY + profile.bodyHeight / 2 - 0.015,
          frontZ + profile.hoodLength / 2 + 0.08,
        ]}
        castShadow
      >
        <meshStandardMaterial color={color} roughness={0.47} metalness={0.2} />
      </RoundedBox>

      <RoundedBox
        args={[profile.width * 0.9, 0.15, profile.trunkLength]}
        radius={0.065}
        smoothness={3}
        position={[
          0,
          bodyCenterY + profile.bodyHeight / 2 - 0.025,
          rearZ - profile.trunkLength / 2 - 0.07,
        ]}
        castShadow
      >
        <meshStandardMaterial color={color} roughness={0.48} metalness={0.19} />
      </RoundedBox>

      <TaperedCabin profile={profile} model={model} color={color} />

      <RoundedBox
        args={[roofWidth, 0.105, roofLength]}
        radius={0.05}
        smoothness={3}
        position={[
          0,
          profile.cabinBaseY + profile.cabinHeight + 0.015,
          profile.cabinOffsetZ + (model === "hatchback" ? 0.07 : 0),
        ]}
        castShadow
      >
        <meshStandardMaterial color={color} roughness={0.43} metalness={0.22} />
      </RoundedBox>

      {[-1, 1].flatMap((side) =>
        [-1, 1].map((end) => (
          <mesh
            key={`pillar-${side}-${end}`}
            castShadow
            position={[
              side * profile.cabinWidth * 0.43,
              profile.cabinBaseY + profile.cabinHeight * 0.52,
              profile.cabinOffsetZ + end * profile.cabinLength * 0.34,
            ]}
          >
            <boxGeometry args={[0.055, profile.cabinHeight * 0.82, 0.065]} />
            <meshStandardMaterial color="#20272c" roughness={0.5} metalness={0.32} />
          </mesh>
        ))
      )}

      {[-1, 1].map((side) => (
        <group
          key={`mirror-${side}`}
          position={[
            side * (profile.cabinWidth / 2 + 0.12),
            profile.cabinBaseY + profile.cabinHeight * 0.52,
            profile.cabinOffsetZ - profile.cabinLength * 0.25,
          ]}
        >
          <RoundedBox args={[0.2, 0.11, 0.18]} radius={0.045} smoothness={3} castShadow>
            <meshStandardMaterial color={color} roughness={0.5} metalness={0.18} />
          </RoundedBox>
          <mesh position={[side * 0.105, 0, 0]} rotation={[0, side * Math.PI / 2, 0]}>
            <planeGeometry args={[0.12, 0.07]} />
            <meshStandardMaterial color="#65808d" metalness={0.42} roughness={0.2} />
          </mesh>
        </group>
      ))}

      {[-1, 1].flatMap((side) =>
        [-1, 1].map((axle) => (
          <group key={`wheel-${side}-${axle}`}>
            <mesh
              castShadow
              position={[
                side * (profile.width / 2 - 0.025),
                profile.wheelRadius + 0.025,
                axle * profile.wheelZ,
              ]}
              rotation={[0, 0, Math.PI / 2]}
            >
              <cylinderGeometry
                args={[profile.wheelRadius + 0.07, profile.wheelRadius + 0.07, 0.07, 22]}
              />
              <meshStandardMaterial color={color} roughness={0.52} metalness={0.16} />
            </mesh>
            <CarWheel
              x={side * (profile.width / 2 + 0.035)}
              z={axle * profile.wheelZ}
              radius={profile.wheelRadius}
            />
          </group>
        ))
      )}

      <RoundedBox
        args={[profile.width * 0.84, 0.16, 0.13]}
        radius={0.04}
        smoothness={2}
        position={[0, bodyCenterY - 0.04, frontZ - 0.055]}
        castShadow
      >
        <meshStandardMaterial color="#252b2f" roughness={0.66} metalness={0.34} />
      </RoundedBox>
      <RoundedBox
        args={[profile.width * 0.84, 0.15, 0.13]}
        radius={0.04}
        smoothness={2}
        position={[0, bodyCenterY - 0.05, rearZ + 0.055]}
        castShadow
      >
        <meshStandardMaterial color="#2a3034" roughness={0.68} metalness={0.3} />
      </RoundedBox>

      <mesh position={[0, bodyCenterY - 0.01, frontZ - 0.126]}>
        <boxGeometry args={[profile.width * 0.38, 0.13, 0.025]} />
        <meshStandardMaterial color="#14191c" roughness={0.5} metalness={0.44} />
      </mesh>
      {[-0.3, 0.3].map((side) => (
        <RoundedBox
          key={`head-${side}`}
          args={[0.25, 0.15, 0.055]}
          radius={0.035}
          smoothness={2}
          position={[side * profile.width, bodyCenterY + 0.045, frontZ - 0.095]}
        >
          <meshStandardMaterial
            color="#fff4c8"
            emissive="#ffe49a"
            emissiveIntensity={1.15}
            roughness={0.22}
          />
        </RoundedBox>
      ))}
      {[-0.3, 0.3].map((side) => (
        <RoundedBox
          key={`tail-${side}`}
          args={[0.24, 0.15, 0.055]}
          radius={0.035}
          smoothness={2}
          position={[side * profile.width, bodyCenterY + 0.035, rearZ + 0.095]}
        >
          <meshStandardMaterial
            color="#ce3434"
            emissive="#e33d3d"
            emissiveIntensity={0.82}
            roughness={0.28}
          />
        </RoundedBox>
      ))}

      <mesh position={[0, bodyCenterY - 0.085, frontZ - 0.137]}>
        <boxGeometry args={[0.44, 0.11, 0.018]} />
        <meshStandardMaterial color="#e3e6e7" roughness={0.45} metalness={0.05} />
      </mesh>
      <mesh position={[0, bodyCenterY - 0.085, rearZ + 0.137]}>
        <boxGeometry args={[0.44, 0.11, 0.018]} />
        <meshStandardMaterial color="#e5c66a" roughness={0.45} metalness={0.05} />
      </mesh>

      {[-1, 1].flatMap((side) =>
        [-0.28, 0.3].map((z, index) => (
          <mesh
            key={`handle-${side}-${index}`}
            position={[
              side * (profile.width / 2 + 0.014),
              bodyCenterY + 0.12,
              z,
            ]}
          >
            <boxGeometry args={[0.025, 0.045, 0.2]} />
            <meshStandardMaterial color="#c8cdd0" metalness={0.58} roughness={0.35} />
          </mesh>
        ))
      )}
    </group>
  );
}

function MovingCar({ route, paused }: { route: CarRoute; paused: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const routeLength = route.max - route.min;
  const initialDistance = ((route.offset % routeLength) + routeLength) % routeLength;
  const initialCoordinate =
    route.direction === 1 ? route.min + initialDistance : route.max - initialDistance;
  const rotationY =
    route.axis === "z"
      ? route.direction === -1
        ? 0
        : Math.PI
      : route.direction === 1
        ? -Math.PI / 2
        : Math.PI / 2;
  const initialPosition: [number, number, number] =
    route.axis === "z"
      ? [route.lane, 0.08, initialCoordinate]
      : [initialCoordinate, 0.08, route.lane];

  useFrame(({ clock }) => {
    if (paused || !ref.current) return;

    const distance = (clock.elapsedTime * route.speed + route.offset) % routeLength;
    const coordinate = route.direction === 1 ? route.min + distance : route.max - distance;

    if (route.axis === "z") ref.current.position.z = coordinate;
    else ref.current.position.x = coordinate;

    ref.current.position.y = initialPosition[1] + Math.sin(clock.elapsedTime * 3 + route.offset) * 0.008;
  });

  return (
    <group
      ref={ref}
      position={initialPosition}
      rotation={[0, rotationY, 0]}
      scale={route.scale ?? 1}
    >
      <RealisticVehicle model={route.model} color={route.color} />
    </group>
  );
}

function useWelcomeArchTexture(label: string) {
  const texture = useMemo(() => {
    if (typeof document === "undefined") return null;

    const canvas = document.createElement("canvas");
    canvas.width = 1600;
    canvas.height = 250;
    const context = canvas.getContext("2d");
    if (!context) return null;

    context.clearRect(0, 0, canvas.width, canvas.height);

    const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#ffffff");
    gradient.addColorStop(1, "#f5f2e9");
    context.fillStyle = gradient;
    traceRoundedRect(context, 10, 10, canvas.width - 20, canvas.height - 20, 34);
    context.fill();

    context.strokeStyle = "#d8d2c6";
    context.lineWidth = 9;
    traceRoundedRect(context, 10, 10, canvas.width - 20, canvas.height - 20, 34);
    context.stroke();

    context.fillStyle = SIGNAL;
    traceRoundedRect(context, 34, 34, 18, canvas.height - 68, 9);
    context.fill();

    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = SIGNAL;
    context.font = "700 28px Arial, Helvetica, sans-serif";
    context.fillText(label.toUpperCase(), canvas.width / 2, 64);

    const title = "ADIL JASEEM · PORTFOLIO CITY";
    const titleFont = "Arial, Helvetica, sans-serif";
    const titleSize = fitCanvasFont(context, title, 1370, 70, 42, titleFont);
    context.fillStyle = "#111827";
    context.font = `800 ${titleSize}px ${titleFont}`;
    context.fillText(title, canvas.width / 2, 156);

    const nextTexture = new THREE.CanvasTexture(canvas);
    nextTexture.colorSpace = THREE.SRGBColorSpace;
    nextTexture.minFilter = THREE.LinearMipmapLinearFilter;
    nextTexture.magFilter = THREE.LinearFilter;
    nextTexture.generateMipmaps = true;
    nextTexture.anisotropy = 8;
    nextTexture.needsUpdate = true;
    return nextTexture;
  }, [label]);

  useEffect(() => () => texture?.dispose(), [texture]);
  return texture;
}

function WelcomeArch({ label }: { label: string }) {
  const texture = useWelcomeArchTexture(label);

  return (
    <group position={[0, 0, 44]}>
      {[-5.1, 5.1].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <mesh castShadow position={[0, 2.15, 0]}>
            <boxGeometry args={[0.72, 4.3, 0.86]} />
            <meshStandardMaterial color="#ded8cd" roughness={0.76} metalness={0.08} />
          </mesh>
          <mesh castShadow position={[0, 0.24, 0]}>
            <boxGeometry args={[1.05, 0.48, 1.18]} />
            <meshStandardMaterial color="#bdb5a8" roughness={0.82} />
          </mesh>
        </group>
      ))}

      <mesh castShadow position={[0, 4.25, 0]}>
        <boxGeometry args={[10.9, 0.82, 0.82]} />
        <meshStandardMaterial color="#eeeae1" roughness={0.7} metalness={0.08} />
      </mesh>

      <RoundedBox
        args={[7.05, 1.08, 0.18]}
        radius={0.12}
        smoothness={4}
        position={[0, 4.25, 0.5]}
        castShadow
      >
        <meshStandardMaterial color="#f5f2e9" roughness={0.62} metalness={0.06} />
      </RoundedBox>

      {texture && (
        <mesh position={[0, 4.25, 0.596]} renderOrder={3}>
          <planeGeometry args={[6.82, 0.88]} />
          <meshBasicMaterial map={texture} transparent toneMapped={false} />
        </mesh>
      )}

      <mesh position={[0, 3.69, 0.5]}>
        <boxGeometry args={[6.65, 0.08, 0.12]} />
        <meshStandardMaterial
          color={SIGNAL}
          emissive={SIGNAL}
          emissiveIntensity={0.18}
          roughness={0.48}
        />
      </mesh>
    </group>
  );
}

function CityGround() {
  const verticalSidewalkSegments = [
    { center: 39.25, length: 24.5 },
    { center: 16, length: 10 },
    { center: 0, length: 10 },
    { center: -16, length: 10 },
    { center: -39.25, length: 24.5 },
  ] as const;
  const horizontalSegments = [
    { centerX: -30, length: 44 },
    { centerX: 30, length: 44 },
  ] as const;
  const drainRows = [-42, -31, -18, -13, -2, 2, 13, 18, 31, 42] as const;

  return (
    <group>
      <mesh position={[0, -0.08, 0]} receiveShadow>
        <boxGeometry args={[CITY_SIZE + 10, 0.16, CITY_SIZE + 10]} />
        <meshStandardMaterial color={GRASS} roughness={1} />
      </mesh>

      <RoadSurface axis="z" center={MAIN_ROAD_X} length={CITY_SIZE} />
      {CROSS_ROADS_Z.map((z) => (
        <RoadSurface
          key={z}
          axis="x"
          center={z}
          length={CITY_SIZE}
          width={CROSS_ROAD_WIDTH}
        />
      ))}

      <DashedRoadLine axis="z" fixed={0} min={-50} max={50} />
      {CROSS_ROADS_Z.map((z) => (
        <DashedRoadLine key={z} axis="x" fixed={z} min={-50} max={50} />
      ))}

      {([-1, 1] as const).map((side) => (
        <SolidRoadEdge
          key={`main-edge-${side}`}
          axis="z"
          fixed={side * (ROAD_WIDTH / 2 - 0.28)}
          length={CITY_SIZE}
        />
      ))}
      {CROSS_ROADS_Z.flatMap((roadCenter) =>
        ([-1, 1] as const).map((side) => (
          <SolidRoadEdge
            key={`cross-edge-${roadCenter}-${side}`}
            axis="x"
            fixed={roadCenter + side * (CROSS_ROAD_WIDTH / 2 - 0.24)}
            length={CITY_SIZE}
          />
        ))
      )}

      <ManholeCover x={1.15} z={-38} />
      <ManholeCover x={-1.1} z={-2} />
      <ManholeCover x={1.1} z={36} />
      {drainRows.flatMap((z) => [
        <StormDrain key={`drain-left-${z}`} x={-3.58} z={z} rotationY={Math.PI / 2} />,
        <StormDrain key={`drain-right-${z}`} x={3.58} z={z} rotationY={Math.PI / 2} />,
      ])}

      {verticalSidewalkSegments.flatMap((segment) =>
        ([-1, 1] as const).map((side) => (
          <SidewalkSegment
            key={`${segment.center}-${side}`}
            axis="z"
            fixed={side * (ROAD_WIDTH / 2 + 0.9)}
            center={segment.center}
            length={segment.length}
          />
        ))
      )}

      {CROSS_ROADS_Z.flatMap((roadCenter) =>
        horizontalSegments.flatMap((segment) =>
          ([-1, 1] as const).map((side) => (
            <HorizontalSidewalkSegment
              key={`${roadCenter}-${segment.centerX}-${side}`}
              roadCenter={roadCenter}
              side={side}
              centerX={segment.centerX}
              length={segment.length}
            />
          ))
        )
      )}

      {CROSS_ROADS_Z.flatMap((z) => [
        <Crosswalk
          key={`${z}-south`}
          axis="x"
          z={z - CROSS_ROAD_WIDTH / 2 - 0.85}
        />,
        <Crosswalk
          key={`${z}-north`}
          axis="x"
          z={z + CROSS_ROAD_WIDTH / 2 + 0.85}
        />,
        <Crosswalk key={`${z}-west`} axis="z" x={-ROAD_WIDTH / 2 - 0.85} z={z} />,
        <Crosswalk key={`${z}-east`} axis="z" x={ROAD_WIDTH / 2 + 0.85} z={z} />,
      ])}

      <mesh receiveShadow position={[38, 0.035, 38]}>
        <cylinderGeometry args={[6.6, 6.6, 0.07, 48]} />
        <meshStandardMaterial color="#7b8a67" roughness={1} />
      </mesh>
      <mesh receiveShadow position={[38, 0.07, 38]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[5.4, 5.9, 48]} />
        <meshStandardMaterial color="#b8b2a5" roughness={0.96} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function CityProps() {
  const crossLampX = [-34, 34] as const;
  const signalOffset = CROSS_ROAD_WIDTH / 2 + 1.05;
  const crossLampOffset = CROSS_ROAD_WIDTH / 2 + 1.15;

  return (
    <group>
      {/* Keep the About facade and its center-mounted board unobstructed. */}
      {MAIN_LAMP_Z.filter((z) => z !== 34).map((z, index) => (
        <StreetLamp
          key={`lamp-left-${z}`}
          x={-5.15}
          z={z}
          facing={1}
          lit={index % 2 === 0}
        />
      ))}
      {MAIN_LAMP_Z.map((z, index) => (
        <StreetLamp
          key={`lamp-right-${z}`}
          x={5.15}
          z={z}
          facing={-1}
          lit={index % 2 === 1}
        />
      ))}

      {TREE_Z.flatMap((z, index) => [
        <Tree key={`tree-left-${z}`} x={-6.75} z={z} scale={0.78 + (index % 3) * 0.08} />,
        <Tree key={`tree-right-${z}`} x={6.75} z={z} scale={0.82 + ((index + 1) % 3) * 0.07} />,
      ])}

      {CROSS_ROADS_Z.flatMap((roadZ, roadIndex) =>
        crossLampX.flatMap((x, index) => [
          <StreetLamp
            key={`cross-${roadZ}-${x}-north`}
            x={x}
            z={roadZ + crossLampOffset}
            facing={x < 0 ? 1 : -1}
            lit={(roadIndex + index) % 3 === 0}
          />,
          <StreetLamp
            key={`cross-${roadZ}-${x}-south`}
            x={x}
            z={roadZ - crossLampOffset}
            facing={x < 0 ? 1 : -1}
          />,
        ])
      )}

      <Bench x={-7.4} z={39} rotationY={Math.PI / 2} />
      <Bench x={7.4} z={31} rotationY={-Math.PI / 2} />
      <Bench x={-7.4} z={-39} rotationY={Math.PI / 2} />
      <Bench x={41.2} z={38} rotationY={-Math.PI / 2} />

      <Tree x={34} z={34.5} scale={0.9} />
      <Tree x={42.7} z={41.9} scale={0.92} />

      {CROSS_ROADS_Z.flatMap((roadZ) => [
        <TrafficSignal
          key={`signal-west-${roadZ}`}
          x={-5.2}
          z={roadZ - signalOffset}
          rotationY={0}
        />,
        <TrafficSignal
          key={`signal-east-${roadZ}`}
          x={5.2}
          z={roadZ + signalOffset}
          rotationY={Math.PI}
        />,
      ])}
    </group>
  );
}

function Scene({
  onSelectBuilding,
  onHoverChange,
  focusedBuilding,
  cameraBusy,
  interactionEnabled,
  hasFinePointer,
  reducedMotion,
  locked,
  cameraDirectorApiRef,
  onFocusComplete,
  onReturnComplete,
}: {
  onSelectBuilding: (spec: SectionBuildingSpec) => void;
  onHoverChange: (label: string | null) => void;
  focusedBuilding: SectionBuildingSpec | null;
  cameraBusy: boolean;
  interactionEnabled: boolean;
  hasFinePointer: boolean;
  reducedMotion: boolean;
  locked: boolean;
  cameraDirectorApiRef: MutableRefObject<CameraDirectorApi | null>;
  onFocusComplete: () => void;
  onReturnComplete: () => void;
}) {
  const stops = useMemo<SectionBuildingSpec[]>(
    () =>
      district.slice(1).map((station, index) => ({
        ...station,
        ...SECTION_ARCHITECTURE[index],
        x: WORLD_POSITIONS[index][0],
        z: WORLD_POSITIONS[index][1],
      })),
    []
  );

  const colliders = useMemo<Collider[]>(
    () => [
      ...stops.map(colliderFromFootprint),
      ...BACKGROUND_BUILDINGS.map(colliderFromFootprint),
    ],
    [stops]
  );

  return (
    <>
      {hasFinePointer ? (
        <PerspectiveCamera makeDefault position={SPAWN_POINT} fov={66} near={0.1} far={220} />
      ) : (
        <PerspectiveCamera
          makeDefault
          position={MOBILE_CAMERA_POSITION}
          fov={MOBILE_CAMERA_FOV}
          near={0.1}
          far={230}
          onUpdate={(camera) => camera.lookAt(0, 2, -2)}
        />
      )}

      <CameraDirector
        focus={focusedBuilding}
        reducedMotion={reducedMotion}
        apiRef={cameraDirectorApiRef}
        onFocusComplete={onFocusComplete}
        onReturnComplete={onReturnComplete}
      />

      <color attach="background" args={["#9eb3c0"]} />
      <Sky
        distance={450000}
        sunPosition={[85, 34, -55]}
        turbidity={7.5}
        rayleigh={2.1}
        mieCoefficient={0.0045}
        mieDirectionalG={0.82}
      />
      <fog attach="fog" args={["#9eb3c0", 70, 155]} />

      <hemisphereLight color="#e6f1ff" groundColor="#59634e" intensity={1.25} />
      <ambientLight intensity={0.28} />
      <directionalLight
        castShadow
        position={[28, 42, 20]}
        color="#fff0d0"
        intensity={2.2}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-left={-58}
        shadow-camera-right={58}
        shadow-camera-top={58}
        shadow-camera-bottom={-58}
        shadow-camera-near={1}
        shadow-camera-far={125}
        shadow-bias={-0.00018}
      />

      {hasFinePointer && (
        <Player
          colliders={colliders}
          disabled={Boolean(focusedBuilding) || cameraBusy}
          locked={locked}
        />
      )}

      <CityGround />
      <CityProps />
      <WelcomeArch label={district[0].label} />

      {stops.map((spec) => (
        <SectionBuilding
          key={spec.href}
          spec={spec}
          onEnter={onSelectBuilding}
          onHoverChange={onHoverChange}
          interactionEnabled={interactionEnabled}
        />
      ))}

      {BACKGROUND_BUILDINGS.map((spec) => (
        <BackgroundBuilding key={spec.id} spec={spec} />
      ))}

      {CAR_ROUTES.map((route) => (
        <MovingCar
          key={route.id}
          route={route}
          paused={reducedMotion || Boolean(focusedBuilding)}
        />
      ))}
    </>
  );
}

function ModalPill({ label }: { label: string }) {
  return (
    <span className="inline-flex rounded-full border border-line bg-white px-3 py-1 text-xs font-medium text-mist shadow-sm">
      {label}
    </span>
  );
}

function SectionModalContent({ href }: { href: string }) {
  if (href === "#about") {
    return (
      <div className="grid gap-8 lg:grid-cols-[1.35fr_0.85fr]">
        <div className="space-y-4">
          {about.paragraphs.map((paragraph, index) => (
            <p
              key={paragraph}
              className={
                index === 0
                  ? "text-lg leading-8 text-ink sm:text-xl"
                  : "leading-7 text-mist"
              }
            >
              {paragraph}
            </p>
          ))}
        </div>

        <dl className="grid content-start gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {about.readouts.map((readout) => (
            <div
              key={readout.label}
              className="rounded-2xl border border-line bg-panel-2 p-4"
            >
              <dt className="text-xs font-semibold tracking-[0.16em] text-mist-dim uppercase">
                {readout.label}
              </dt>
              <dd className="mt-2 text-xl font-semibold text-ink">{readout.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    );
  }

  if (href === "#experience") {
    return (
      <div className="space-y-6">
        {experience.map((role) => (
          <article
            key={`${role.company}-${role.start}`}
            className="rounded-3xl border border-line bg-panel-2 p-5 sm:p-7"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold tracking-[0.16em] text-signal uppercase">
                  {role.start} to {role.end}
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-ink">{role.role}</h3>
                <p className="mt-1 font-medium text-mist">
                  {role.company} · {role.location}
                </p>
              </div>
              <BriefcaseBusiness className="size-6 shrink-0 text-signal" />
            </div>

            <p className="mt-5 leading-7 text-mist">{role.summary}</p>
            <ul className="mt-6 grid gap-3 lg:grid-cols-2">
              {role.achievements.map((achievement) => (
                <li
                  key={achievement}
                  className="flex gap-3 rounded-2xl border border-line bg-white p-4 text-sm leading-6 text-mist"
                >
                  <span className="mt-2 size-2 shrink-0 rounded-full bg-signal" />
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              {role.stack.map((technology) => (
                <ModalPill key={technology} label={technology} />
              ))}
            </div>
          </article>
        ))}
      </div>
    );
  }

  if (href === "#work") {
    return (
      <div className="space-y-7">
        <article className="overflow-hidden rounded-3xl border border-signal/20 bg-[linear-gradient(135deg,#ffffff_0%,#f4f1ff_60%,#fff5f8_100%)] text-ink shadow-[0_18px_50px_rgba(31,39,57,0.08)]">
          <div className="p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-[0.16em] text-signal uppercase">
                  {featuredProject.tag}
                </p>
                <h3 className="mt-2 text-3xl font-semibold">{featuredProject.name}</h3>
                <p className="mt-2 text-sm font-medium text-signal">{featuredProject.role}</p>
              </div>
              <Code2 className="size-7 shrink-0 text-signal" />
            </div>
            <p className="mt-5 max-w-3xl leading-7 text-mist">
              {featuredProject.description}
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {featuredProject.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3 text-sm leading-6 text-mist">
                  <Sparkles className="mt-1 size-4 shrink-0 text-pulse" />
                  {highlight}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              {featuredProject.stack.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-line bg-white/80 px-3 py-1 text-xs text-mist shadow-sm"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>
        </article>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {secondaryProjects.map((project) => (
            <article
              key={project.name}
              className="rounded-3xl border border-line bg-panel-2 p-5 sm:p-6"
            >
              <p className="text-xs font-semibold tracking-[0.14em] text-signal uppercase">
                {project.tag}
              </p>
              <h4 className="mt-2 text-xl font-semibold text-ink">{project.name}</h4>
              <p className="mt-3 leading-7 text-mist">{project.description}</p>
              {project.highlights?.length ? (
                <ul className="mt-4 space-y-2">
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-2 text-xs leading-5 text-mist">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-signal" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((technology) => (
                  <ModalPill key={technology} label={technology} />
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="rounded-3xl border border-line bg-white p-5 sm:p-6">
          <h4 className="text-sm font-semibold tracking-[0.14em] text-mist-dim uppercase">
            Earlier builds
          </h4>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {earlierBuilds.map((project) => (
              <div key={project.name} className="rounded-2xl bg-panel-2 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-ink">{project.name}</p>
                    <p className="mt-1 text-xs text-mist-dim">{project.tag}</p>
                  </div>
                  {project.codeHref ? (
                    <a
                      href={project.codeHref}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-line bg-white px-2 py-1 text-[10px] font-semibold text-mist hover:border-signal hover:text-signal"
                    >
                      CODE
                    </a>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (href === "#skills") {
    return (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((category) => (
          <article
            key={category.title}
            className="rounded-3xl border border-line bg-panel-2 p-5 sm:p-6"
          >
            <h3 className="text-sm font-semibold tracking-[0.14em] text-signal uppercase">
              {category.title}
            </h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {category.items.map((item) => (
                <ModalPill key={item.name} label={item.name} />
              ))}
            </div>
          </article>
        ))}
      </div>
    );
  }

  if (href === "#contact") {
    return (
      <div className="grid gap-7 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h3 className="text-3xl font-semibold text-ink">{contact.heading}</h3>
          <p className="mt-4 max-w-xl leading-7 text-mist">{contact.sub}</p>
          <div className="mt-6 rounded-3xl border border-signal/25 bg-signal/10 p-5 text-sm leading-6 text-ink">
            {profile.availability}
          </div>
        </div>

        <div className="grid gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-4 rounded-2xl border border-line bg-white p-4 shadow-sm transition hover:border-signal"
          >
            <span className="flex size-11 items-center justify-center rounded-xl bg-signal/10 text-signal">
              <Mail className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold tracking-[0.14em] text-mist-dim uppercase">Email</p>
              <p className="truncate font-medium text-ink">{profile.email}</p>
            </div>
          </a>
          <a
            href={`tel:${profile.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-4 rounded-2xl border border-line bg-white p-4 shadow-sm transition hover:border-signal"
          >
            <span className="flex size-11 items-center justify-center rounded-xl bg-signal/10 text-signal">
              <Phone className="size-5" />
            </span>
            <div>
              <p className="text-xs font-semibold tracking-[0.14em] text-mist-dim uppercase">Phone</p>
              <p className="font-medium text-ink">{profile.phone}</p>
            </div>
          </a>
          <div className="flex items-center gap-4 rounded-2xl border border-line bg-white p-4 shadow-sm">
            <span className="flex size-11 items-center justify-center rounded-xl bg-signal/10 text-signal">
              <MapPin className="size-5" />
            </span>
            <div>
              <p className="text-xs font-semibold tracking-[0.14em] text-mist-dim uppercase">Location</p>
              <p className="font-medium text-ink">{profile.location}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              ["GitHub", profile.social.github],
              ["LinkedIn", profile.social.linkedin],
              ["Instagram", profile.social.instagram],
            ].map(([label, url]) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-line bg-panel-2 px-3 py-3 text-center text-xs font-semibold text-mist transition hover:border-signal hover:text-signal"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

function SectionModal({
  spec,
  onClose,
  reducedMotion,
}: {
  spec: SectionBuildingSpec;
  onClose: () => void;
  reducedMotion: boolean;
}) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      event.stopImmediatePropagation();
      onClose();
    };

    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.22 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-void/65 p-3 backdrop-blur-md sm:p-6"
      onPointerDown={(event) => {
        event.stopPropagation();
        if (event.target === event.currentTarget) onClose();
      }}
      onClick={(event) => event.stopPropagation()}
    >
      <motion.section
        role="dialog"
        aria-modal="true"
        aria-labelledby="portfolio-section-title"
        initial={reducedMotion ? false : { opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reducedMotion ? undefined : { opacity: 0, y: 18, scale: 0.98 }}
        transition={{ duration: reducedMotion ? 0 : 0.34, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-[28px] border border-line bg-white text-ink shadow-[0_28px_90px_rgba(31,39,57,0.2)]"
        style={{ colorScheme: "light" }}
        onPointerDown={(event) => event.stopPropagation()}
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex shrink-0 items-start justify-between gap-4 border-b border-line bg-white px-5 py-4 sm:px-7 sm:py-5">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-signal/20 bg-signal/10 px-3 py-1 text-[10px] font-semibold tracking-[0.16em] text-signal uppercase">
                Section {spec.code}
              </span>
              <span className="text-xs font-medium text-signal">{spec.buildingName}</span>
            </div>
            <h2
              id="portfolio-section-title"
              className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
            >
              {spec.signTitle}
            </h2>
            <p className="mt-1 text-sm text-mist-dim">{spec.subtitle}</p>
          </div>

          <button
            type="button"
            onPointerDown={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onClose();
            }}
            onClick={(event) => {
              event.stopPropagation();
              if (event.detail === 0) onClose();
            }}
            aria-label="Close section and return to the street"
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line bg-panel-2 text-mist transition hover:border-signal hover:bg-white hover:text-signal"
          >
            <X className="size-5" />
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto bg-white px-5 py-6 sm:px-7 sm:py-8">
          <SectionModalContent href={spec.href} />
        </div>

        <footer className="flex shrink-0 items-center justify-between gap-4 border-t border-line bg-panel-2 px-5 py-4 sm:px-7">
          <p className="hidden text-xs text-mist-dim sm:block">
            Close this panel to return to your previous position on the street.
          </p>
          <button
            type="button"
            onPointerDown={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onClose();
            }}
            onClick={(event) => {
              event.stopPropagation();
              if (event.detail === 0) onClose();
            }}
            className="ml-auto rounded-full bg-signal px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-signal-dim"
          >
            Return to the city
          </button>
        </footer>
      </motion.section>
    </motion.div>
  );
}

export function WalkableWorld({
  onEnterSection,
  onExitWorld,
}: {
  onEnterSection: (href: string) => void;
  onExitWorld?: () => void;
}) {
  void onEnterSection;

  const hasFinePointer = useHasFinePointer();
  const reducedMotion = usePrefersReducedMotion();
  const [locked, setLocked] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [selectionArmed, setSelectionArmed] = useState(false);
  const [relockPending, setRelockPending] = useState(false);
  const [lockReady, setLockReady] = useState(true);
  const [pointerLockAvailable, setPointerLockAvailable] = useState<boolean | null>(null);
  const [lockNotice, setLockNotice] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [selectedBuilding, setSelectedBuilding] = useState<SectionBuildingSpec | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [cameraBusy, setCameraBusy] = useState(false);

  const cameraDirectorApiRef = useRef<CameraDirectorApi | null>(null);
  const canvasElementRef = useRef<HTMLCanvasElement | null>(null);
  const closingModalRef = useRef(false);
  const selectionArmTimerRef = useRef<number | null>(null);
  const lockCooldownTimerRef = useRef<number | null>(null);
  const successfulLockRef = useRef(false);

  // A null value means the canvas has not finished its capability check yet.
  // On desktop we still allow the explicit Enter button to make the real
  // request. Only a confirmed missing API or a touch-only device disables it.
  const canUseWalkingControls = hasFinePointer && pointerLockAvailable !== false;

  const clearSelectionArmTimer = useCallback(() => {
    if (selectionArmTimerRef.current !== null) {
      window.clearTimeout(selectionArmTimerRef.current);
      selectionArmTimerRef.current = null;
    }
  }, []);

  const clearLockCooldownTimer = useCallback(() => {
    if (lockCooldownTimerRef.current !== null) {
      window.clearTimeout(lockCooldownTimerRef.current);
      lockCooldownTimerRef.current = null;
    }
  }, []);

  const startLockCooldown = useCallback(
    (duration = 1350) => {
      clearLockCooldownTimer();
      setLockReady(false);
      lockCooldownTimerRef.current = window.setTimeout(() => {
        lockCooldownTimerRef.current = null;
        setLockReady(true);
      }, duration);
    },
    [clearLockCooldownTimer]
  );

  const checkPointerLockAvailability = useCallback(() => {
    if (!hasFinePointer) {
      setPointerLockAvailable(false);
      return false;
    }

    const canvas = canvasElementRef.current;
    if (!canvas) return false;

    // The API check is reliable. A Permissions Policy probe is not used here
    // because embedded preview tools can report a blocked policy even when the
    // same page works normally in its own browser tab. The real request below
    // is the source of truth.
    const available = typeof canvas.requestPointerLock === "function";
    setPointerLockAvailable(available);

    if (!available) {
      setLockNotice(
        "This browser does not support mouse capture. You can still select each building."
      );
    }
    return available;
  }, [hasFinePointer]);

  useEffect(() => {
    if (canvasElementRef.current) checkPointerLockAvailability();
  }, [checkPointerLockAvailability]);

  const armBuildingSelectionSoon = useCallback(() => {
    clearSelectionArmTimer();
    selectionArmTimerRef.current = window.setTimeout(() => {
      selectionArmTimerRef.current = null;
      if (document.pointerLockElement === canvasElementRef.current) {
        setSelectionArmed(true);
      }
    }, 140);
  }, [clearSelectionArmTimer]);

  const handleLockFailure = useCallback(() => {
    setLocked(false);
    setSelectionArmed(false);
    setRelockPending(false);
    setHovered(null);
    closingModalRef.current = false;
    startLockCooldown(900);

    const canvas = canvasElementRef.current;
    const apiExists = Boolean(canvas && typeof canvas.requestPointerLock === "function");

    if (!apiExists) {
      setPointerLockAvailable(false);
      setLockNotice(
        "This browser does not support mouse capture. You can still select each building."
      );
      return;
    }

    // A failed request is often temporary. It can happen when the tab is not
    // focused, the user has just pressed Escape, or the site is running inside
    // a restricted preview frame. Keep walking available and let the user retry.
    setPointerLockAvailable(true);
    setLockNotice(
      successfulLockRef.current
        ? "Walking is paused. Select Resume walking to continue."
        : "Mouse capture was not allowed. Click Enter the city again. If this is a preview window, open the portfolio in a normal browser tab."
    );
  }, [startLockCooldown]);

  const beginPointerLock = useCallback(() => {
    if (!canUseWalkingControls || !lockReady) return false;
    if (document.visibilityState !== "visible") return false;

    const canvas = canvasElementRef.current;
    if (!canvas || !canvas.isConnected) return false;
    if (typeof canvas.requestPointerLock !== "function") {
      setPointerLockAvailable(false);
      setLockNotice(
        "Walking controls are not available here. You can still select each building."
      );
      return false;
    }

    if (document.pointerLockElement === canvas) return true;

    clearSelectionArmTimer();
    setSelectionArmed(false);
    setRelockPending(true);
    setLockNotice(null);

    try {
      canvas.focus({ preventScroll: true });
      const request = canvas.requestPointerLock() as void | Promise<void>;
      if (request && typeof request.catch === "function") {
        void request.catch(handleLockFailure);
      }

      // Do not use a short timeout here. Some browsers show their own mouse
      // capture prompt, and the user may need more than a second to respond.
      // Success and failure are handled by pointerlockchange, pointerlockerror,
      // and the returned promise when the browser provides one.
      return true;
    } catch {
      handleLockFailure();
      return false;
    }
  }, [
    canUseWalkingControls,
    clearSelectionArmTimer,
    handleLockFailure,
    lockReady,
  ]);

  const requestWalkingLock = useCallback(() => {
    if (selectedBuilding || modalOpen || cameraBusy) return;
    if (!lockReady) {
      setLockNotice("The browser needs a moment before walking can resume.");
      return;
    }
    beginPointerLock();
  }, [beginPointerLock, cameraBusy, lockReady, modalOpen, selectedBuilding]);

  useEffect(() => {
    const handlePointerLockChange = () => {
      const isLocked = document.pointerLockElement === canvasElementRef.current;

      if (isLocked) {
        successfulLockRef.current = true;
        setPointerLockAvailable(true);
        clearLockCooldownTimer();
        setLockReady(true);
        setLockNotice(null);
        setLocked(true);
        setHasStarted(true);
        setRelockPending(false);
        closingModalRef.current = false;
        armBuildingSelectionSoon();
        return;
      }

      setLocked(false);
      setSelectionArmed(false);
      setRelockPending(false);
      setHovered(null);
      if (successfulLockRef.current) startLockCooldown();
    };

    document.addEventListener("pointerlockchange", handlePointerLockChange);
    document.addEventListener("pointerlockerror", handleLockFailure);
    return () => {
      document.removeEventListener("pointerlockchange", handlePointerLockChange);
      document.removeEventListener("pointerlockerror", handleLockFailure);
      clearSelectionArmTimer();
      clearLockCooldownTimer();
    };
  }, [
    armBuildingSelectionSoon,
    clearLockCooldownTimer,
    clearSelectionArmTimer,
    handleLockFailure,
    startLockCooldown,
  ]);

  const handleSelectBuilding = useCallback(
    (spec: SectionBuildingSpec) => {
      if (selectedBuilding || cameraBusy || closingModalRef.current) return;

      if (
        canUseWalkingControls &&
        (!locked ||
          !selectionArmed ||
          document.pointerLockElement !== canvasElementRef.current)
      ) {
        return;
      }

      clearSelectionArmTimer();
      setSelectionArmed(false);
      setHovered(null);
      setModalOpen(false);
      setCameraBusy(true);
      setSelectedBuilding(spec);

      if (document.pointerLockElement === canvasElementRef.current) {
        document.exitPointerLock();
      }
    },
    [
      cameraBusy,
      canUseWalkingControls,
      clearSelectionArmTimer,
      locked,
      selectedBuilding,
      selectionArmed,
    ]
  );

  const handleFocusComplete = useCallback(() => {
    setCameraBusy(false);
    setModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    if (closingModalRef.current) return;
    closingModalRef.current = true;

    clearSelectionArmTimer();
    setSelectionArmed(false);
    setHovered(null);
    cameraDirectorApiRef.current?.restoreWalkingPose();
    setModalOpen(false);
    setSelectedBuilding(null);
    setCameraBusy(false);
    setRelockPending(false);
    closingModalRef.current = false;
  }, [clearSelectionArmTimer]);

  const handleReturnComplete = useCallback(() => {
    setCameraBusy(false);
  }, []);

  const handleExitWorld = useCallback(() => {
    if (document.pointerLockElement === canvasElementRef.current) {
      document.exitPointerLock();
    }
    onExitWorld?.();
  }, [onExitWorld]);

  const [line1, noise, into, signalWord] = hero.headline;
  const showInitialIntro =
    canUseWalkingControls && !hasStarted && !selectedBuilding && !modalOpen && !cameraBusy;
  const showResumeOverlay =
    canUseWalkingControls &&
    hasStarted &&
    !locked &&
    !selectedBuilding &&
    !modalOpen &&
    !cameraBusy &&
    !relockPending;
  const buildingInteractionEnabled =
    !selectedBuilding &&
    !cameraBusy &&
    (canUseWalkingControls ? locked && selectionArmed : true);

  return (
    <KeyboardControls map={KEY_MAP}>
      <div className="fixed inset-0 bg-void">
        <Canvas
          shadows
          dpr={[1, 1.25]}
          gl={{ antialias: true, powerPreference: "high-performance" }}
          onCreated={({ gl }) => {
            canvasElementRef.current = gl.domElement;
            gl.domElement.tabIndex = 0;
            gl.outputColorSpace = THREE.SRGBColorSpace;
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.05;
            window.setTimeout(checkPointerLockAvailability, 0);
          }}
        >
          <Scene
            onSelectBuilding={handleSelectBuilding}
            onHoverChange={setHovered}
            focusedBuilding={selectedBuilding}
            cameraBusy={cameraBusy}
            interactionEnabled={buildingInteractionEnabled}
            hasFinePointer={canUseWalkingControls}
            reducedMotion={reducedMotion}
            locked={locked}
            cameraDirectorApiRef={cameraDirectorApiRef}
            onFocusComplete={handleFocusComplete}
            onReturnComplete={handleReturnComplete}
          />
        </Canvas>

        {onExitWorld ? (
          <button
            type="button"
            onClick={handleExitWorld}
            className="fixed top-5 right-5 z-30 inline-flex items-center gap-2 rounded-full border border-line bg-white/90 px-4 py-2.5 text-xs font-semibold text-ink shadow-[0_12px_34px_rgba(31,39,57,0.14)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-signal hover:text-signal"
          >
            <ArrowLeft className="size-4" />
            Plain portfolio
          </button>
        ) : null}

        {canUseWalkingControls && locked && !selectedBuilding && !cameraBusy && (
          <>
            <div className="pointer-events-none fixed top-5 left-5 rounded-xl border border-line bg-white/90 px-4 py-3 text-ink shadow-[0_12px_34px_rgba(31,39,57,0.14)] backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <Building2 className="size-4 text-signal" />
                <span className="font-display text-sm font-semibold">Portfolio City</span>
              </div>
              <p className="mt-1 font-mono text-[9px] tracking-[0.15em] text-mist-dim">
                5 SECTION BUILDINGS · CITY VIEW
              </p>
            </div>

            <div className="pointer-events-none fixed inset-0 flex flex-col items-center justify-center">
              <div className="relative size-4">
                <span className="absolute top-1/2 left-0 h-px w-full bg-ink/80 shadow-[0_0_2px_rgba(255,255,255,0.95)]" />
                <span className="absolute top-0 left-1/2 h-full w-px bg-ink/80 shadow-[0_0_2px_rgba(255,255,255,0.95)]" />
              </div>
              <AnimatePresence>
                {hovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 7 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-[calc(50%+28px)] rounded-full border border-signal/25 bg-white/95 px-4 py-1.5 font-mono text-[10px] tracking-[0.13em] text-signal shadow-[0_10px_28px_rgba(31,39,57,0.14)] backdrop-blur-xl"
                  >
                    SELECT {hovered.toUpperCase()}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="pointer-events-none fixed bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-line bg-white/90 px-4 py-2 font-mono text-[9px] tracking-[0.12em] text-mist shadow-[0_10px_28px_rgba(31,39,57,0.13)] backdrop-blur-xl">
              WASD WALK · SHIFT SPRINT · MOUSE LOOK · SELECT A BUILDING
            </div>
          </>
        )}

        {showInitialIntro && (
          <div className="fixed inset-0 z-10 flex items-center justify-center bg-void/55 px-5 py-8 text-center backdrop-blur-[4px] sm:px-6">
            <div className="w-full max-w-3xl rounded-[2rem] border border-line bg-white/95 px-6 py-8 text-ink shadow-[0_24px_80px_rgba(31,39,57,0.18)] backdrop-blur-xl sm:px-10 sm:py-10">
              <p className="mono-tag text-[11px] text-signal">{hero.eyebrow}</p>
              <h1 className="mx-auto mt-4 max-w-2xl font-display text-3xl leading-tight font-semibold text-balance sm:text-5xl">
                <span className="text-ink">{line1} </span>
                <span className="text-mist-dim line-through">{noise}</span>{" "}
                <span className="text-ink">{into} </span>
                <span className="bg-gradient-to-r from-amber-800 to-amber-950 bg-clip-text text-transparent">
                  {signalWord}
                </span>
              </h1>
              <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-mist">
                Walk through the 3D city, choose a building, and open its section.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={requestWalkingLock}
                  disabled={!lockReady}
                  className="mono-tag flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-xs text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-signal disabled:cursor-wait disabled:opacity-55"
                >
                  <MousePointerClick className="size-3.5" />
                  {lockReady ? "Enter the city" : "Ready in a moment"}
                </button>
                <div className="font-mono text-[9px] tracking-[0.14em] text-mist-dim">
                  WASD AND MOUSE · SHIFT TO SPRINT
                </div>
              </div>
              {lockNotice ? (
                <p className="mx-auto mt-4 max-w-xl rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-800">
                  {lockNotice}
                </p>
              ) : null}
            </div>
          </div>
        )}

        {showResumeOverlay && (
          <div className="fixed inset-0 z-10 flex items-center justify-center bg-void/45 p-6 backdrop-blur-sm">
            <div className="w-full max-w-sm rounded-[1.5rem] border border-line bg-white/95 p-5 text-center text-ink shadow-[0_22px_70px_rgba(31,39,57,0.18)] backdrop-blur-xl">
              <p className="text-sm leading-6 text-mist">
                {lockNotice ?? "Walking is paused."}
              </p>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-center">
                <button
                  type="button"
                  onClick={requestWalkingLock}
                  disabled={!lockReady}
                  className="mono-tag inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-xs text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-signal disabled:cursor-wait disabled:opacity-55"
                >
                  <MousePointerClick className="size-3.5" />
                  {lockReady ? "Resume walking" : "Resume in a moment"}
                </button>
                {onExitWorld ? (
                  <button
                    type="button"
                    onClick={handleExitWorld}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-white px-5 py-3 text-xs font-semibold text-ink transition hover:-translate-y-0.5 hover:border-signal hover:text-signal"
                  >
                    <ArrowLeft className="size-3.5" />
                    Plain portfolio
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        )}

        {(!hasFinePointer || pointerLockAvailable === false) &&
          !selectedBuilding &&
          !modalOpen &&
          !cameraBusy && (
          <div className="fixed bottom-6 left-1/2 z-10 w-[min(92vw,560px)] -translate-x-1/2 rounded-2xl border border-line bg-white/95 px-4 py-3 text-center text-[10px] leading-5 text-mist shadow-[0_12px_34px_rgba(31,39,57,0.14)] backdrop-blur-xl">
            <span className="inline-flex items-center gap-2">
              <Smartphone className="size-4 shrink-0 text-signal" />
              {hasFinePointer
                ? lockNotice ?? "Select a building to browse the city."
                : "Tap a building or the center sign to open its section."}
            </span>
          </div>
        )}

        <AnimatePresence>
          {modalOpen && selectedBuilding ? (
            <SectionModal
              key={selectedBuilding.href}
              spec={selectedBuilding}
              onClose={handleCloseModal}
              reducedMotion={reducedMotion}
            />
          ) : null}
        </AnimatePresence>
      </div>
    </KeyboardControls>
  );
}

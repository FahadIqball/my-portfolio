import React from "react";
import {
  siTypescript,
  siJavascript,
  siHtml5,
  siCss,
  siReact,
  siExpo,
  siRedux,
  siFirebase,
  siSupabase,
  siGit,
  siGithub,
  siAndroidstudio,
  siPostman,
} from "simple-icons";
import { zustandPath, reactNativePath } from "./customIcons";

interface TechIconProps {
  slug: string;
  size?: number;
}

export default function TechIcon({ slug, size = 20 }: TechIconProps) {
  const normalizedSlug = slug.toLowerCase().replace(/[^a-z0-9]/g, "");

  const icons: Record<string, { path: string; viewBox?: string }> = {
    typescript: {
      viewBox: "0 0 24 24",
      path: siTypescript.path,
    },
    javascript: {
      viewBox: "0 0 24 24",
      path: siJavascript.path,
    },
    html5: {
      viewBox: "0 0 24 24",
      path: siHtml5.path,
    },
    html: {
      viewBox: "0 0 24 24",
      path: siHtml5.path,
    },
    css3: {
      viewBox: "0 0 24 24",
      path: siCss.path,
    },
    css: {
      viewBox: "0 0 24 24",
      path: siCss.path,
    },
    react: {
      viewBox: "0 0 24 24",
      path: siReact.path,
    },
    reactnative: {
      viewBox: "0 0 128 128",
      path: reactNativePath,
    },
    expo: {
      viewBox: "0 0 24 24",
      path: siExpo.path,
    },
    redux: {
      viewBox: "0 0 24 24",
      path: siRedux.path,
    },
    zustand: {
      viewBox: "0 0 128 128",
      path: zustandPath,
    },
    firebase: {
      viewBox: "0 0 24 24",
      path: siFirebase.path,
    },
    supabase: {
      viewBox: "0 0 24 24",
      path: siSupabase.path,
    },
    git: {
      viewBox: "0 0 24 24",
      path: siGit.path,
    },
    github: {
      viewBox: "0 0 24 24",
      path: siGithub.path,
    },
    androidstudio: {
      viewBox: "0 0 24 24",
      path: siAndroidstudio.path,
    },
    postman: {
      viewBox: "0 0 24 24",
      path: siPostman.path,
    },
    linkedin: {
      viewBox: "0 0 16 16",
      path: "M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z",
    },
  };

  const icon = icons[normalizedSlug] || icons[slug] || icons.typescript;
  const viewBox = icon.viewBox || "0 0 24 24";

  return (
    <svg
      role="img"
      viewBox={viewBox}
      width={size}
      height={size}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={icon.path} />
    </svg>
  );
}

import type { MetadataRoute } from "next";
import { site } from "@/data/portfolio";
import { basePath } from "@/lib/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mahbub Ali - Academic and Research Portfolio",
    short_name: "Mahbub Ali",
    description: site.description,
    start_url: basePath ? `${basePath}/` : "/",
    display: "standalone",
    background_color: "#f3f5f8",
    theme_color: "#0e2a4a",
  };
}

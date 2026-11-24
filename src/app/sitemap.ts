import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const routes = [
  "",
  "/about",
  "/villas",
  "/villas/model-villa",
  "/villas/personalise",
  "/investment",
  "/investment/rental-income",
  "/investment/calculator",
  "/hotel",
  "/gallery",
  "/location",
  "/testimonials",
  "/contact",
  "/faq",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${site.url}${route}`,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}

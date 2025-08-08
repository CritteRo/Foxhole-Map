import { RenderMode, ServerRoute } from "@angular/ssr";

export const serverRoutes: ServerRoute[] = [
  {
    path: "",
    renderMode: RenderMode.Client,
  },
  {
    path: "test-ssr",
    renderMode: RenderMode.Server,
  },
  {
    path: "**",
    renderMode: RenderMode.Server,
  },
];

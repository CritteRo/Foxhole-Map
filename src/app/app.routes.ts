import { Routes } from "@angular/router";

import { MapComponent } from "./map/map.component";
import { TestComponent } from "./test/test.component";

export const routes: Routes = [
  {
    path: "",
    component: MapComponent,
  },
  {
    path: "test-ssr",
    component: TestComponent,
  },
  {
    path: "**",
    redirectTo: "",
  },
];

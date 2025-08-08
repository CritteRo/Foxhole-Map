import { Component, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, FormsModule],
  templateUrl: "./app.component.html",
  standalone: true,
  styleUrl: "./app.component.css",
})
export class AppComponent {}

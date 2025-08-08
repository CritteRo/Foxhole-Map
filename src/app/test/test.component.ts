import { Component, inject, OnInit } from "@angular/core";
import { TestService } from "../../services/test.service";

@Component({
  selector: "app-test",
  templateUrl: "./test.component.html",
  styleUrls: ["./test.component.css"],
})
export class TestComponent implements OnInit {
  message: string = "";
  private testService = inject(TestService);

  ngOnInit() {
    this.testService.getMessage().subscribe({
      next: (response) => {
        this.message = response.message;
      },
      error: (error) => {
        console.error("Error fetching message:", error);
      },
    });
  }

  getMessage() {
    return this.message;
  }
}

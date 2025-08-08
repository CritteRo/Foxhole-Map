import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

interface Message {
  message: string;
}

@Injectable({
  providedIn: "root",
})
export class TestService {
  private http = inject(HttpClient);

  getMessage(): Observable<Message> {
    return this.http.get<Message>("/api/test");
  }
}

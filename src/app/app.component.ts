import { NewsletterService } from "./services/newsletter.service";
import { Component } from "@angular/core";
import { SwPush } from "../../node_modules/@angular/service-worker";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [NewsletterService]
})
export class AppComponent {
  title = "app";

  readonly VAPID_PUBLIC_KEY =
    "BO_Uecz4HFlwgBWKtScLqNFRoaOa7sNUy9yOhEr6PvX25SAQXRQ33ehOo8N11qE3VvDXhJ7-1RxJSkueEr_qY10";

  constructor(
    private swPush: SwPush,
    private newsletterService: NewsletterService
  ) {}

  subscribeToNotifications() {
    this.swPush
      .requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
      })
      .then(sub => this.newsletterService.addPushSubscriber(sub).subscribe())
      .catch(err => console.error("Could not subscribe to notifications", err));
  }

  sendTest() {
    this.newsletterService.send().subscribe();
  }
}

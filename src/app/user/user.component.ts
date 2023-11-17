import { CommonModule } from "@angular/common";
import { AppService } from "../app.service";
import { RouterOutlet } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { Component, OnInit, inject, signal } from "@angular/core";
import { IUser } from "../types/user.type";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule],
  templateUrl: './user.component.html',
  providers: [AppService]
})
export class UserComponent implements OnInit {
  userData = signal<IUser[]>([])
  private appService: AppService = inject(AppService)

  ngOnInit(): void {
      this.appService.getUser().subscribe((users) => {
        this.userData.set(users)
      })
  }
}

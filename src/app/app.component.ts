import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AppService } from './app.service';
import { IUser } from './types/user.type';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from './user/user.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, UserComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [AppService]
})
export class AppComponent implements OnInit {
  private appService: AppService = inject(AppService)

  userData = signal<IUser[]>([])

  ngOnInit(): void {
      this.appService.getUser().subscribe((users) => {
        this.userData.set(users)
      })
  }

  postUser() {
    const mockedUser: IUser = {
      name: "User test",
      email: "user.test@it-objects.pt",
      age: 12,
      techs: ["test"]
    }

    this.appService.postUser(mockedUser).subscribe((user) => {
      this.userData.update(value => [...value, user])
    })
  }
}

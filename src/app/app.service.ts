import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import { IUser } from "./types/user.type";

@Injectable()
export class AppService {

  constructor(private http: HttpClient) { }

  getUser() {
    return this.http.get<IUser[]>("/api/users")
  }

  postUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>("/api/users", user)
  }
}

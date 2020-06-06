import { CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";
import { Store, Select } from "@ngxs/store";
import { UserStateModel } from "../model/me";
import { UserState } from "../state/user.state";
import { Observable } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
import { Router } from "@angular/router";
@Injectable({ providedIn: "root" })
export class OnlyLoggedInUserGuard implements CanActivate {
  //  @Select((state) => state.user) user$: Observable<UserStateModel>;
  constructor(private router: Router, private store: Store) { }
  canActivate(): Observable<boolean> {

    return this.store.selectOnce<number>(s => s.user.id).pipe(
      map(s => {
        console.log(s);
        if (s > 0) {

          return true;
        } else {
          this.router.navigate(["/login"]);
        }
      })
      // map((user) => {
      //   console.log(user);
      //   if (user.id !== null) {
      //     console.log(user);
      //     return true;
      //   } else {
      //     this.router.navigate(["/login"]);
      //   }
      // })
    );
  }
}

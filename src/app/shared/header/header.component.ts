import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { filter, map, takeUntil } from "rxjs/operators";
import { User } from "src/app/core/models/user";
import { UserService } from "src/app/core/services/user.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public userEmail: string = undefined;
  private ngUnsubscribe: Subject<any> = new Subject();
  constructor(private userService: UserService) {}

  public ngOnInit(): void {
    this.userService
      .getCurrentUser$()
      .pipe(
        takeUntil(this.ngUnsubscribe),
        filter((user: User) => !!user),
        map((user: User) => user.email)
      )
      .subscribe((email: string) => (this.userEmail = email));
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

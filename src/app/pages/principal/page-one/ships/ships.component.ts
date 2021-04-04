import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import * as StarshipsActions from "../../../../core/actions/starships.actions";

@Component({
  selector: "app-ships",
  templateUrl: "./ships.component.html",
  styleUrls: ["./ships.component.scss"],
})
export class ShipsComponent implements OnInit {
  public dataList: any = [];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(StarshipsActions.createStarshipsListAction());
  }
}

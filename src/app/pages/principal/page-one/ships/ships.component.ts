import { Component, OnInit } from "@angular/core";
import { first } from "rxjs/operators";
import { Starship } from "src/app/core/models/starship";
import { ShipsService } from "src/app/core/services/ships.service";

@Component({
  selector: "app-ships",
  templateUrl: "./ships.component.html",
  styleUrls: ["./ships.component.scss"],
})
export class ShipsComponent implements OnInit {
  public dataList: any = [];

  constructor(private shipsService: ShipsService) {}

  ngOnInit(): void {
    this.shipsService
      .getShips()
      .pipe(first())
      .subscribe((response: any) => {
        this.dataList = response;
      });
  }
}

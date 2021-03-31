import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { first } from "rxjs/operators";
import { Starship } from "src/app/core/models/starship";
import { ShipsService } from "src/app/core/services/ships.service";
declare var $: any;

@Component({
  selector: "ships-details",
  templateUrl: "./ships-details.component.html",
  styleUrls: ["./ships-details.component.scss"],
})
export class ShipsDetailsComponent implements OnInit, OnChanges {
  @Input() dataList: any;
  public starShipList: Starship[];
  public config: any;
  public shipId: string = "";
  public url: string = "";
  // Modal
  public titleDetails: string = "";
  public modelDetails: string = "";
  public starship_class: string = "";

  constructor(private shipsService: ShipsService) {}

  public ngOnInit(): void {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 0,
    };
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (!changes.dataList.isFirstChange()) {
      this.starShipList = this.dataList.results;
      this.config = {
        itemsPerPage: this.starShipList.length,
        currentPage: 1,
        totalItems: this.dataList.count,
      };
    }
  }

  public updateStarShipList() {
    this.shipsService
      .getShips(this.config.currentPage)
      .pipe(first())
      .subscribe((response: any) => {
        this.starShipList = response.results;
      });
  }

  public getStarshipId(url) {
    this.shipId = url.slice(0, -1);
    const urlImage = `${this.shipId}.jpg`;
    return urlImage !== "";
  }

  public pageChanged(event) {
    this.config.currentPage = event;
    this.updateStarShipList();
  }

  public openDetails(details) {
    $("#exampleModal").modal("show");
    this.titleDetails = details.name;
    this.modelDetails = details.model;
    this.starship_class = details.starship_class;
  }
}

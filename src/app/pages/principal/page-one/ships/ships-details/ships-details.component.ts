import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { Starship } from "src/app/core/models/starship";
import StarshipsState from "../../../../../core/states/starships.state";
import * as StarshipsActions from "../../../../../core/actions/starships.actions";
import { Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";

declare var $: any;

@Component({
  selector: "ships-details",
  templateUrl: "./ships-details.component.html",
  styleUrls: ["./ships-details.component.scss"],
})
export class ShipsDetailsComponent implements OnInit, OnDestroy {
  public starShipList: Starship[];
  public config: any;
  public shipId: string = "";
  public url: string = "";
  // Modal
  public titleDetails: string = "";
  public modelDetails: string = "";
  public starship_class: string = "";

  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 0,
    };
    this.store
      .pipe(
        takeUntil(this.ngUnsubscribe),
        filter((data: any) => !!data)
      )
      .subscribe((data: any) => {
        const starshipsState: StarshipsState = data.starships;
        this.updateStarShipList(starshipsState);
      });
  }

  public updateStarShipList(starshipsState: StarshipsState) {
    this.starShipList = starshipsState.starShipList;
    this.config = {
      itemsPerPage: starshipsState.itemsPerPage,
      currentPage: starshipsState.currentPage,
      totalItems: starshipsState.totalItems,
    };
  }

  public getStarshipId(url) {
    // this.shipId = url.slice(0, -1);
    // const urlImage = `${this.shipId}.jpg`;
    // return urlImage !== "";
  }

  public pageChanged(event: number) {
    this.store.dispatch(
      StarshipsActions.updateStarshipsListAction({ pageNumber: event })
    );
  }

  public openDetails(details) {
    $("#exampleModal").modal("show");
    this.titleDetails = details.name;
    this.modelDetails = details.model;
    this.starship_class = details.starship_class;
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

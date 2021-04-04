import { Starship } from "../models/starship";

export default class StarshipsState {
  public itemsPerPage: number;
  public currentPage: number;
  public totalItems: number;
  public starShipList: Array<Starship>;
}

export const initializeState = (): StarshipsState => {
  return {
    itemsPerPage: 0,
    currentPage: 0,
    totalItems: 0,
    starShipList: Array<Starship>(),
  };
};

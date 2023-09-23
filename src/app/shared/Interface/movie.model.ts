import { CostModel } from "./cost.model";

export interface Movie{
    id: string;
    name: string;
    releaseDate: Date;
    costs: CostModel[];
}
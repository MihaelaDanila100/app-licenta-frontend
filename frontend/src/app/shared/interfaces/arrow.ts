import { Line } from "./line";

export interface Arrow extends Line {
    x: number,
    y: number, 
    pointerLength: number,
    pointerWidth: number,
    fillColor: string
}
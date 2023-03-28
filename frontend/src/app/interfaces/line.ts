export interface Line {
    points: number[],
    stroke: string,
    showControls: boolean,
    left?: number,
    top?: number,
    scale?: number,
    strokeWidth?: number
}
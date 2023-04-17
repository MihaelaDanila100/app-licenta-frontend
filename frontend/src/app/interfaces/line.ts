export interface Line {
    points: any[],
    stroke: string,
    showControls: boolean,
    left?: number,
    top?: number,
    scale?: number,
    strokeWidth?: number
}

export interface DashedLine extends Line {
    dashes: number[]
}
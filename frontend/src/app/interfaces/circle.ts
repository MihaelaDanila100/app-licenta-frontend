export interface Circle {
    radius: number,
    showControls: boolean,
    stroke?: string,
    fill?: string,
    top?: number,
    left?: number
}

export interface DashedCircle extends Circle {
    dashes: number[]
}
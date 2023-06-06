export interface Ellipse {
    rx: number,
    ry: number,
    showControls: boolean,
    fill?: string,
    stroke?: string,
    top?: number,
    left?: number
}

export interface DashedEllipse extends Ellipse {
    dashes: number[]
}
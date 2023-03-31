export interface Rectangle {
    width: any,
    height: any,
    showControls: boolean,
    fill?: string,
    stroke?: string,
    top?: number,
    left?: number,
    selectable?: boolean
}

export interface DashesRectangle extends Rectangle {
    dashes: number[]
}
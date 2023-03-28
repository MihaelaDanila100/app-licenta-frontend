export interface Rectangle {
    width: any,
    height: any,
    showControls: boolean,
    fill?: string,
    stroke?: string
}

export interface DashesRectangle extends Rectangle {
    dashes: number[]
}
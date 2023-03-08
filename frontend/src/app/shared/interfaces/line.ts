export interface Line {
    points: number[],
    strokeColor: string,
    strokeWidth: number,
    lineCap: any,
    lineJoin: any,
    tension: number,
    dash?: number[]
}
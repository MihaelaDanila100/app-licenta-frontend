export const Shapes = {
    rectangle: {
        width: 60,
        height: 30,
        showControls: false,
        top: 2
    },
    dashedRectangle: {
        width: 60,
        height: 30,
        showControls: false,
        dashes: [3, 3],
        top: 2,
        left: 80
    },
    line: {
        points: [0, 0, 30, 30],
        stroke: 'black',
        top: 2,
        left: 160,
        scale: 2.5,
        strokeWidth: 1,
        showControls: false
    }
}
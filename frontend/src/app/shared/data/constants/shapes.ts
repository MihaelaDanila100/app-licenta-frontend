export const Shapes = {
    rectangle: {
        width: 60,
        height: 30,
        showControls: false,
        top: 2,
        selectable: false
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
    },
    circle: {
        radius: 20,
        showControls: false,
        top: 53,
        left: 165,
        fill: 'white'
    },
    dashedCircle: {
        radius: 20,
        showControls: false,
        dashes: [3, 3],
        top: 53,
        left: 8
    },
    dashedLine: {
        points: [0, 0, 35, 35],
        stroke: 'black',
        top: 55,
        left: 95,
        scale: 2.5,
        strokeWidth: 1,
        showControls: false,
        dashes: [3, 3]
    },
    ellipse: {
        rx: 30,
        ry: 15,
        showControls: false,
        top: 115,
        left: 2
    },
    dashedEllipse: {
        rx: 30,
        ry: 15,
        showControls: false,
        top: 115,
        left: 85,
        dashes: [3, 3]
    },
    text: {
        value: 'text',
        fontStyle: 'arial black',
        left: 100,
        top: 100,
        showControls: false,
        fontSize: 20,
        fontWeight: 'normal'
    }
}
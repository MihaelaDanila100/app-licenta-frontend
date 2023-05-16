export const Edges = {
    line: {
        points: [0, 0, 30, 30],
        stroke: 'black',
        top: 5,
        left: 5,
        scale: 2.5,
        strokeWidth: 1,
        showControls: false,
        fill: 'red'
    },
    lineWithCosts: {
        line: {
            points: [0, 0, 30, 30],
            stroke: 'black',
            top: 5,
            left: 55,
            scale: 2.5,
            strokeWidth: 1,
            showControls: false,
            fill: 'red'
        },
        text: {
            value: 'cost',
            fontStyle: 'bodoni mt',
            left: 68,
            top: 5,
            showControls: false,
            fontSize: 11,
            fontWeight: 'normal',
            borderColor: 'red'
        }
    },
    arrowLine: {
        points: [0, 0, 30, 30],
        stroke: 'black',
        top: 50,
        left: 5,
        scale: 2.5,
        strokeWidth: 1,
        showControls: false,
        fill: 'red'
    }
}
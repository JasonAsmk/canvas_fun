//constants
var N = 12;
var step = 2*Math.PI/N;
var H = 600;
var W = 600;

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var points = [];

function calculatePoints(){
    points.push([0,1]);
    var x,y;
    for(var i = 1; i < N; i++){
        x = points[i-1][0];
        y = points[i-1][1];

        //according to a 2D rotation Matrix
        points.push([
            Math.cos(step)*x-Math.sin(step)*y,
            Math.sin(step)*x+Math.cos(step)*y
        ]);
    }
}

function scale(factor){
    for(var i = 0; i < N ; i++){
        points[i] = points[i].map((x)=>x*factor);
    }
}

function translate(offset_x,offset_y){
    for(var i = 0; i < N ; i++){
        points[i] = [
            points[i][0] + offset_x,
            points[i][1] + offset_y
        ];
    }
}
function draw(){
    ctx.beginPath();
    ctx.lineWidth=4;
    ctx.strokeStyle='white';
    ctx.moveTo(...points[0]);
    for(var i = 1; i<N; i++){
        ctx.lineTo(...points[i])
    }
    ctx.lineTo(...points[0]);
    ctx.stroke();
}

function render(){
    calculatePoints();
    scale(Math.min(H/3,W/3));
    translate(W/2,H/2);
    draw();
}

render();

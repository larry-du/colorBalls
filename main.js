

const myCanvas = document.querySelector("#myCanvas");
const ctx = myCanvas.getContext("2d");
const inputNumber = document.querySelector(".inputNumber");
const startButton = document.querySelector(".start");
const stopButton = document.querySelector(".stop");
const clearButton = document.querySelector(".clear");

let balls = [];
let keyNumber = 0;
let started = false;

function initCanvas(){
    myCanvas.width = innerWidth;
    myCanvas.height = innerHeight-300;
}
function draw(ballX,ballY,radius,start,full,color){
    ctx.beginPath();
    ctx.arc(ballX,ballY,radius,start,full);
    ctx.fillStyle= color;
    ctx.fill();
    setTimeout(()=>{
        clear();
    },0)
}
function clear(){
    ctx.clearRect(0,0,innerWidth,innerHeight);
}

function initBall(keyNumber){
    Array(keyNumber).fill(null).forEach(()=>{
        const size = random(10,40);
        const color = `hsl(${random(100,255)}, ${random(1,100)}%, ${random(1,100)}%)`
        const ball = {
            coordinateX:random(size,myCanvas.width- size),
            coordinateY:random(size,myCanvas.height- size),
            radius:10,
            start:0,
            circle: 2*Math.PI,
            color,
            edgeOfX:true,
            edgeOfY:true
        }
        balls = [...balls,ball];
    })
}


function loop(){
    if(!started) return
    balls.forEach((ball)=>{
        if(ball.coordinateX + ball.radius >= myCanvas.width) ball.edgeOfX =true;
        if(ball.coordinateY + ball.radius >= myCanvas.height) ball.edgeOfY =true;
        if(ball.coordinateX < ball.radius) ball.edgeOfX = false;
        if(ball.coordinateY < ball.radius) ball.edgeOfY = false;
        const directX = ball.edgeOfX ? ball.coordinateX-=5 :ball.coordinateX+=5;
        const directY = ball.edgeOfY ? ball.coordinateY-=5 :ball.coordinateY+=5;
        draw(directX, directY, ball.radius, ball.start, ball.circle, ball.color);
    })
    requestAnimationFrame(loop);
}

function random(min, max) {
    return Math.floor(Math.random()*(max-min)) + min;
  }

initCanvas();


startButton.addEventListener("click",async ()=>{
    if(!keyNumber) return alert("請先輸入正整數")
    if(started) return
    started = true;
    balls = [];
    await initBall(keyNumber)
    await loop();
})
stopButton.addEventListener("click",()=>started = false)
clearButton.addEventListener("click",()=>{
    started = false;
    balls = [];
    clear();
})

inputNumber.addEventListener("input",(e)=>{
    if(e.target.value < 0){
        e.target.value = 0;
        return alert ("輸入正整數");
    } 
    keyNumber = Number(e.target.value);
})


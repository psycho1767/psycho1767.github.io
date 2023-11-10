const cvs = document.getElementById('snake');
const ctx = cvs.getContext('2d');

const box = 32;

const ground = new Image()
ground.src="./img/ground.png"

const foodimg = new Image()
foodimg.src="./img/food.png"

const dead = new Audio()
const eat = new Audio()
const left = new Audio()
const right = new Audio()
const up = new Audio()
const down = new Audio()

dead.src = './audio/dead.mp3'
eat.src = './audio/eat.mp3'
left.src = './audio/left.mp3'
up.src = './audio/up.mp3'
right.src = './audio/right.mp3'
down.src = './audio/down.mp3'

let snake = []

snake[0] = {
    x: 9*box,
    y: 10*box
}

let food = {
    x:Math.floor(Math.random()*17+1)*box,
    y:Math.floor(Math.random()*15+3)*box
}

let score = 0;

let d;

document.addEventListener('keydown', (e)=>{
    let code = e.keyCode
    if(code == 37) {
        d = 'LEFT'
        left.play()
    }
    else if(code == 38){
        d = 'UP'
        up.play()
    }
    else if(code == 39){
        d = 'RIGHT'
        right.play()
    }
    else if(code == 40){
        d = 'DOWN'
        down.play()
    }
    else{
        d = ''
    }
})

let round = 0;

function draw(){
    ctx.drawImage(ground, 0,0);

    
    ctx.drawImage(foodimg,food.x,food.y)
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0)? "green" : 'white'
        ctx.fillRect(snake[i].x,snake[i].y,box,box)
        
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box)
    }

    ctx.fillStyle = 'white'
    ctx.font = '45px changa'
    ctx.fillText(score , 2*box ,1.6*box)

    let snakeX = snake[0].x
    let snakeY = snake[0].y

    if(d == 'LEFT')
        snakeX -=box; 
    if(d == 'UP') 
        snakeY -=box;
    if(d == 'RIGHT') 
        snakeX +=box;
    if(d == 'DOWN') 
        snakeY +=box;

    
    let newHead = {
        x: snakeX,
        y: snakeY
    }
    
    if(newHead.x == food.x && newHead.y == food.y){
        score++
        setTimeout(() => {
            eat.play()
        }, speed);
        food = {
            x:Math.floor(Math.random()*17+1)*box,
            y:Math.floor(Math.random()*15+3)*box
        }    
    }
    else{
        snake.pop()
    }
    
    function endgame(head , snakelist){
        for (let i = 0; i < snakelist.length; i++) {
            if(head.x == snakelist [i].x && head.y == snakelist[i].y){
                return true
            }
        }
        return false
    }
    
    if(newHead.x ==  0 || newHead.x == box*18 || newHead.y == 2*box || newHead.y == box*18 || endgame(newHead,snake)){
        clearInterval(game)
        dead.play()
    }
    snake.unshift(newHead)

    

}

let speed = 150
let game = setInterval(draw,speed)

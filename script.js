/* Initial Data */

let screen = document.querySelector('#tela'); // Seleciona a tela, mas não o elemento dentro dele
let currentColor = 'black';
let ctx = screen.getContext('2d'); // Pega o elemento do canvas
let canDraw = false;
let mouseX = 0;
let mouseY = 0;


/* Events */

// Todas as cores virão uma array e faço um loop em cada, modificando-os. Item = Cada cor
document.querySelectorAll('.colorArea .color').forEach(item => {
    item.addEventListener('click', colorClickEvent)
})

screen.addEventListener('mousedown', mouseDownEvent); // Quando clicar na tela;
screen.addEventListener('mousemove', mouseMoveEvent);
screen.addEventListener('mouseup', mouseUpEvent);


document.querySelector('.clear').addEventListener('click', clearScreen)


/* 
Passo a passo para desenha no Canvas
- Quando o click do mouse ABAIXAR, ative o modo desenho.
- Quando o mouse se MOVER, se o modo desenho estiver ativado, desenhe.
- Quando o click do mouse SOLTAR, desative o modo desenho.
*/


/* Functions */ 

function colorClickEvent(e) {
    let color = e.target.getAttribute('data-color');
    currentColor = color;

    document.querySelector('.color.active').classList.remove('active'); // Removendo do item antigo
    e.target.classList.add('active'); // Adiciona no item clicado
}


function mouseDownEvent(e) {
    canDraw = true;
    mouseX = e.pageX - screen.offsetLeft;
    mouseY = e.pageY - screen.offsetTop;
}
function mouseMoveEvent(e) {
    // Verifico se posso desenhar
    if (canDraw) {
        draw(e.pageX, e.pageY)
    }


}
function mouseUpEvent() {
    canDraw = false;

}

function draw(x, y) {
    let pointX = x - screen.offsetLeft;
    let pointY = y - screen.offsetTop;

    // Desenhar

    ctx.beginPath();  // Começa o caminho
    ctx.lineWidth = 5; // Largura da linha
    ctx.lineJoin = "round"; // Formato de bola
    ctx.moveTo(mouseX, mouseY); // Move o cursor para as posições iniciais
    ctx.lineTo(pointX, pointY); // Desenha até os ultimo pontos
    ctx.closePath(); // Fecha o caminho
    ctx.strokeStyle = currentColor; // Escolhe a cor
    ctx.stroke(); // Finaliza 

     // Salva a posição atual

    mouseX = pointX;
    mouseY = pointY;

   
}

function clearScreen() {
    ctx.setTransform(1, 0, 0, 1, 0, 0); // Zera o cursor e o desenho que foi feito
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Limpa tudo do 0 até o fim da width e height
}
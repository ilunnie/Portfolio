var picture = document.createElement('canvas');
picture.width = window.innerWidth;
picture.height = window.innerHeight;
var context = picture.getContext('2d');
picture.className = "picture"
document.body.appendChild(picture);
var colors = ["#DD3DF2", "#0528F2", "#05C7F2", "#DCF238"]
var timer;
var X;
var Y;
var Xold;
var Yold;
var size;
var gradient;

var isSettingUp = false;
var drawCheckbox = document.getElementById("drawing");
var slideCheckBox = document.getElementById("start_paint");
var sizeRange = document.getElementById("size");

slideCheckBox.addEventListener("mouseover", function () {
    isSettingUp = true;
});

slideCheckBox.addEventListener("mouseout", function () {
    isSettingUp = false;
});

sizeRange.addEventListener("mouseover", function () {
    isSettingUp = true;
});

sizeRange.addEventListener("mouseout", function () {
    isSettingUp = false;
});

// Função para pegar o tamanho do pincel
sizeRange.addEventListener("input", function () {
    size = sizeRange.value;
});

drawCheckbox.addEventListener("change", function () {
    var contact_me = document.getElementsByClassName("contact_me")
    if (drawCheckbox.checked) {
        sizeRange.style.display = "block";
        for (var i = 0; i < contact_me.length; i++) {
            contact_me[i].style.zIndex = 0;
        }
        picture.style.zIndex = 1;
    } else {
        sizeRange.style.display = "none";
        for (var i = 0; i < contact_me.length; i++) {
            contact_me[i].style.zIndex = 2;
        }
        picture.style.zIndex = 0;
    }
});

document.addEventListener("mousedown", function (event) {
    // Verifica se o checkbox está marcado
    if (drawCheckbox.checked && !isSettingUp) {
        if (event.button == 0) {
            gradient = picture.getContext("2d").createLinearGradient(0, 0, picture.width, 0);
            for (var i = 0; i < colors.length; i++) {
                gradient.addColorStop(i / (colors.length - 1), colors[i]);
            }

            // Desenha um ponto na posição atual do mouse
            picture.getContext("2d").beginPath();
            picture.getContext("2d").arc(X, Y, size / 2, 0, 2 * Math.PI);
            picture.getContext("2d").fillStyle = gradient;
            picture.getContext("2d").fill();

            // Reseta para uma nova linha
            Xold = X;
            Yold = Y;
            picture.getContext("2d").beginPath();
            picture.getContext("2d").moveTo(X, Y);

            timer = setInterval(function () {
                if (X != Xold && Y != Yold) {
                    var midX = (X + Xold) / 2;
                    var midY = (Y + Yold) / 2;
                    picture.getContext("2d").quadraticCurveTo(Xold, Yold, midX, midY);
                    picture.getContext("2d").lineCap = "round";
                    picture.getContext("2d").lineWidth = size;
                    picture.getContext("2d").strokeStyle = gradient;
                    picture.getContext("2d").stroke();
                    Xold = X;
                    Yold = Y;
                }
            }, 50);
        }
    }
});

document.addEventListener("mousemove", function (event) {
    if (event.button == 0) {
        X = event.clientX;
        Y = event.clientY;
    }
});

document.addEventListener("mouseup", function (event) {
    if (event.button == 0) {
        clearInterval(timer);
    }
});

document.addEventListener("wheel", function (event) {
    if (drawCheckbox.checked) {
        event.preventDefault();
        var currentValue = parseInt(sizeRange.value);
        var newValue = currentValue + (event.deltaY > 0 ? -10 : 10);
        sizeRange.value = newValue;
        size = sizeRange.value;
    }
}, { passive: false });
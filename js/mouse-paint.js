var circle = document.createElement("div");
circle.id = "mouse-paint"
circle.style.position = "fixed";
circle.style.display = "none"
circle.style.border = "1px solid white";
circle.style.borderRadius = "50%";
circle.style.pointerEvents = "none";
document.body.appendChild(circle);

var drawCheckbox = document.getElementById("drawing");
var sizeRange = document.getElementById("size");

var rangeInput = document.getElementById("myRange");

drawCheckbox.addEventListener("change", function () {
    if (drawCheckbox.checked) {
        var size = sizeRange.value;
        circle.style.width = size + "px";
        circle.style.height = size + "px";
        circle.style.display = "block";
        document.body.style.cursor = 'none';
    } else {
        circle.style.display = "none";
        document.body.style.cursor = 'auto';
    }
});

sizeRange.addEventListener("input", function () {
    var size = sizeRange.value;
    circle.style.width = size + "px";
    circle.style.height = size + "px";
});

document.addEventListener("mousemove", function (event) {
    var size = sizeRange.value;
    circle.style.left = event.clientX - size / 2 + "px";
    circle.style.top = event.clientY - size / 2 + "px";
});

document.addEventListener("wheel", function (event) {
    var size = sizeRange.value;
    circle.style.width = size + "px";
    circle.style.height = size + "px";
});

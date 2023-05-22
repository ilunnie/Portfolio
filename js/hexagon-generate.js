var background = document.createElement('div');
background.className = 'background';

var curser = document.createElement('div');
curser.className = 'curser'
background.append(curser);

for (var i = 0; i < 20; i++) {
    var row = document.createElement('div');
    row.className = 'row';

    for (var j = 0; j < 20; j++) {
        var hexagon = document.createElement('div');
        hexagon.className = 'hexagon';
        row.appendChild(hexagon);
    }

    background.appendChild(row);
}

document.body.appendChild(background);

setInterval(function() {
    for (var i = 0; i < 20; i++) {
        var row = document.getElementsByClassName('row')[i];
       
        for (var j = 0; j < 20; j++) {
            var hexagon = row.getElementsByClassName('hexagon')[j];
            row.style.top = (i * hexagon.getBoundingClientRect().height - (hexagon.getBoundingClientRect().height * 0.23 * (i + 1))) + 'px';
            if (i % 2 == 0)
            {
                row.style.left = '-' + ((hexagon.getBoundingClientRect().width / 2) + 2) + 'px';
            }
        }
    }
}, 1000);

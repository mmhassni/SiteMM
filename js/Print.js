function showHeader(elem) {
    //elem.firstChild.style.display = "block" ;
    elem.firstElementChild.style.display = "block";
}

function hideHeader(elem) {
    elem.firstElementChild.style.display = "none";
}



var divMain, divMap, divMapPrint, divMapPreview ;

divMap = document.getElementById("divMap");
divMapPrint = document.getElementById("divMapPrint");
divMapPreview = document.getElementById("mapPreview");
divMain = document.getElementById("main");


var mydiv3 = document.getElementById("mydiv3");


var PrintScreen = function () {
    moveNav();

    divMain.removeChild(divMap);


    mydiv3.appendChild(divMap) ;

    //$(document).remove("#divMap");


    //divMap.style.display = "none";
    divMapPrint.style.display = "block";
}

var printMap = function(){
    document.getElementById("printButton").style.display = "none";
    document.getElementById("impression").style.display = "none";
    document.getElementById("help").style.display = "none";
    window.print() ;
}
/*
interact('.resize-drag')
    .draggable({
        onmove: window.dragMoveListener,
        restrict: {
            restriction: 'parent',
            elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        },
    })
    .resizable({
        // resize from all edges and corners
        edges: { left: true, right: true, bottom: true, top: true },

        // keep the edges inside the parent
        restrictEdges: {
            outer: 'parent',
            endOnly: true,
        },

        // minimum size
        restrictSize: {
            min: { width: 100, height: 50 },
        },

        inertia: true,
    })
    .on('resizemove', function (event) {
        var target = event.target,
            x = (parseFloat(target.getAttribute('data-x')) || 0),
            y = (parseFloat(target.getAttribute('data-y')) || 0);

        // update the element's style
        target.style.width  = event.rect.width + 'px';
        target.style.height = event.rect.height + 'px';

        // translate when resizing from top or left edges
        x += event.deltaRect.left;
        y += event.deltaRect.top;

        target.style.webkitTransform = target.style.transform =
            'translate(' + x + 'px,' + y + 'px)';

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
        target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height);
    });*/
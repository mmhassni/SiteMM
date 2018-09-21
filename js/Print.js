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

var print = function(){
    document.getElementById("printButton").style.display = "none";
    document.getElementById("impression").style.display = "none";
    document.getElementById("help").style.display = "none";
    javascript:window.print() ;
}
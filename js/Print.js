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

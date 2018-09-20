var PrintScreen = function () {
    moveNav();

    var divMap, divMapPrint, divMapPreview ;
    divMap = document.getElementById("divMap");
    divMapPrint = document.getElementById("divMapPrint");
    divMapPreview = document.getElementById("mapPreview");

    divMapPreview.innerHTML = divMap.innerHTML;
    //divMapPreview = divMap;

    divMap.style.display = "none";
    divMapPrint.style.display = "block";
}

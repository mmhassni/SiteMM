function updateSelectList1(id, list){
    var select = document.getElementById(id);
    for(i=0; i < list.length;i++){
        var l = document.createElement("option");
        l.value = list[i];
        select.appendChild(l);
    }
}
function updateSelectList(id,opts) {
    var x = document.getElementById(id);
    for (i=0;i<opts.length ; i++){
        var c = document.createElement("option");
        c.text = opts[i];
        c.value = opts[i];
        x.options.add(c,x.children.length);
    }
    $("#"+id).material_select();
}

function removeLayer(){
    // remove layer by click on delete button
    //console.log($(this));
    $(this).parent().parent().remove();
}
function showLayer(){
    // dik conclick dial icons makatkhdamch m3a les fcts m3rftch 3lach mais momkin ndiro chi span ola ...
}

function hideLayer(){
    console.log($(this));
    $(this).hide();
}

function GenerateConfig() {
    var config ="" ;
    var url = document.getElementById("url").value ;
    var driver = document.getElementById("driver").value ;
    var user = document.getElementById("user").value ;
    var pass = document.getElementById("pass").value ;

    config = url+"&"+driver+"&"+user+"&"+pass ;

    $.ajax({

    url: able_schema = "http://localhost:9090/changeProperties/"+config, 
    success: function(req)
    {
        
        console.log(req);
        $("#conf").removeClass(function(){
        return "active";
        });
        $(".collapsible").collapsible({accordion: true});
        $(".collapsible").collapsible({accordion: false});




    }
});

    /*var divConf = document.getElementById("divConf");
    divConf.innerHTML = config ;*/

    return config;
}




/*document.addEventListener('DOMConetentLoaded',initialize());
var layers;
var lyrNumber;
function initialize() {
    layers = document.getElementById("sortable");
    lyrNumber = layers.children.length -1;
}
*/


function inputChange(evt) {
    evt.preventDefault();
}

function getLayerByPos(pos) {
    //position start from 1
    var l = document.getElementById("sortable");
    layers = l.children ;
    return layers[pos];
}

function addLayer(name) {
    /*
    var lyr = document.getElementById("lyr0");
    var newLyr = document.createElement("li");
    newLyr.class="collection-item";
    newlyr.name=name;
    var divLyr = document.createElement("div");
    divLyr.innerHTML = name;
    for (i=0;)
    var layers = document.getElementById("sortable");
*/
    //lyrNumber++;
    // (id="lyr" +' + lyrNumber.toString() + ') dial li
    var html = '<li  class="collection-item" name="'+name+'">' +
        '        <div >' +name+
        '            <i style="cursor:pointer" class="material-icons secondary-content">map</i>\n' +
        '            <i style="cursor:pointer" onclick="$(this).hide();$(this).next().show()" class="material-icons secondary-content">visibility</i>\n' +
        '            <i style="cursor:pointer ;color: #a2a2a2 ;display: none;" onclick="$(this).hide();$(this).prev().show()" class="material-icons secondary-content">visibility_off</i>' +
        '            <i style="cursor:pointer" onclick="$(this).parent().parent().remove();//lyrNumber--;" class="material-icons secondary-content">delete</i>\n' +
        '            <div class="icon secondary-content" style="position:relative; display:inline-block">\n' +
        '                <i class="btnColor material-icons secondary-content" >color_lens</i>\n' +
        '                <input onchange="btnClr()" type="color" value="#ff0000" style="opacity : 0 ; position:absolute; left:0;top:0;width:100%"/>\n' +
        '            </div>' +
        '            <p class="range-field">\n' +
        '                <input type="range" id="test5" min="0" max="100" /> <i class="material-icons secondary-content" style="position: in">invert_colors</i>\n' +
        '            </p>' +
        '        </div>\n' +
        '    </li>'
    $("#sortable").append(html)

}



function ShowOptions(id) {
//    var opts = document.getElementById("requestTables") ;
    $("#"+id).show();

}

function desFocus(event)
{
    console.log(event);
}
function HideOptions(id) {
    $("#"+id).hide();
}


function posLayer(id){
    var pos = 1;
    var lyr = document.getElementById(id);
    var layers = document.getElementById("sortable");
    for(i=1;i<layers.childNodes.length;i+=2){
        if (lyr===layers.childNodes[i]) return (i-1)/2 ;
    }
}

function GenerateSQL() {
    var sql ="Select " ;
    var tables =document.getElementById("textareaTables").value ;
    var fields =document.getElementById("textareaFields").value ;
    sql = sql + fields + " from " + tables + " where ";
    var conditions = document.getElementById("condition1").value ;
    for(i=2 ;i<=idcond ;i++){
        var c = "condition"+i;
        conditions = conditions + " and "+document.getElementById("condition1").value ;
    }
    if (conditions =="") sql = sql + "1=1" ;
    else sql = sql + conditions + ";" ;
    console.log(sql);
    return sql;
    
}

function btnClr() {
    var x =document.activeElement;
    var clr = x.value;
    x.parentElement.firstElementChild.style.color=clr; //we can use firstChild
}

function addTable(ev) {
    //ev.stopPropagation();
    console.log(ev);
    var tableToAdd = document.getElementById("tables").value;
    var oldText = document.getElementById("textareaTables").value;
    var newText="";
    if (oldText.toString()!="") newText = oldText+","+tableToAdd;
    else newText = tableToAdd;
    document.getElementById("textareaTables").value=newText;
    /*
    var tableToAdd = $("#tables").val();
    var oldText = $("#textareaTables").val();
    var newText;
    if (oldText.toString()!="") newText = oldText+","+tableToAdd;
    else newText = tableToAdd;
    $("#textareaTables").attr("value" ,newText);
    */
}
function addField() {
    var tableToAdd = document.getElementById("champs").value;
    var oldText = document.getElementById("textareaFields").value;
    var newText="";
    if (oldText.toString()!="") newText = oldText+","+tableToAdd;
    else newText = tableToAdd;
    document.getElementById("textareaFields").value=newText;
}
function addGeometry() {
    var tableToAdd = document.getElementById("geometry").value;
    var oldText = document.getElementById("textareaGeometry").value;
    var newText="";
    if (oldText.toString()!="") newText = oldText+","+tableToAdd;
    else newText = tableToAdd;
    document.getElementById("textareaGeometry").value=newText;
/*    var tableToAdd = $("#geometry").val();
    var oldText = $("#textareaGeometry").val();
    var newText;
    if (oldText.toString()!="") newText = oldText+","+tableToAdd;
    else newText = tableToAdd;
    $("#textareaGeometry").attr("value" ,newText);*/
}

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "35%";
    document.getElementById("main").style.marginLeft = "35%";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}


function moveNav() {
    var isOpen = (document.getElementById("mySidenav").style.width !== "0px");
    if(isOpen) closeNav();
    else openNav();
}

// Condtions add and remove part
var idcond=1;


$(document).on('click', '#add', function(){
    idcond++;
    var html = '<div id=divCond'+idcond+' > <h6>Condition '+idcond+' : </h6> <input style="padding: 5px" id=condition'+idcond.toString()+' type="text"  class="conditionWhere" name="myInput"></div>';
    $('#conditions').append(html);
});

$(document).on('click', '#remove', function(){
    var d ="#divCond"+idcond;
    if (idcond>1 ){
        $(d).remove();
        idcond--;
    }
});

//collapse

function expandAll(){
    $(".collapsible-header").addClass("active");
    $(".collapsible").collapsible({accordion: false});
}

function collapseAll(){
    $(".collapsible-header").removeClass(function(){
        return "active";
    });
    $(".collapsible").collapsible({accordion: true});
    $(".collapsible").collapsible({accordion: false});
}


// radio selection
$(document).ready(function() {
    $("input[name$='RequestType']").click(function() {
        var test = $(this).val();

        $("div.desc").hide();
        $("#"+test).show();
    });

    $(".conditionWhere").on('focus',function(){
        HideOptions('requestFields');
        HideOptions('requestGeomFields');
        HideOptions('requestTables');
    });


    document.getElementById("textareaTables").addEventListener('focus',function(){
        HideOptions('requestFields');
        HideOptions('requestGeomFields');
    });
    document.getElementById("textareaFields").addEventListener('focus',function(){
        HideOptions('requestTables');
        HideOptions('requestGeomFields');
    });
    document.getElementById("textareaGeometry").addEventListener('focus',function(){
        HideOptions('requestTables');
        HideOptions('requestFields');
    });
});


// color function
/*
function changeColor() {
    var iconTag = this ;
    var inputColor = iconTag.
    this.style.color=
}*/
/*
$(document).ready
var x = document.getElementsByClassName("icon secondary-content");
var i;
for (i = 0; i < x.length; i++) {
    var y=x[i].childNodes;
    y[0].style.color=y[1].value;
}

*/
/*
$(document).ready (
    function() {

        $("#sortlist").sortable({
            accept : 'sortable_item',
            axis : 'vertically',
            opacity : 0.6,
            onchange : function ( sorted ) {
                serial = $.SortSerialize( 'sortlist' );
            }
        });

    });*/
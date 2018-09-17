var fields = [];
var fieldsDetails = [];
var fieldsCom = [];
var listTables = [];
var listTablesCom = [];

var urlColumnService = "http://localhost:9090/requestAny/SELECT%20Distinct%20column_name%20,%20table_name,%20data_type%20FROM%20information_schema.columns%20WHERE%20table_catalog%20=%20'EHTP'%20and%20table_schema='public'%20and%20not%20table_name%20in%20('spatial_ref_sys','pointcloud_formats')";
var urlTableService = "http://localhost:9090/requestAny/SELECT Distinct table_name FROM information_schema.columns WHERE table_catalog = 'EHTP' and table_schema='public' and not table_name  in ('spatial_ref_sys','pointcloud_formats')";

$.ajax({

	url: able_schema = urlColumnService, 
	success: function(req)
	{
		fieldsDetails = req.features;
		console.log(fieldsDetails);

		for(var i = 0; i<fieldsDetails.length;i++)
		{
			fields.push(fieldsDetails[i].column_name);
			fieldsCom.push(" | type: " + fieldsDetails[i].data_type + " | table: "  + fieldsDetails[i].table_name);
		}
		$( document ).ready(function() {
				autocomplete(document.getElementById("textareaFields"), fields, fieldsCom);
				autocomplete(document.getElementById("textareaGeometry"), fields, fieldsCom);

				updateSelectList("champs",fields);
				updateSelectList("geometry",fields);

		});


	}
});


$.ajax({

	url: able_schema = urlTableService, 
	success: function(req)
	{
		listTables = req.features;
		console.log(fieldsDetails);

		for(var i = 0; i<listTables.length;i++)
		{
			listTables[i]=listTables[i].table_name;
			listTablesCom[i]="";
		}
		$( document ).ready(function() {
			autocomplete(document.getElementById("textareaTables"), listTables,listTablesCom);
			updateSelectList("tables",listTables);

		});


	}
});







function autocomplete(inp, arr,arrCom) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;


  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          if(arrCom[i] != "")
          {
         	b.innerHTML += '<span style="text-align:right">' +""+ arrCom[i] + " </span>";
          }
          /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });


  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });

  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }

  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }


  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
  	}
  }//fin closeAllLists

/*execute a function when someone clicks in the document:*/
document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});

}


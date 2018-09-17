/*globals counties*/

var FeatureLayersTable = [];
var mapMain;
var view;
var legend;
var ListLayerUI = [];
var fctChangerSymbologie; //une fonction
var fctRequestToFeatureLayer;


require([
    "dojo/query",
    "esri/layers/FeatureLayer",
    "esri/widgets/Legend",
    "esri/widgets/BasemapToggle",
    "esri/renderers/SimpleRenderer",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/layers/GraphicsLayer",
    "esri/geometry/support/webMercatorUtils",
    "dojo/dom",
    "esri/layers/support/Field",
    "esri/geometry/projection",
    "esri/Map",
    "esri/views/MapView",
    "esri/geometry/Extent",
    "esri/geometry/support/GeographicTransformation",
    "esri/geometry/support/GeographicTransformationStep",
    "esri/geometry",
    "esri/Graphic",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol",
    "esri/Color",
    "esri/geometry/support/jsonUtils",
    "esri/geometry/SpatialReference"

], function (query,FeatureLayer,Legend,BasemapToggle,SimpleRenderer,SimpleMarkerSymbol,GraphicsLayer,webMercatorUtils,dom ,Field , projection, Map, MapView, Extent, GeographicTransformation, GeographicTransformationStep, Geometry, Graphic, SimpleLineSymbol, SimpleFillSymbol, Color, geometryJsonUtils,SpatialReference)
{

    mapMain = new Map({
        basemap: "dark-gray",

    });




    view = new MapView({
        container: "divMap",
        map: mapMain,
        zoom: 4,
        center: [15, 65]
    });

// Set the extent on the view

    view.extent = new Extent({
        xmin: -633773.546,
        ymin: 4009075.040,
        xmax: -603217.844,
        ymax: 4016833.398,
        spatialReference: new SpatialReference({wkid:3857})
    });

    var toggle = new BasemapToggle({
        view: view,
        nextBasemap: "hybrid"
      });
      // Adds an instance of BasemapToggle widget to the
      // top right of the view.
      view.ui.add(toggle, "bottom-right");
      view.ui.move("zoom","top-right");






// wait for the load event
    view.when(function () {

        legend = new Legend({
                    view: view
                });

        var sss = "http://localhost:9090/requestAny/select%20gid,nature,num,indice,complement,geomjson%20from%20titres%20limit%20400";


        fctRequestToFeatureLayer = function RequestToFeatureLayer(laRequete,titre)
        {

        var featuresFinal = [];
        var req = new XMLHttpRequest();
        var symobologie =  new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
            new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                new Color([100,155,55]),1), new Color([155,255,100,0.35]));

        var fieldsTable = [];


        var layerB;
        var counties;
        var graphiqueLayer = new GraphicsLayer(); //ce n'est qu'un moyen pour obtenir une collection de graphics
        req.open("GET", laRequete , true);
        req.addEventListener("load", function () {
            console.log("ee");


            if (req.status >= 200 && req.status < 400) { 
                // Le serveur a réussi à traiter la requête
                //console.log(JSON.parse(req.responseText));
                counties = JSON.parse(req.responseText).features;
                fieldsBrutes = JSON.parse(req.responseText).fields;

                // Ajout des champs
                for (var i = 0; i <= fieldsBrutes.length - 1; i++) {
                    var f = new Field();
                    f.name = fieldsBrutes[i];
                    f.alias = fieldsBrutes[i];
                    fieldsTable.push(f);

                }

                for (var i = 0; i <= counties.length - 1; i++) {
                    var county = counties[i];


                    //console.log(county);
                    // insert into the index
                    if (county.geometry != null && county.geometry.type != null && county.geometry.coordinates != null)
                    {
                        //CountyGeoStore.add(county);

                        // convert for display to an arcgis object
                        var geom = Terraformer.ArcGIS.convert(county.geometry);

                        //console.log(geom);

                        //geom.type = "polygon";


                        // convert to an esri geometry
                        var geometry = geometryJsonUtils.fromJSON(geom);

                        geometry.spatialReference = new SpatialReference({wkid:3857});

                        // make a new graphic for the map
                        var gfx = new Graphic(geometry,symobologie);

                        graphiqueLayer.graphics.add(gfx);


                        //view.graphics.add(gfx);
                        //zoom in the map to the extent of the search result
                        //view.setExtent(geometry.extent, true);

                        //pour les attributs
                        var att = {};


                        for (var j = 0; j <= fieldsTable.length - 1; j++) {
                            if(fieldsTable[j].name != "gid")
                            {
                                att[fieldsTable[j].name]=county[fieldsTable[j].name];
                            }
                            else
                            {
                                att[fieldsTable[j].name]=Number(county[fieldsTable[j].name])
                            }

                        }


                        delete geom.spatialReference;


                        geom["type"]="polygon";



                        featuresFinal.push({geometry:geom,attributes:att})
                        //console.log(featuresFinal);



                        //console.log(graphiqueLayer);



                    }//fin condition if

                }// fin boucle for



                layerB = new FeatureLayer({
                    fields: fieldsTable ,

                    objectIdField: "gid",  // field name of the Object IDs

                    geometryType : "polygon",

                    source: graphiqueLayer.graphics,

                    renderer: new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                    new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                        new Color([0,0,200]),1), new Color([155,0,100,0.35])),

                    spatialReference: new SpatialReference({wkid:3857})

                });

                layerB.renderer = {
                    type: "unique-value",  // autocasts as new UniqueValueRenderer()
                    field: "gid",
                    defaultSymbol: { type: "simple-fill" , color: new Color([155,255,100,0.35])}
                  };


                //on l'ajoute à la liste des couches
                ListLayerUI.push(layerB);

                mapMain.add(layerB);

                legend.layerInfos.push({layer:layerB,title:titre});

                



                view.ui.add(legend, "bottom-left");


                console.log(layerB);

            }//fin du grand if
            else {
                console.log("erreur");
                // Affichage des informations sur l'échec du traitement de la requête
                console.error(req.status + " " + req.statusText);
            }



        }); // fin req on load


        req.addEventListener("error", function () {
            // La requête n'a pas réussi à atteindre le serveur
            console.error("Erreur réseau");
        });

        req.send(null);

        return layerB;
            

        } //fin fonction 

        fctRequestToFeatureLayer(sss,"titre foncier");




        view.on("pointer-move", showCoordinates);













        

        //mapMain.add(graphiqueLayer);





    }); // fin MapView onLoad

    


  
    fctChangerSymbologie = function changerSymbologie(indexCouche,r,g,b,a)
    {
          view.ui.remove(legend);
          ListLayerUI[indexCouche].renderer.defaultSymbol.color.r=r;
          ListLayerUI[indexCouche].renderer.defaultSymbol.color.g=g;
          ListLayerUI[indexCouche].renderer.defaultSymbol.color.b=b;
          ListLayerUI[indexCouche].renderer.defaultSymbol.color.a=a;

          ListLayerUI[indexCouche].source._items.forEach(
            function(e) 
            {
              e.symbol.color.b=b;
              e.symbol.color.g=g;
              e.symbol.color.r=r;
              e.symbol.color.a=a;
              
          });

            legend.layerInfos[indexCouche].layer = ListLayerUI[indexCouche];
            ListLayerUI[indexCouche].refresh();

            legend = new Legend({
                              view: view,

                              layerInfos: [
                                  {
                                      layer: ListLayerUI[indexCouche],
                                      title: "Titres Fonciers"
                                  }

                                  ]

            });

            

            view.ui.add(legend, "bottom-left");


    };




    function requetToFeatureLayer(requeteAJAX)
    {
        

        return layerB;

    }


    // ajouter une nouvelle couche
    function supprimerFeatureLayer(indice) {

        delete FeatureLayersTable[indice];


    }


    // ajouter une nouvelle couche
    function ajouterFeatureLayer(f) {

        FeatureLayersTable.push(f);

    }



    function showCoordinates(evt) {
        var point = view.toMap({x: evt.x, y: evt.y});
        //the map is in web mercator but display coordinates in geographic (lat, long)
        var mp = webMercatorUtils.webMercatorToGeographic(point);
        //display mouse coordinates
        dom.byId("info").innerHTML = point.x.toFixed(3) + ", " + point.y.toFixed(3);
    }

});




$(document).ready(ready);
function ready(){

    var idAssistenza = getQueryVariable("id");

    getFromDB(idAssistenza);

    getDispositivi(idAssistenza);

}

var immagini = 0;
function aggiorna() {
    immagini--;
    if (immagini == 0) {
        var slider = $('#light-slider').lightSlider({
            item:4,
            onSliderLoad: function() {
                $('#light-slider').removeClass('cS-hidden');
            }  
        });
    }
}

function getFromDB(identificativo){
    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        data: {assistenza:identificativo}, 
        url: "http://progettohyp.altervista.org/php/getAssistenza.php", //Relative or absolute path to file.php file
        success: function(response) {

            console.log(JSON.parse(response));

            var assistenza = JSON.parse(response);
            
            var faq = "";
            var descrizione = "";
            var intestazione = "";

            faq += "" + assistenza[0].FAQ + "";
            descrizione += "" + assistenza[0].Descrizione + "";
            intestazione += "<h1 class='blu'>" + assistenza[0].Nome + "</h1>"
                          + "<a href='./"+ getLinkGruppo(assistenza[0].Gruppo) +"' class='bottone blu sfondoGrigioChiaro gruppo'>"
                          +  getNomeGruppo(assistenza[0].Gruppo) + "</a>";


            $("#descrizione").html(descrizione);
            $("#faq").html(faq);
            $("#intestazione").html(intestazione);
        },
        error: function(request,error) 
        {
            console.log("Error");
        }
    });       

}

function getDispositivi(identificativo){
  $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        data: {assistenza:identificativo}, 
        url: "http://progettohyp.altervista.org/php/getDispositiviPerAssistenza.php", //Relative or absolute path to file.php file
        success: function(response) {

            console.log(JSON.parse(response));

            var dispositivi = JSON.parse(response);
            
            var slidebar = "";
            
            immagini = dispositivi.length;
            for(var i=0; i<dispositivi.length; i++){
              slidebar += "<li class='centro'>"
                        + "<a href='./paginaDispositivo.html?id=" + dispositivi[i].ID + "''>"
                        + "<img src='"+ dispositivi[i].Immagine + "' onload=\"aggiorna();\">"
                        + "<h1 class='blu'>" + dispositivi[i].nome + "</h1>"
                        + "</a>"
                        + "</li>";
            }
            
            
            $("#light-slider").html(slidebar);
            
        },
        error: function(request,error) 
        {
            console.log("Error");
        }
    });       
}

// funzione trovata online per ottenere i valori delle variabili di una query string
function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

// pessima funzione per nome gruppo
function getNomeGruppo(id)
{
  var nome = "";
  if(id == 0){
    nome += "Gestione linea e servizi";
  }
  else if(id == 1){
    nome += "Controllo costi e pagamenti";
  }
  else if (id == 2){
    nome += "Supporto tecnico";
  }
  else if (id == 3) {
    nome += "Assistenza per SmartLife";
  }
  return(nome);
}

function getLinkGruppo(id)
{
  var nome = "";
  if(id == 0){
    nome += "gestioneLinea.html";
  }
  else if(id == 1){
    nome += "controlloCosti.html";
  }
  else if (id == 2){
    nome += "supportoTecnico.html";
  }
  else if (id == 3) {
    nome += "assSL.html";
  }
  return(nome);
}
$(document).ready(ready);
function ready(){

    var idSmartLife = getQueryVariable("id");

    getFromDB(idSmartLife);
    
    getDispositivi(idSmartLife);
}

/**
* Per Slider
**/
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
        data: {smartlife:identificativo}, 
        url: "http://progettohyp.altervista.org/php/getApplicazione.php", //Relative or absolute path to file.php file
        success: function(response) {

            console.log(JSON.parse(response));

            var smart = JSON.parse(response);
            var titolo ="";
            var descrizione ="";
            var attivazione ="";
            var immagine = "";
            var logo = "";
            var faq ="";
            var bottone = "";
            
           immagine = "" + "<img src='"+smart[0].Copertina+"' > "+ "" ;
            
            logo = "" + "<img src='"+smart[0].Immagine+"'class='ridimensionaImmagine' > "+ "" ;
            
            titolo += "" + smart[0].Titolo + "";
            
            bottone +=  "<a href='./"+ getLinkCategoria(smart[0].Gruppo) +"' class='blu categoria'>"+ getNomeCategoria(smart[0].Gruppo) + 
                "</a>";
            
            faq += "" + smart[0].FAQ + "";
            descrizione += "" + smart[0].Descrizione + "";
            attivazione += "" + smart[0].Attivazione + "";
                          
            $("#immagine").html(immagine);
            $("#logotim").html(logo);
            $("#titolo").html(titolo);
            $("#bottone").html(bottone);
            
            $("#descrizione").html(descrizione);
            $("#attivazione").html(attivazione);
            $("#faq").html(faq);
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
        data: {smartlife:identificativo}, 
        url: "http://progettohyp.altervista.org/php/getDispositiviPerSmartLife.php", //Relative or absolute path to file.php file
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

// funzione trovata online per ottenere le variabili di una query string
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

function getNomeCategoria(id)
{
  var nome = "";
  if(id == 0){
    nome += "TV & Entertainment";
  }
  else if(id == 1){
    nome += "Servizi alla Persona";
  }
  else if (id == 2){
    nome += "Benessere e Salute";
  }
  else if (id == 3) {
    nome += "Casa e Famiglia";
  }
  return(nome);
}

function getLinkCategoria(id)
{
  var nome = "";
  if(id == 0){
    nome += "tv&enter.html";
  }
  else if(id == 1){
    nome += "serviziAllaPersona.html";
  }
  else if (id == 2){
    nome += "benESalute.html";
  }
  else if (id == 3) {
    nome += "casaEFamiglia.html";
  }
  return(nome);
}
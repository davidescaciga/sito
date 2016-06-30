$(document).ready(ready);
function ready(){
    
    var idDispositivo = getQueryVariable("id");
    
    getFromDB(idDispositivo);
    
    getSmartLife(idDispositivo);
    
    getAssistenze(idDispositivo);
    

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
            currentiPagerPosition:'middle',
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
        data: {dispositivo:identificativo},
        url: "http://progettohyp.altervista.org/php/getDispositivo.php", //Relative or absolute path to file.php file
        success: function(response) {

            console.log(JSON.parse(response));

            var dispositivi = JSON.parse(response);
            
            var immagineDispositivo = "";
    
            var nomeDispositivo = "";
            
            var descrizioneDispositivo = "";
            
            var specificheDispositivo = "";
            
            var bottone = "";
            
            bottone +=  "<a href='./"+ getLinkCategoria(dispositivi[0].Gruppo) +"' class='blu'>"+ getNomeCategoria(dispositivi[0].Gruppo) + 
                "</a>";

            immagineDispositivo+="<img src='"+dispositivi[0].Immagine+"'"
            +"alt='telefono' class='imgDispositiviGrande'>";
                        
            nomeDispositivo+=dispositivi[0].Nome;
            descrizioneDispositivo+=dispositivi[0].Descrizione;
            specificheDispositivo+=dispositivi[0].Specifiche;
            
            $("#bottone").html(bottone);
            $("#img").html(immagineDispositivo);
            $("#nome").html(nomeDispositivo);
            $("#descrizione").html(descrizioneDispositivo);
            $("#specifiche").html(specificheDispositivo);
           
        },
        error: function(request,error) 
        {
            console.log("Error");
        }
    });
   

}

function getSmartLife(identificativo){
  $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        data: {dispositivi:identificativo}, 
        url: "http://progettohyp.altervista.org/php/getSmartLifePerDispositivi.php", //Relative or absolute path to file.php file
        success: function(response) {

            console.log(JSON.parse(response));

            
            var smartLife = JSON.parse(response);
                        
            var slidebar = "";
            immagini = smartLife.length;
            for(var i=0; i<smartLife.length; i++){
              slidebar += "<a href='./paginaApplicazione.html?"
                        + "id="+smartLife[i].ID+"'>"
                        +"<li class='centro elementiSlideBar'>"
                        + "<img src='"+ smartLife[i].Immagine + "' onload=\"aggiorna();\"class='dimImgSL'>"
                        + "<h1 class='blu'>" + smartLife[i].Nome + "</h1>"
                        + "</li>"
                        + "</a>";
            }
            
            
            $("#light-slider").html(slidebar);
            
            
        },
        error: function(request,error) 
        {
            console.log("Error");
        }
    });       
}

function getAssistenze(identificativo){
    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        data: {dispositivi:identificativo}, 
        url: "http://progettohyp.altervista.org/php/getAssistenzePerDispositivi.php", //Relative or absolute path to file.php file
        success: function(response) {

            console.log(JSON.parse(response));
            
            var assistenze = JSON.parse(response);
            
            var ass1= "";
            var ass2= "";
            
            for(var i=0; i<assistenze.length/2; i++){
                ass1 += "<a href='./paginaAssistenza.html?"
                            + "id="+assistenze[i].ID+"'>"
                            + "<li class='assistenze nero'>" + assistenze[i].Nome+"</li>"
                            +"</a>";
                
            }
            
            for(var i=assistenze.length/2; i<assistenze.length; i++){
                ass2 += "<a href='./paginaAssistenza.html?"
                            + "id="+assistenze[i].ID+"'>"
                            + "<li class='assistenze nero'>" + assistenze[i].Nome+"</li>"
                            +"</a>";
            }
            
            
            
            
            $("#toAssistenza1").html(ass1);
            $("#toAssistenza2").html(ass2);
            
            
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
    nome += "Smartphone e Telefoni";
  }
  else if(id == 1){
    nome += "Tablet e Computer";
  }
  else if (id == 2){
    nome += "Modem e Networking";
  }
  else if (id == 3) {
    nome += "TV e SmartLiving";
  }
  else if (id == 4) {
    nome += "Promozioni";
  }
  return(nome);
}


function getLinkCategoria(id)
{
  var nome = "";
  if(id == 0){
    nome += "smartphone.html";
  }
  else if(id == 1){
    nome += "tablet.html";
  }
  else if (id == 2){
    nome += "modem.html";
  }
  else if (id == 3) {
    nome += "tv.html";
  }
  else if (id == 4) {
    nome += "promozioni.html";
  }
  return(nome);
}
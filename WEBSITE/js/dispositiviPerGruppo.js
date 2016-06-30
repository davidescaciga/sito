$(document).ready(ready);
function ready(){

    getFromDB( [], [], [], [], [], [] );
   
}

var dispositivi                 = [];
var numeroDispositiviPerRiga    = 3;
var numeroDispositiviPerPagina  = 9;

function popolaHtmlConDispositivi( pagina,gruppo ) { 
    
    var conteggioDispositivi    = 0;
    var elementoDispositivo     = "";
    
    var inizio = pagina * numeroDispositiviPerPagina;
    
    for (var i = inizio; i < (inizio + numeroDispositiviPerPagina) && i < dispositivi.length; i++) {
        
        if ( conteggioDispositivi == 0 ) {
             elementoDispositivo += "<span class='rigaDispositivo'>";
        }
        conteggioDispositivi++;
        
        if(gruppo!=4){
            elementoDispositivo += "<a href='./paginaDispositivo.html?"
                            + "id="+dispositivi[i].ID+"'>"
                            + "<div class='dispositivi sfondoGrigioChiaro'>"
                            + "<h2 class='scrittaAzzurra centro nomeDispositivo'>" +dispositivi[i].Nome + "</h2>"
                            + "<img src='"+dispositivi[i].Immagine+"' alt='telefono' class='imgDispositivi'>"
                            + " <h1 class='rosso centro'>" + dispositivi[i].Prezzo +   "</h1>"
                            + "</a>"
                            + "</div>";
        }
        else{
            elementoDispositivo += "<a href='./paginaDispositivo.html?"
                            + "id="+dispositivi[i].ID+"'>"
                            + "<div class='dispositivi sfondoGrigioChiaro'>"
                            + "<h2 class='scrittaAzzurra centro nomeDispositivo'>" +dispositivi[i].Nome + "</h2>"
                            + "<img src='"+dispositivi[i].Immagine+"' alt='telefono' class='imgDispositivi'>"
                            + "<span class='prezziPromozioni'>"
                            + "<h2 class='rosso prezzo barrato'>"
                            + dispositivi[i].Prezzo + "</h2>"
                            + " <h1 class='rosso prezzo'>" + dispositivi[i].prezzoPromozione +   "</h1>"
                            + "</span>"
                            + "</a>"
                            + "</div>";
            
        }
        
        
        if ( conteggioDispositivi == numeroDispositiviPerRiga ) {
            conteggioDispositivi = 0;
            elementoDispositivo += "</span>";
        }
        
    }
    
    $("#dinamico").html( elementoDispositivo );
    
    $(".cambiaPagina a").removeClass("rosso");
    $("#pag" + pagina + " a").addClass("rosso");
    
} 

function getFromDB( tipologia_val, marca_val, so_val, prezzo_val, connessione_val, acquisto_val ){
    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        data: {gruppo: idGruppo, tipologia: tipologia_val, marca: marca_val, so: so_val, prezzo: prezzo_val, connessione: connessione_val, acquisto: acquisto_val},
        url: "http://progettohyp.altervista.org/php/getDisPerGruppo.php", //Relative or absolute path to file.php file
        success: function(response) {

            if ( response.length == 0 ) {
                $(".spanCambioPagina").html();
                $("#dinamico").html( "Nessun device con queste caratteristiche." );
                return;
            }

            console.log(JSON.parse(response));

            console.log( response );
            //return;

            inizio = JSON.parse(response);
            dispositivi = [];
            for (var i = 0; i < inizio.length; i++) {
                //console.log(inizio[i].Prezzo);
                console.log(prezzo_val);
                for (var j = 0; j < prezzo_val.length; j++) {
                
                if(prezzo_val[j] == "'<150'" && parseFloat(inizio[i].Prezzo)<150){
                    dispositivi.push(inizio[i]);
                }
                if(prezzo_val[j] == "'150-300'" && parseFloat(inizio[i].Prezzo)>=150 && parseFloat(inizio[i].Prezzo)<300){
                    dispositivi.push(inizio[i]);
                }
                if(prezzo_val[j] == "'300-400'" && parseFloat(inizio[i].Prezzo)>=300 && parseFloat(inizio[i].Prezzo)<=400){
                    dispositivi.push(inizio[i]);
                }
                if (prezzo_val[j] == "'>400'" && parseFloat(inizio[i].Prezzo)>400){
                    dispositivi.push(inizio[i]);
                }
                }
            }

            console.log(prezzo_val);
            if (prezzo_val == ""){
                for (var i = 0; i < inizio.length; i++) {
                    dispositivi.push(inizio[i]);
                }

            }
     
     
            var numPagine = Math.ceil( dispositivi.length / numeroDispositiviPerPagina );
            
            
            var elementoDispositivo = "";
            for ( var i = 0; i < numPagine; i++ ) {
                 elementoDispositivo += "<li class='cambiaPagina' id='pag" + i + "' >"
                                    + "<a href='#' onclick='javascript:popolaHtmlConDispositivi(" + i + "); return false;' class='sfondoGrigioChiaro' >" + (i + 1) + "</a>"
                                    + "</li>";
            }
           
            $(".spanCambioPagina").html( elementoDispositivo );
            
            popolaHtmlConDispositivi( 0,idGruppo );

           
        },
        
        error: function(request,error) 
        {
            console.log("Error");
        }
    });
   

}
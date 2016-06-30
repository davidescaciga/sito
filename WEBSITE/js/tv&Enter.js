$(document).ready(ready);
function ready(){

    getFromDB();

}

function getFromDB(){
    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        data: {gruppo:idGruppo}, //è la variabile globale della pagina
        url: "http://progettohyp.altervista.org/php/getDispoPerCasaFamiglia.php", //Relative or absolute path to file.php file
        success: function(response) {

            console.log(JSON.parse(response));

            var smartlife = JSON.parse(response);
            
            var elementoRiga = "";
            var idDispositivo = "";
            
           for(var i=0; i<smartlife.length; i++){
             if (smartlife[i].Applicazione == 1){
               elementoRiga +="<div class='prodottiTvEnter'>"+
                "<a href='./paginaApplicazione.html?id="+ smartlife[i].ID +"' class='nero'>" +
                "<img src='"+ smartlife[i].Immagine+"' class='immagineProdotto'>"
                +"<br>"
                +smartlife[i].Nome
                +"</a>"
                +"</div>"
             }
               else {
                   
                   idDispositivo = getIDgiusto("#disp" + i, smartlife[i].ID);
                   
                    elementoRiga +="<div class='prodottiTvEnter'>"+
                "<a href='./paginaDispositivo.html?id=' class='nero' id='disp" + i + "'>" +
                "<img src='"+ smartlife[i].Immagine+"' class='immagineProdotto'>"
                +"<br>"
                +smartlife[i].Nome
                +"</a>"
                +"</div>"
               }
               
            }
            
              
            $("#dinamico").html(elementoRiga);
           
        },
        error: function(request,error) 
        {
            console.log("Error");
        }
    });
       

}


function getIDgiusto(idHTML, idSmart){
    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        data: {dispo:idSmart}, 
        url: "http://progettohyp.altervista.org/php/getDispositivoperDispositivo.php", //Relative or absolute path to file.php file
        success: function(response) {

            console.log(JSON.parse(response));

            var dispositivi = JSON.parse(response);
   
            var idDispo = "";
            idDispo = dispositivi[0].ID;
            
            $(idHTML).attr("href", $(idHTML).attr("href") + idDispo);
        }
    });
}
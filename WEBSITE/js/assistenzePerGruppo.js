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
        url: "http://progettohyp.altervista.org/php/getAssPerGruppo.php", //Relative or absolute path to file.php file
        success: function(response) {

            console.log(JSON.parse(response));

            var assistenze = JSON.parse(response);
            
            var elementoRiga = "";

            for (var i = 0; i < assistenze.length; i=i+2) {
                elementoRiga += "<tr class='riga'>"
                        +"<td class='nomeAS titolo'><a href='./paginaAssistenza.html?id="+ assistenze[i].ID +"' class='blu'>• "
                        + assistenze[i].Nome + "</a></td>"
                        +"<td class='nomeAS titolo'><a href='./paginaAssistenza.html?id="+ assistenze[i+1].ID +"' class='blu'>• "
                        + assistenze[i+1].Nome + "</a></td>"
                        +"</tr>";
            }
            
              
            $("#dinamico").html(elementoRiga);
           
        },
        error: function(request,error) 
        {
            console.log("Error");
        }
    });
       

}
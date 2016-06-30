$(document).ready(ready);
function ready(){

    // è una funzione che chiama una funzione, qua non serve a niente
    getFromDB();

}

function getFromDB(){
    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "http://progettohyp.altervista.org/php/getDisPromozioni.php", //Relative or absolute path to file.php file
        success: function(response) {

            console.log(JSON.parse(response));

            var dispositivi = JSON.parse(response);
            var num=0;
            var numRighe=0;
            var elementoDispositivo = "";

            numRighe=dispositivi.length/3;
            
             for (var i=0; i<numRighe; i++) {
                elementoDispositivo+= "<span class='rigaDispositivo'>";
                num=i*3;
                for(var j=0; j<3; j++){
                    if(num+j+1<=dispositivi.length){
                        elementoDispositivo+="<a href='./paginaDispositivo.html?"
                        +"id="+dispositivi[j+num].ID+"'>"
                        +"<div class='dispositivi sfondoGrigioChiaro'>"
                        +"<h2 class='scrittaAzzurra centro nomeDispositivo'>" +dispositivi[j+num].Nome + "</h2>"
                        +"<img src='"+dispositivi[j+num].Immagine+"' alt='telefono' class='imgDispositivi'>"
                        +"<span class='prezziPromozioni'>"
                        +"<h2 class='rosso prezzo barrato'>" +dispositivi[j+num].Prezzo +"</h2>" 
                        +"<h1 class='rosso prezzo'>" +dispositivi[j+num].prezzoPromozione +"</h1>"
                        +"</span>"
                        +"</a>"
                        +"</div>";
                
                    }
                    else{
                        elementoDispositivo+="<div class='dispositivi'></div>"
                    }
                }
                    
                     
               elementoDispositivo+="</span>";
                
            }
            
              
            $("#dinamico").html(elementoDispositivo);
           
        },
        error: function(request,error) 
        {
            console.log("Error");
        }
    });
   

}
$(document).ready(ready);
function ready(){

    // è una funzione che chiama una funzione, qua non serve a niente
    getFromDB();

}

// funzione per caricare il prodotto da database 
function getFromDB(){
    var id = 0;
    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "http://progettohyp.altervista.org/php/getDispositivi.php", //Relative or absolute path to file.php file
        data: { prod_id: id },
        success: function(response) {

            console.log(JSON.parse(response));

            var prodotti = JSON.parse(response);
            var immagine = "";
            
            for(var i=0; i<prodotti.length; i++){
                console.log(prodotti[i].Immagine);
                immagine += "<img src='" + prodotti[i].Immagine + "' alt='immagine dinamica'>";  
            }

            $(".img").html(immagine);
           
        },
        error: function(request,error) 
        {
            console.log("Error");
        }
    });
       

}
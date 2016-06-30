$(document).ready(ready);
function ready(){
    $("#1").on("click", attivaSmartlife);
    $("#2").on("click", attivaSpecifiche);
    $("#3").on("click", attivaAssistenza);
    $("#submit").on("click", benvenuto);
    $("#submit").on("click", getName);
    $("#light-slider").show();
    $("#specifiche").hide();
    $("#toAssistenza1").hide();
    $("#toAssistenza2").hide();
    $(".welcome").hide();
    
}

function benvenuto(){
        
    $(".login").hide();
    $(".welcome").show();
    
}

function getName(){
    
    
    var scritta = "Benvenuto "
    var input = document.getElementById("form").value;
    
    if (input == null || input == "") {
        alert("Name must be filled out");
        $(".welcome").hide();
        $(".login").show();
        return false;
    }
    scritta += "" + input + "";
    $("#username").html(scritta);
}


function attivaSpecifiche(){
    $("#SL").removeClass("azzurro");
    $("#AS").removeClass("azzurro");
    $("#SL").addClass("sfondoGrigioChiaro");
    $("#AS").addClass("sfondoGrigioChiaro");
    $("#SP").removeClass("sfondoGrigioChiaro");
    $("#SP").addClass("azzurro");
    $("#specifiche").show();
    $("#light-slider").hide();
    $("#toAssistenza1").hide();
    $("#toAssistenza2").hide();
    $("li").hide();
}

function attivaSmartlife(){
    $("#SP").removeClass("azzurro");
    $("#AS").removeClass("azzurro");
    $("#SP").addClass("sfondoGrigioChiaro");
    $("#AS").addClass("sfondoGrigioChiaro");
    $("#SL").removeClass("sfondoGrigioChiaro");
    $("#SL").addClass("azzurro");
    $("li").show();
    $("#light-slider").show();
    $("#specifiche").hide();
    $("#toAssistenza1").hide();
    $("#toAssistenza2").hide();
}

function attivaAssistenza(){
    $("#SP").removeClass("azzurro");
    $("#SL").removeClass("azzurro");
    $("#SP").addClass("sfondoGrigioChiaro");
    $("#SL").addClass("sfondoGrigioChiaro");
    $("#AS").removeClass("sfondoGrigioChiaro");
    $("#AS").addClass("azzurro");
    $("#light-slider").hide();
    $("#specifiche").hide();
    $("li").hide();
    $(".assistenze").show();
    $("#toAssistenza1").show();
    $("#toAssistenza2").show();
}


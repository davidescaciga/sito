<?php

// Prende le credenziali da un altro php
require_once("dbCredentials.php");

$mysqli = new mysqli(DB_ADDR, DB_USER, DB_PASS, DB_NAME);

// prova a stabilire una connessione
if (mysqli_connect_errno()) {
    echo "Errore di connessione al DataBase: ".mysqli_connect_error(); //notifica error
    exit();
}
else {
    // connessione ok
    // seleziono tutti i dispositivi
    $query = " SELECT * FROM `Dispositivi`";
    // esecuzione della query
    $result = $mysqli->query($query);
    // se ci sono risultati: li mette in array
    if($result->num_rows > 0) {

        $myArray = array();//create an array
        while( $row = $result->fetch_assoc() ) {
            $myArray[] = $row;
        }

        // e quindi in json
        echo json_encode($myArray);
    }
    //free result
    $result->close();
    //close connection
    $mysqli->close();
}
?>
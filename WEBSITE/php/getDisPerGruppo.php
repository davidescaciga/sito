<?php

header('Access-Control-Allow-Origin: *');

$idGroup = $_POST["gruppo"];
$valTipologia = $_POST["tipologia"];
$valMarca = $_POST["marca"];
$valSo = $_POST["so"];
$valPrezzo = $_POST["prezzo"];
$valConnessione = $_POST["connessione"];
$valAcquisto= $_POST["acquisto"];

// Prende le credenziali da un altro php
require_once("dbCredentials.php");

$mysqli = new mysqli(DB_ADDR, DB_USER, DB_PASS, DB_NAME);

// prova a stabilire una connessione
if (mysqli_connect_errno()) {
    echo "Errore di connessione al DataBase: ".mysqli_connect_error(); //notifica error
    exit();
}
else {
    mysqli_set_charset($mysqli,"utf8");
    // connessione ok
    // seleziono tutti le assistenze highlights

    $query = " SELECT * FROM `Dispositivi` WHERE Gruppo = $idGroup";

     if ( count( $valTipologia ) > 0 ) {
        $valori = implode(",", $valTipologia);
        $query .= " AND Tipologia IN (" . $valori . ")";
    }

    if ( count( $valMarca ) > 0 ) {
        $valori = implode(",", $valMarca);
        $query .= " AND Marca IN (" . $valori . ")";
    }

    if ( count( $valSo ) > 0 ) {
        $valori = implode(",", $valSo);
        $query .= " AND SistemaOperativo IN (" . $valori . ")";
    }

    if ( count( $valConnessione ) > 0 ) {
        $valori = implode(",", $valConnessione);
        $query .= " AND Connessione IN (" . $valori . ")";
    }

    if ( count( $valAcquisto ) > 0 ) {
        $valori = implode(",", $valAcquisto);
        $query .= " AND Acquisto IN (" . $valori . ")";
    }

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

    //close connection
    $mysqli->close();
}
?>
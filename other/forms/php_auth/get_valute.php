<?php
header("Content-Type: application/json");

include("connessione.php");

// Establish a database connection here if not already done

if ($connessione->connect_error) {
    die("Connection failed: " . $connessione->connect_error);
}

$getValute = "SELECT * FROM valuta;";
$result = $connessione->query($getValute);

if ($result->num_rows > 0) {
    $valuteArray = array();

    while ($row = $result->fetch_assoc()) {
        $valuteArray[] = $row['NOME']; // Replace 'your_column_name' with the actual column name from the valute table
    }

    echo json_encode($valuteArray);
} else {
    echo json_encode(array("message" => "No valute found"));
}

$connessione->close();
?>

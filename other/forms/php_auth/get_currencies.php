<?php
header("Content-Type: application/json");

include("connessione.php");

// Establish a database connection here if not already done
if ($connessione->connect_error) {
  die("Connection failed: " . $connessione->connect_error);
}

$get_currencies = "SELECT * FROM valuta;";
$result = $connessione->query($get_currencies);

if ($result->num_rows > 0) {
  $currenciesArray = array();

  while ($row = $result->fetch_assoc()) {
    $currenciesArray[] = $row['NOME'] . " " . $row['SIMBOLO'] . " " . $row['COD'];
  }

  echo json_encode($currenciesArray);
} else {
  echo json_encode(array("message" => "No currencies found"));
}

$connessione->close();
?>
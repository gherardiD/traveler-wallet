<?php
header("Content-Type: application/json");

include("connessione.php");

// Establish a database connection here if not already done
if ($connessione->connect_error) {
  die("Connection failed: " . $connessione->connect_error);
}

$get_movements = "SELECT * FROM movement";
$result = $connessione->query($get_movements);

if ($result->num_rows > 0) {
  $movementsArray = array();

  while ($row = $result->fetch_assoc()) {
    $movementsArray[] = $row['ACCOUNT_ID'] . " / " . $row['VALUTA_COD'] . " / " . $row['AMMONTARE'] . " / " . $row['DATA'];
  }

  echo json_encode($movementsArray);
} else {
  echo json_encode(array("message" => "No currencies found"));
}

$connessione->close();
?>
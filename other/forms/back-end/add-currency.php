<?php

session_start();

include("connessione.php");

// Establish a database connection here if not already done
if ($connessione->connect_error) {
  die("Connection failed: " . $connessione->connect_error);
}

$nome = $_POST["nome"];
$cod = $_POST["codice"];
$simbolo = $_POST["simbolo"];

$add_currency = "INSERT INTO valuta (COD, NOME, SIMBOLO)
VALUES ('$cod', '$nome', '$simbolo')
ON DUPLICATE KEY UPDATE COD = VALUES(COD), NOME = VALUES(NOME), SIMBOLO = VALUES(SIMBOLO);";

if ($connessione->query($add_currency)) {
  header("Location: http://127.0.0.1/5ia/forms/front-end/home.php");
} else {
  echo json_encode(array("message" => "Error: " . $add_currency . "<br>" . $connessione->error));
}

$connessione->close();
?>
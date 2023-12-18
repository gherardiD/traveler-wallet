<?php
  session_start();

  include("connessione.php");

  $id = $_SESSION["id"];
  $valuta_cod = $_POST["valuta"];
  $amount = $_POST["amount"];
  $data = date("Y-m-d H:i:s");

  $insert = "INSERT INTO movements (id, valuta_cod, amount, data) VALUES ('$id', '$valuta_cod', '$amount', '$data');";

  if ($connessione->query($insert) === TRUE) {
    header("Location: http://127.0.0.1/5ia/forms/php_auth/home.php");
  }
  else {
    echo("Errore nell'esecuzione della query: ".$connessione->error.".");
  }
    
?>
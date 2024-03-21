<?php
  session_start();

  include("connessione.php");
  
  $email = $_SESSION["email"];
  $get_name = "SELECT id, nome FROM account WHERE email = '$email';";
  $user = $connessione->query($get_name)->fetch_array(MYSQLI_ASSOC);
  $nome = $user["nome"];
  $id = $user["id"];

  $valuta_cod = mysqli_real_escape_string($connessione, $_POST["valuta"]);
  $amount = mysqli_real_escape_string($connessione, $_POST["amount"]);
  $data = date("Y-m-d H:i:s");


  $insert = "insert into movement (account_id, valuta_cod, ammontare, data) values ('$id', '$valuta_cod', '$amount', '$data');";
  
  if ($connessione->query($insert)) {
    header("Location: http://127.0.0.1/5ia/forms/front-end/home.php");
  }
  else {
    echo "Errore: " . $insert . "<br>" . $connessione->error;
  }
  
  $connessione->close();
?>
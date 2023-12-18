<?php
$email = $_POST['email'];
$password = $_POST['password'];

include("connessione.php");

$email = mysqli_real_escape_string($connessione, $_POST['email']);
// $password = mysqli_real_escape_string($connessione, $_POST['password']);
$password = md5($_POST['password']);

$get_password = "SELECT * FROM account WHERE email = '$email';";

$risultato_row=$connessione->query($get_password)->fetch_array(MYSQLI_ASSOC);

$id = $risultato_row["id"];

if($risultato_row["password"] != $password){
  echo("Errore nell'esecuzione della query: ".$connessione->error.".");
  //header("Location: http://127.0.0.1/esercitazioni/php_auth/login.php?errore=1");
  header("Location: http://127.0.0.1/5ia/forms/php_auth/login.php?errore=1");
  die();
}
else{
  // header("Location: http://127.0.0.1/esercitazioni/php_auth/home.php");
  session_start();
  $_SESSION["email"] = $email;
  $_SESSION["id"] = $id;
  header("Location: http://127.0.0.1/5ia/forms/php_auth/home.php");
  die();
}
?>
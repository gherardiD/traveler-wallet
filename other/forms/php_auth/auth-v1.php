<?php
$email = $_POST['email'];
$password = $_POST['password'];

if(rand(0,1) == 1){
  header("Location: http://127.0.0.1/esercitazioni/php_auth/home.php");
  die();
}
else{
  header("Location: http://127.0.0.1/esercitazioni/php_auth/login.php?errore=1");
  die();
}
?>
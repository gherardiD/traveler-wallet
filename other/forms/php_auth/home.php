<?php

session_start();
if(isset($_SESSION["email"])){
  $email = $_SESSION["email"];
  echo "benvenuto ti sei resgistato con " . $email;

  echo "<br><br><a href='logout.php'>Logout</a>";
}else{
  // header("Location: http://127.0.0.1/esercitazioni/php_auth/login.php");
  header("Location: http://127.0.0.1/5ia/php_auth/login.php");
}
?>

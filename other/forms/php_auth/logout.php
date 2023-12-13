<?php

session_start();
$_SESSION["email"] = null;
session_destroy();
// header("Location: http://127.0.0.1/esercitazioni/php_auth/login.php");
header("Location: http://127.0.0.1/5ia/php_auth/login.php");

?>
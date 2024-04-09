<?php

session_start();
$_SESSION["email"] = null;
session_destroy();
header("Location: http://127.0.0.1/5ia/forms/front-end/login.php");

?>
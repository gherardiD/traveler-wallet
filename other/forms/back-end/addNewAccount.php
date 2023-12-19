<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Data form</title>
  </head>
  <body>
    <div class="container">
      <h2>RESULT OF DATA SUBMIT</h2>


<?php
  
  include("connessione.php");
  
  $name = mysqli_real_escape_string($connessione, $_POST['first-name']);
  $surname = mysqli_real_escape_string($connessione, $_POST['last-name']);
  $date = mysqli_real_escape_string($connessione, $_POST['dob']);
  $phone = mysqli_real_escape_string($connessione, $_POST['phone']);
  $email = mysqli_real_escape_string($connessione, $_POST['email']);
  $email = mysqli_real_escape_string($connessione, $_POST['email']);
  $password = md5($_POST['password']);
  
  $la_query = "insert into account (cognome,nome, data_nascita, telefono, email, password) 
  values ('$surname','$name','$date','$phone','$email','$password')";
  
  if ($connessione->query($la_query))
	{
		session_start();
    $_SESSION["email"] = $email;
    header("Location: http://127.0.0.1/5ia/forms/front-end/home.php");
    die();
	}
	else{
		echo "Errore: ".$la_query."<br/>".$connessione->error;
  }
	$connessione->close();
  
?>


      
    </div>
  </body>
</html>
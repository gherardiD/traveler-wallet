<?php
	include "connessione.php";

	$la_query = "insert into account (cognome,nome, data_nascita, telefono, email, password) 
  values ('Gherardi','Daniele','2005-04-26','3207256463','dani.ghera05@gmail.com','daniele')";
	echo("La mia query [<span style='font-weight:bold;'>".$la_query."</span>]<br/><br/>");
	
	if ($connessione->query($la_query))
	{
		echo "Record aggiunto!<br/>";
		echo "Il suo id e' ".$connessione->insert_id;
	}
	else
		echo "Errore: ".$la_query."<br/>".$connessione->error;
	$connessione->close();
?>
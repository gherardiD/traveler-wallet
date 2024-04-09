<?php
	include "connessione.php";

	$la_query = "delete from account where id=2;";
	echo("La mia query [<span style='font-weight:bold;'>".$la_query."</span>]<br/><br/>");
	
	if ($connessione->query($la_query))
		echo "Record(s) cancellato(i): ".$connessione->affected_rows;
	else
		echo "Errore: ".$la_query."<br/>".$connessione->error;
	$connessione->close();
?>
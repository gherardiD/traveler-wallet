<?php
	include "connessione.php";

	$la_query = "update account set cognome='Oberti' where nome='Boris'";
	echo("La mia query [<span style='font-weight:bold;'>".$la_query."</span>]<br/><br/>");
	if ($connessione->query($la_query))
	{
		echo "Record(s) modificato(i): ".$connessione->affected_rows;
	}
	else
		echo "Errore: ".$la_query."<br/>".$connessione->error;
	$connessione->close();
?>
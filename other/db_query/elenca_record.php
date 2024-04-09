<?php
	include "connessione.php";

	$la_query="SELECT account.nome, account.cognome, SUM(movement.ammontare) AS totale, valuta.cod
	FROM (account INNER JOIN movement ON account.id=movement.account_id)
	INNER JOIN valuta ON movement.valuta_cod=valuta.cod
	WHERE account.id=5
	GROUP BY account.nome, account.cognome, valuta.cod
	ORDER BY totale DESC;";


	if(isset($_GET["ordinata"]))
		$la_query.=" ORDER BY ".$_GET["ordinata"];
	
	//	Al termine della query aggiungo il ;
	
	$la_query.=";";
	
	echo("La mia query [<span style='font-weight:bold;'>".$la_query."</span>]<br/><br/>");
	
	if(!$risultati=$connessione->query($la_query)) {
		echo("Errore nell'esecuzione della query: ".$connessione->error.".");
		exit();
	} else {
		echo("Dalla tabella ho estratto ".$risultati->num_rows." record(s):<br/><br/>");
		if($risultati->num_rows>0)  
		{
			while($un_record = $risultati->fetch_array(MYSQLI_ASSOC))  
			{
				echo($un_record["cognome"]." - ");
				echo($un_record["nome"]." - ");
				echo($un_record["totale"]." - ");
				echo($un_record["cod"]."<br/>");	
			}
			$risultati->close();
		}
	}
	$connessione->close();
?>
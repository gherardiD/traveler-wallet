<?php
header("Content-Type: application/json");

include("connessione.php");

// Establish a database connection here if not already done

if ($connessione->connect_error) {
    die("Connection failed: " . $connessione->connect_error);
}

$getUsers = "SELECT * FROM account;";
$result = $connessione->query($getUsers);

if ($result->num_rows > 0) {
    $usersArray = array();

    while ($row = $result->fetch_assoc()) {
        $usersArray[] = $row['nome'] . " " . $row['cognome'] . " " . $row['email'];
    }

    echo json_encode($usersArray);
} else {
    echo json_encode(array("message" => "No users found"));
}

$connessione->close();

?>
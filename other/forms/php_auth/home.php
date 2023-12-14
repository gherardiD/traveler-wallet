<?php
session_start();

if(!isset($_SESSION["email"])){
  header("Location: http://127.0.0.1/5ia/forms/php_auth/login.php");
}else if($_SESSION["email"] == "dani.ghera05@gmail.com"){
  $email = $_SESSION["email"];
  echo "benvenuto sei l'amministratore";

  echo "<br><br><a href='logout.php'>Logout</a>";

  echo "<br><br><button id='getValute'>valute</button>";

  // Container for the valute elements
  echo "<div id='valuteContainer'></div>";
}else{
  $email = $_SESSION["email"];
  echo "benvenuto ti sei registrato con ".$email;

  echo "<br><br><a href='logout.php'>Logout</a>";
}

?>

<script>
    const button = document.getElementById("getValute");
    const valuteContainer = document.getElementById("valuteContainer");

    button.addEventListener("click", function () {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                const result = JSON.parse(xhr.responseText);

                // Clear previous content in the valuteContainer
                valuteContainer.innerHTML = '';

                // Create a div for each valute and append it to the valuteContainer
                result.forEach(function (valute) {
                    const valuteDiv = document.createElement("div");
                    valuteDiv.textContent = valute;
                    valuteContainer.appendChild(valuteDiv);
                });
            }
        };

        xhr.open("GET", "get_valute.php", true);
        xhr.send();
    });
</script>

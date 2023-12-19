<?php
    session_start();

    include("../back-end/connessione.php");

    if (!isset($_SESSION["email"])) {
        header("Location: http://127.0.0.1/5ia/forms/front-end/login.php");
    } else if ($_SESSION["email"] == "dani.ghera05@gmail.com") {
        $email = $_SESSION["email"];
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                margin: 20px;
                background-color: #f4f4f4;
            }

            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #fff;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                border-radius: 5px;
            }

            .welcome-message {
                font-size: 18px;
                margin-bottom: 20px;
            }

            .button {
                padding: 10px;
                background-color: #4caf50;
                color: #fff;
                text-decoration: none;
                display: inline-block;
                border-radius: 5px;
            }

            .container-btn{
                display: flex;
                flex-direction: row;
            }

            button {
                padding: 10px;
                background-color: #007bff;
                color: #fff;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                margin-top: 10px;
                margin-right: 10px;
            }

            #valuteContainer,
            #usersContainer {
                margin-top: 10px;
            }

            #valuteContainer div,
            #usersContainer div {
                margin-bottom: 5px;
                padding: 8px;
                background-color: #eee;
                border-radius: 3px;
            }
        </style>
    </head>

    <body>
        <div class="container">
            <p class="welcome-message">Benvenuto, sei l'amministratore</p>

            <a href='../back-end/logout.php' class="button">Logout</a>
            <div class="container-btn">
                <button id='getValute'>Valute</button>
                <button id='getUsers'>Utenti</button>
                <button id='getMovements'>Movements</button>
                <button id='addCurrency'>Add Currency</button>
            </div>
            <div id='valuteContainer'></div>
            <div id='usersContainer'></div>
            <div id='movementsContainer'></div>
        </div>

        <script>
            // Get the buttons and containers
            const getValuesBtn = document.getElementById("getValute");
            const valuteContainer = document.getElementById("valuteContainer");
            const getUsersBtn = document.getElementById("getUsers");
            const usersContainer = document.getElementById("usersContainer");
            const getMovementsBtn = document.getElementById("getMovements");
            const movementsContainer = document.getElementById("movementsContainer");
            const addCurrencyBtn = document.getElementById("addCurrency");

            // Add an event listener to the getValuesBtn
            getValuesBtn.addEventListener("click", function () {
            if(valuteContainer.childNodes.length === 0){
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

                xhr.open("GET", "../back-end/get_valute.php", true);
                xhr.send();
            }else{
                valuteContainer.innerHTML = '';
            }
            });

            // Add an event listener to the getUsersBtn
            getUsersBtn.addEventListener("click", function () {
            if(usersContainer.childNodes.length === 0){
                const xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        const result = JSON.parse(xhr.responseText);

                        // Clear previous content in the usersContainer
                        usersContainer.innerHTML = '';

                        // Create a div for each user and append it to the usersContainer
                        result.forEach(function (user) {
                            const userDiv = document.createElement("div");
                            userDiv.textContent = user;
                            usersContainer.appendChild(userDiv);
                        });
                    }
                };

                xhr.open("GET", "../back-end/get_users.php", true);
                xhr.send();
            }else{
                usersContainer.innerHTML = '';
            }
            });

            // Add an event listener to the getMovementsBtn
            getMovementsBtn.addEventListener("click", function () {
            if(movementsContainer.childNodes.length === 0){
                const xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        const result = JSON.parse(xhr.responseText);

                        // Clear previous content in the movementsContainer
                        movementsContainer.innerHTML = '';

                        // Create a div for each currency and append it to the movementsContainer
                        result.forEach(function (currency) {
                            const currencyDiv = document.createElement("div");
                            currencyDiv.textContent = currency;
                            movementsContainer.appendChild(currencyDiv);
                        });
                    }
                };

                xhr.open("GET", "../back-end/get_movements.php", true);
                xhr.send();
            }else{
                movementsContainer.innerHTML = '';
            }
            });
            
            // Add an event listener to the addCurrencyBtn
            addCurrencyBtn.addEventListener("click", function () {
                window.location.href = "add-currency-form.php";
            });
        </script>
    </body>

</html>
<?php
    } else {
    $email = $_SESSION["email"];
    $get_name = "SELECT id, nome FROM account WHERE email = '$email';";
    $user = $connessione->query($get_name)->fetch_array(MYSQLI_ASSOC);
    $nome = $user["nome"];
    $id = $user["id"];
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                margin: 20px;
                background-color: #f4f4f4;
            }

            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #fff;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                border-radius: 5px;
            }

            .welcome-message {
                font-size: 18px;
                margin-bottom: 20px;
            }

            .button {
                padding: 10px;
                background-color: #4caf50;
                color: #fff;
                text-decoration: none;
                display: inline-block;
                border-radius: 5px;
            }

            .container-btn{
                display: flex;
                flex-direction: row;
            }

            button {
                padding: 10px;
                background-color: #007bff;
                color: #fff;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                margin-top: 10px;
                margin-right: 10px;
            }
        </style>
    </head>

    <body>
    <div class="container">
            <p class="welcome-message">Benvenuto, <?= $nome ?>  </p>

            <a href='../back-end/logout.php' class="button">Logout</a>
            <div class="container-btn">
                <button id='addMovement'>Add income</button>
            </div>
        </div>
        <script>
            const addMovement = document.getElementById("addMovement");
            addMovement.addEventListener("click", () => {
                window.location.href = "add-income-form.php";
            });
        </script>
    </body>

</html>
<?php
}
?>

<?php
  session_start();

  
  include("connessione.php");

  $get_id = "SELECT id FROM users WHERE email = '$email'";
  $id = $connessione->query($get_id)->fetch_array(MYSQLI_ASSOC)["id"];

  if (!isset($_SESSION["email"])) {
      header("Location: http://127.0.0.1/5ia/forms/php_auth/login.php");
  } else {
      $email = $_SESSION["email"];
      ?>
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Add expense Form</title>
          <link rel="stylesheet" href="styles.css" />
        </head>
        <body>
          <div class="container">
            <h2 class="animated">Add Expense</h2>
            <form action="" method="post">
              <div class="form-group animated">
                <label for="amount">Amount</label>
                <input type="number" min="1" step="any" id="amount" name="amount" required />
              </div>
              <div class="form-group animated">
                <label for="valuta">Codice Valuta</label>
                <input type="text" id="valuta" name="valuta" required />
              </div>
              <div class="form-group animated">
                <button class="btn-animated" action="add-movement.php" >Add</button>
              </div>
            </form>
          </div>
        </body>
      </html>
      <?php
  }
?>

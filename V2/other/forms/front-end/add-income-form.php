<?php
  session_start();

  
  include("../back-end/connessione.php");

  if (!isset($_SESSION["email"])) {
      header("Location: http://127.0.0.1/5ia/forms/front-end/login.php");
  } else {
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
            <form action="../back-end/add-movement.php" method="post">
              <div class="form-group animated">
                <label for="amount">Amount</label>
                <input type="number" min="1" step="any" id="amount" name="amount" required />
              </div>
              <div class="form-group animated">
                <label for="valuta">Codice Valuta</label>
                <input type="text" id="valuta" name="valuta" required />
              </div>
              <div class="form-group animated">
                <button type="submit" class="btn-animated">Add</button>
              </div>
            </form>
          </div>
        </body>
      </html>
      <?php
  }
?>

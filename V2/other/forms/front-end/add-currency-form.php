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
          <title>Add Currency Form</title>
          <link rel="stylesheet" href="styles.css" />
        </head>
        <body>
          <div class="container">
            <h2 class="animated">Add Currency</h2>
            <form action="../back-end/add-currency.php" method="post">
              <div class="form-group animated">
                <label for="nome">Nome valuta</label>
                <input type="text" id="nome" name="nome" required />
              </div>
              <div class="form-group animated">
                <label for="codice">Codice valuta</label>
                <input type="text" id="codice" name="codice" required />
              </div>
              <div class="form-group animated">
                <label for="simbolo">simbolo valuta</label>
                <input type="text" id="simbolo" name="simbolo" required />
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

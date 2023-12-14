
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sign In Form</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <?php
      if(isset($_GET['errore'])){
        echo "<h1>Errore di autenticazione</h1>";
      }
    ?>
    <div class="container">
      <h2 class="animated">Log In</h2>
      <form action="auth-v2.php" method="post">
        <div class="form-group animated">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div class="form-group animated">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div class="form-group animated">
          <button type="submit" class="btn-animated">Sign In</button>
          <a href="http://127.0.0.1/5ia/forms/signUpForm/signUp.html">Sign up</a>
        </div>
      </form>
    </div>
  </body>
</html>

<?php
session_start();  //很重要，可以用的變數存在session裡
$username=$_SESSION["username"];
// $_SESSION["username"]=$username;
echo "<h1>你好 ".$username."</h1>";
echo "<a href='lobby.php'>LOBBY</a><br>";
echo "<a href='logout.php'>登出</a>";
?>
<!DOCTYPE html>
<!--
<html>
<body>
    <main id="room__welcome__container">
        <div id="form__container">
            <form id="welcome__form">
                 <div class="form__field__wrapper">
                     <label>Room Name</label>
                     <input type="text" name="room" placeholder="Enter room name..." />
                 </div>

                 <div class="form__field__wrapper">
                     <button type="submit">Go to Room</button>
                 </div>
            </form>
        </div>
     </main>
</body>
<script type="text/javascript" src="js/welcome.js"></script>
</html>
 -->

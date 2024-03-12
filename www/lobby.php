<?php
session_start();
$username=$_SESSION["username"];
// echo "<h1>你好 ".$username."</h1>";
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Room</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link rel='stylesheet' type='text/css' media='screen' href='styles/main.css'>
    <link rel='stylesheet' type='text/css' media='screen' href='styles/lobby.css'>
    <script src="./js/color_system.js"></script>
    <link rel="shortcut icon" href="favicon.ico">

</head>
<body>

        <header id="nav">
       <div class="nav--list">
            <a href="lobby.php">
                <h3 id="logo">
                    <img src="./images/logo.png" alt="Site Logo">
                    <span>NTUST Live</span>
                </h3>
            </a>
       </div>

        <!-- <div id="nav__links">
            <a class="nav__link" id="create__room__btn" href="logout.php">
                登出
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ede0e0" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"/></svg>
            </a>
        </div> -->
        <div id="nav__links">
            <a class="nav__link"id="Toggle" class="Toggle">
                更改主題
                <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ede0e0" viewBox="0 0 24 24"><path d="M20 7.093v-5.093h-3v2.093l3 3zm4 5.907l-12-12-12 12h3v10h7v-5h4v5h7v-10h3zm-5 8h-3v-5h-8v5h-3v-10.26l7-6.912 7 6.99v10.182z"/></svg> -->
            </a>
            <a class="nav__link create__room__btn"  href="logout.php" >
                登出
               <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ede0e0" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"/></svg> -->
            </a>
        </div>
    </header>

    <main id="room__lobby__container">
        <div id="form__container">
             <div id="form__container__header">
                <p>
                    <span id = "Name"></span><?php echo $username;?>！
                </p>
                 <br>
                 <p>請輸入房號並選擇角色</p>
             </div>
 
 
            <form id="lobby__form">
 
                 <div hidden class="form__field__wrapper">
                     <label>Your Name</label>
                     <input type="text" name="name" value="<?php echo $username; ?>"/>
                 </div>
 
                 <div class="form__field__wrapper">
                     <label>> 房號</label>
                     <input type="text" name="room" placeholder="輸入房號..." />
                 </div>
                 <!-- <input type="checkbox" id="Host_chb" name="Host_chb"><label for="Host_chb">主持人</label> -->
                 <div class="CheckBoxDiv">
                    <input id="Host_chb" class="switch-input" type="checkbox" name="Host_chb" title="checkBox" placeholder="checkBox"/>
                    <label for="Host_chb" class="switch"></label>
                    <p class ="CheckBoxText">成為主持人</p>
                </div>

                 <div class="form__field__wrapper">
                     <button type="submit">前往直播間 ➜
                         <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/></svg> -->
                    </button>
                 </div>
            </form>
        </div>
     </main>
    
</body>
<script type="text/javascript" src="./js/lobby.js"></script>
<script>
    document.getElementById('Toggle').addEventListener('click', ()=>{
        color_remember(true); 
    });
</script>

<style>
  .CheckBoxDiv {
    display: flex;
    align-items: center;
    width: 100%;
  }
  .CheckBoxText{
    padding-left:10px;
  }
</style>

</html>

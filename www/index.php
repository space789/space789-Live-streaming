<?php
// Initialize the session
session_start();
 
// Check if the user is already logged in, if yes then redirect him to welcome page
if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
    header("location: lobby.php");
    exit;  //記得要跳出來，不然會重複轉址過多次
}
?>
<!-- <html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>登入介面</title>
</head>
<body>
    <h1>Log In</h1>
    <h2>你可以選擇登入或是註冊帳號~</h2>
<form method="post" action="login.php">
帳號：
<input type="text" name="username"><br/><br/>
密碼：
<input type="password" name="password"><br><br>
<input type="submit" value="登入" name="submit"><br><br>
<a href="register.html">還沒有帳號？現在就註冊！</a>
</form>
</body>
</html> -->

<html lang="zh-TW">
<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Room</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link rel='stylesheet' type='text/css' media='screen' href='styles/main.css'>
    <link rel='stylesheet' type='text/css' media='screen' href='styles/lobby.css'>
    <!-- <link rel="shortcut icon" href="favicon.ico"> -->
    <!-- <link rel="icon" href="/favicon.ico" type="image/x-icon" /> -->
    <!-- <link rel="icon" type="image/x-icon" href="./favicon.ico"> -->
    <!-- <link rel="icon" href="/favicon.ico" type="image/x-icon"/> -->
    <link rel="shortcut icon" href="favicon.ico">
    <!-- <link rel="shortcut icon" href="https://moodle2.ntust.edu.tw/pluginfile.php/1/theme_moove/favicon/1659609679/NTUST.ico"> -->

</head>
<body id = "mainView">

        <header id="nav">
       <div class="nav--list">
            <a href="index.php">
                <h3 id="logo">
                    <img src="./images/logo.png" alt="Site Logo">
                    <span>NTUST Live</span>
                </h3>
            </a>
       </div>

        <div id="nav__links">
            <a class="nav__link" href="register.html">
                註冊
                <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ede0e0" viewBox="0 0 24 24"><path d="M20 7.093v-5.093h-3v2.093l3 3zm4 5.907l-12-12-12 12h3v10h7v-5h4v5h7v-10h3zm-5 8h-3v-5h-8v5h-3v-10.26l7-6.912 7 6.99v10.182z"/></svg> -->
            </a>
            <a class="nav__link create__room__btn" id="Toggle" class="Toggle">
                更改主題
               <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ede0e0" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"/></svg> -->
            </a>
        </div>
    </header>

    <main id="room__lobby__container">
        <div id="form__container">
             <div id="form__container__header">
                 <p size="1">歡迎光臨 NTUST Live!</p>
             </div>
 
 
            <form method="post" action="login.php" id="lobby__form">
 
                 <div class="form__field__wrapper">
                     <label>> 帳號</label>
                     <input class = "textInput" type="text" name="username" placeholder="輸入帳號..">
                     <!-- <input type="text" name="name" value="<?php echo $username; ?>"/>  -->
                 </div>
 
                 <div class="form__field__wrapper">
                     <label>> 密碼</label>
                     <input class = "textInput" type="password" name="password" placeholder="輸入密碼..." />
                 </div>

                 <div class="form__field__wrapper">
                     <button type="submit" value="登入" name="submit">登入  ➜
                         <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/></svg> -->
                    </button>
                    <button type="button" value="註冊" onclick="window.location.href='register.html';">註冊  ➜
                         <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/></svg> -->
                    </button>
                    <!-- <a name="register" href="register.html">註冊       請不要使用anchor製作間諜按鈕，提升畫面一致性你我有責。
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/></svg>
                    </a> -->
                 </div>
            </form>
        </div>
     </main>
</body>
<script src="./js/color_system.js"></script>
<script type="text/javascript">
    // function color_remember(inverse){
    //     var r = document.querySelector(':root');
    //     if((localStorage.getItem('favColor') == 'Dark') ^ inverse)
    //     {
    //         //把畫面變成暗的
    //         r.style.setProperty('--primary-back-color', '#1a1a1a');
    //         r.style.setProperty('--secondary-back-color', '#262625');
    //         r.style.setProperty('--tow-point-five-back-color', '#363739');
    //         r.style.setProperty('--third-back-color', '#3f434a');
    //         r.style.setProperty('--extinguish-back-color', '#124296');
    //         r.style.setProperty('--text-color', '#fff');
    //         // document.cookie = `favColor=Dark; expires=${date.toUTCString()}`;
    //         localStorage.setItem('favColor', 'Dark');
    //     }
    //     else
    //     {
    //         //把畫面變成白的
    //         r.style.setProperty('--primary-back-color', '#e5e5e5');
    //         r.style.setProperty('--secondary-back-color', '#d9d9da');
    //         r.style.setProperty('--tow-point-five-back-color', '#c9c8c6');
    //         r.style.setProperty('--third-back-color', '#e7e7e7');
    //         r.style.setProperty('--extinguish-back-color', '#124296');
    //         r.style.setProperty('--text-color', '#000');
    //         // document.cookie = `favColor=Light; expires=${date.toUTCString()}`;
    //         localStorage.setItem('favColor', 'Light');
    //     }
    // }
    
    // color_remember(false);
    // Cookie解析器  source:https://stackoverflow.com/questions/5142337/read-a-javascript-cookie-by-name
    // function getCookiesMap(cookiesString) {
    //     return cookiesString.split(";")
    // .map(function(cookieString) {
    //     return cookieString.trim().split("=");
    // })
    // .reduce(function(acc, curr) {
    //     acc[curr[0]] = curr[1];
    //     return acc;
    // }, {});
    // }
    var date = new Date();
    // const cookies = getCookiesMap(document.cookie);
    date.setDate(date.getDate() + 365)
    document.getElementById('Toggle').addEventListener('click', ()=>{
        color_remember(true);
        
    });
    
    sessionStorage.clear();

</script>
</html> 




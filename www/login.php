<?php
// Include config file
$conn=require_once "config.php";
 
// Define variables and initialize with empty values
$username=$_POST["username"];
$password=$_POST["password"];
//增加hash可以提高安全性
$password_hash=md5($password);
// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){
    $sql = "SELECT * FROM users WHERE username ='".$username."'";
    $result=mysqli_query($conn,$sql);
 // $row = mysqli_fetch_assoc($result);
    if(mysqli_num_rows($result)==1 && $password_hash==mysqli_fetch_assoc($result)["password"]){
        session_start();
        // Store data in session variables
        $_SESSION["loggedin"] = true;
        //這些是之後可以用到的變數
        $_SESSION["id"] = mysqli_fetch_assoc($result)["id"];
        $_SESSION["username"] = $username;
        header("location:lobby.php");
    }else{
            function_alert("帳號或密碼錯誤"); 
        }
}
    else{
        function_alert("Something wrong"); 
    }

    // Close connection
    mysqli_close($link);

function function_alert($message) { 
      
    // Display the alert box  
    echo "<script>alert('$message');
     window.location.href='index.php';
    </script>"; 
    return false;
} 
?>
?>

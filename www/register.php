<?php 
$conn=require_once("config.php");

if($_SERVER["REQUEST_METHOD"]=="POST"){
//  echo "verygood!!!";
    $username=$_POST["username"];
    $email=$_POST["email"];
    $password=$_POST["password"];
    //檢查帳號是否重複
    $check="SELECT * FROM users WHERE username='".$username."'";
//  echo "$username";
//  echo "$password";
//  $sql="INSERT INTO users (username,email,password)
//        VALUES('".$username."','aaa','".$password."')";
//  echo "last step!";
//  if(mysqli_query($conn,$sql) == 0){
//    echo "baaaaaaaaaaaaaaaaaaaaaaaad!!!!!!";
//  }
//  else{
//          echo "sceuss!!!!!!";
//  }
//  echo "scuess";
//  header("refresh:32;url=index.php");
    if(mysqli_num_rows(mysqli_query($conn,$check))==0){
        $sql="INSERT INTO users (username,email,password,donate,earn)
              VALUES('".$username."','".$email."',md5('".$password."'),0,0)";
       
        if(mysqli_query($conn,$sql)){
            ob_start();                
            echo "註冊成功!3秒後將自動跳轉頁面<br>";
            echo "<a href='index.php'>未成功跳轉頁面請點擊此</a>";
            header("Refresh:1;url=index.php");
            exit;
            ob_end_flush();
        }else{
            echo "Error creating table: " . mysqli_error($conn);
        }
    }
    else{
        ob_start();
        echo "該帳號已有人使用!<br>3秒後將自動跳轉頁面<br>";
        echo "<a href='register.html'>未成功跳轉頁面請點擊此</a>";
        header("Refresh:1;url=register.html");
        //header("refresh:3;url=register.html",true);
        exit;
        ob_end_flush();
    }
}


mysqli_close($conn);

function function_alert($message) { 
      
    // Display the alert box  
    echo "<script>alert('$message');
     window.location.href='index.php';
    </script>"; 
    
    return false;
} 
?>

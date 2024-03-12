<?php
    session_start();
    $conn=require_once "config.php";

    if($_SERVER["REQUEST_METHOD"] == "POST")
    {
        $str_decode = json_decode(file_get_contents("php://input"), true,512,JSON_UNESCAPED_UNICODE);
        $str_arr = array_values($str_decode);

        $url=$str_arr[0];
        $title=$str_arr[1];
        $time=$str_arr[2];

        $sql = "INSERT INTO music (title,url,time) VALUE ('".$title."','".$url."','".$time."');";
        $result=mysqli_query($conn,$sql);

        //SELECT COUNT(*) FROM music;

        $sql = "SELECT COUNT(*) FROM music";
        $result=mysqli_query($conn,$sql);
        $cnt=mysqli_fetch_assoc($result)["COUNT(*)"];

        echo $cnt;
        // echo $title;
    }
    
?>
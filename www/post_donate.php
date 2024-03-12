<?php
    session_start();
    $username=$_SESSION["username"];

    $post_money=$_POST["money"];
    $post_username=$_POST["username"];

    $conn=require_once "config.php";
    $sql = "UPDATE users SET donate=$post_money WHERE username ='".$post_username."'";
    $result=mysqli_query($conn,$sql);

    // echo json_encode($post_money);   
    // echo json_encode($post_username);   
?>
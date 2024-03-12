<?php
    session_start();
    $conn=require_once "config.php";

    if($_SERVER["REQUEST_METHOD"] == "POST")
    {
        $sql = "TRUNCATE music;";
        $result=mysqli_query($conn,$sql);        
    }
    
?>
<?php
    session_start();
    $conn=require_once "config.php";

    if($_SERVER["REQUEST_METHOD"] == "POST")
    {
        $sql = "DELETE FROM music WHERE title=('".$_POST["title"]."');";
        $result=mysqli_query($conn,$sql);        
    }
    
?>
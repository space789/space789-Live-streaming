<?php
    session_start();
    $conn=require_once "config.php";

    if($_SERVER["REQUEST_METHOD"] == "POST")
    {
        $post_room=$_POST["room"];
        $_SESSION['room']=$post_room;

        $sql = "SELECT * FROM host WHERE roomId ='".$_SESSION['room']."'";
        $result=mysqli_query($conn,$sql);
        $hostname=mysqli_fetch_assoc($result)["name"];

        if($hostname==null)
        {
            echo "There are no host in room";
        }
        else
        {
            echo $hostname;
            // echo $_SESSION['room'];
            // echo $hostname;
        }
        // echo $sql;
        // echo $_SESSION['room'];
        // echo $result;
    }
    
?>
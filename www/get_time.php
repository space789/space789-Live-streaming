<?php
    session_start();
    $conn=require_once "config.php";

    if($_SERVER["REQUEST_METHOD"] == "POST")
    {
        $post_room=$_POST["room"];
        $_SESSION['room']=$post_room;

        $sql = "SELECT * FROM host WHERE roomId ='".$_SESSION['room']."'";
        $result=mysqli_query($conn,$sql);
        $time=mysqli_fetch_assoc($result)["time"];

        if($time==null)
        {
            echo "There are no host in room";
        }
        else
        {
            $now=time();
            $diff=$now-(int)$time;
            echo $diff;
        }
            
 
        
    }
    
?>
<?php
    session_start();
    $conn=require_once "config.php";

    if($_SERVER["REQUEST_METHOD"] == "POST")
    {
        $post_room=$_POST["room"];
        $_SESSION['room']=$post_room;

        $post_host=$_POST["host"];
        $_SESSION['host']=$post_host;

        if($_POST["ishost"]=="1")
        {
            $sql = "SELECT * FROM host WHERE roomId ='".$_SESSION['room']."'";
            $result=mysqli_query($conn,$sql);
            $hostname=mysqli_fetch_assoc($result)["name"];

            if($hostname!=null)
            {
                echo "have host in room";
            }
            else
            {
                //SELECT * FROM users WHERE username ="QWE";
                //REPLACE INTO host (roomId,name) VALUES ("ASD","aaa");
                //DELETE from host where roomId="asd";
                //alter table host add column time int;
                // $sql = "DELETE from host where roomId='".$post_room."'"; 
                // $result=mysqli_query($conn,$sql);
                $time=time();
                $sql = "INSERT INTO host (roomId,name,time) VALUE ('".$post_room."','".$post_host."','".$time."')";
                $result=mysqli_query($conn,$sql);
            }
            
        }
        else
        {
            //DELETE from host where roomId="asd";
            $sql = "DELETE from host where roomId='".$post_room."' and name='".$post_host."'"; 
            $result=mysqli_query($conn,$sql);
        }
        
    }
    
?>
<?php
    // require_once("post_host.php");
    session_start();

    $conn=require_once "config.php";
    $username=$_SESSION["username"];

    if($_SERVER["REQUEST_METHOD"] == "GET")
    {

        $sql = "SELECT * FROM host WHERE roomId ='".$_SESSION['room']."'";
        $result=mysqli_query($conn,$sql);
        $hostname=mysqli_fetch_assoc($result)["name"];
    
        if($hostname!=null)
        {
            $sql = "SELECT * FROM users WHERE username ='".$hostname."'";
            // SELECT * FROM users WHERE username ="QWE";
            $result=mysqli_query($conn,$sql);
            $donate=mysqli_fetch_assoc($result)["donate"];
            // echo "".$username."".$donate."";
            $return = array();   
            $return["username"] = $hostname;
            $return["donate"] = $donate;
            echo json_encode($return);   

        }
        else
        {
            $return = array();
            $return["username"] = $_SESSION['room'];
            $return["donate"] = -1;
            echo json_encode($return);   
        }
    
    }

?>
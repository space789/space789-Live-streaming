<?php
    session_start();
    $conn=require_once "config.php";

    if($_SERVER["REQUEST_METHOD"] == "POST")
    {
        $sql = "SELECT * FROM music WHERE ID=(SELECT MIN(ID) FROM music);";
        $result=mysqli_query($conn,$sql);
        $row=mysqli_fetch_assoc($result);
        // $url=mysqli_fetch_assoc($result)["url"];
        // $title=mysqli_fetch_assoc($result)["title"];

        $return = array();
        $return["url"] = $row["url"];
        $return["title"] = $row["title"];
        echo json_encode($return);   

        
        
    }
    
?>
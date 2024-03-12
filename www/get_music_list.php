<?php
    session_start();
    $conn=require_once "config.php";

    if($_SERVER["REQUEST_METHOD"] == "GET")
    {
        $sql = "SELECT title FROM music;";
        $result=mysqli_query($conn,$sql);

        $arr = array();
        while($row=mysqli_fetch_assoc($result))
        {
            $arr[] = $row; 
        }

        echo json_encode($arr);
        // $url=mysqli_fetch_assoc($result)["url"];
        // $title=mysqli_fetch_assoc($result)["title"];

        
        // echo $row["url"][0];
    }
    
?>
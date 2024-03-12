<?php

    $curl = curl_init();

    curl_setopt_array($curl, array(
    CURLOPT_URL => '', // Add the API URL here
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'POST',
    CURLOPT_POSTFIELDS =>'https://www.youtube.com/watch?v=bbdXZQLPZoo',
    CURLOPT_HTTPHEADER => array(
        'link: https://www.youtube.com/watch?v=bbdXZQLPZoo',
        'Content-Type: text/plain'
    ),
    ));

    $response = curl_exec($curl);

    curl_close($curl);
    echo $response;

?>
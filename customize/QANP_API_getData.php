<?php
//For QNAP API 抓資料下來  處理  CORB  問題
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");

$curl = curl_init();
//$data = array();
curl_setopt_array($curl, array(
    CURLOPT_PORT => "8080",
    CURLOPT_URL => "http://61.220.204.182:8080/share.cgi?ssid=0Ima1tf&func=get_list&sort=filename&dir=ASC",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CUSTOMREQUEST => "GET",
    CURLOPT_SSL_VERIFYPEER => FALSE,
    CURLOPT_HTTPHEADER => array(
        'Content-type: application/json',
    ),
//    CURLOPT_POSTFIELDS => json_encode($data)
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);
//$responseData = json_decode($response, TRUE);

if($err){
    echo "cURL Error #:" . $err;
}else {
    echo $response;
}

?>

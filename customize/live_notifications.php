<?php
  // POST won't work for JSON data
  $problem = "No errors";
  $notificationType = null;
  try {
      $json    = file_get_contents('php://input');
      $decoded = json_decode($json, true);
      // turn notification into pretty printed JSON
      $notification = json_encode($decoded, JSON_PRETTY_PRINT);
  } catch (Exception $e) {
      $problem = $e->getMessage();
      $notification = $json;
  }

    // $logEntry = $notification."\n \n";
    // $logEntry = $notification.",";

    // Tell PHP where it can find the log file and tell PHP to open it
    // and add the string we created earlier to it.
    // json txt
      $logFileLocation = "live-log_san.json";
    // a 參數
      $fileHandle      = fopen($logFileLocation, 'w') or die("-1");
      fwrite($fileHandle, $notification);
    //fwrite($fileHandle, $logEntry);
      fclose($fileHandle);

  // line below is displayed when you browse the app directly
  echo "Live callback app is running<br/>";
  
  
$data = json_decode($notification, true);  
  
// 印出 state 存取 
echo "state: ".$data['job']['state']."<br/>";
$state = $data['job']['state'];

// 印出 create time 存取
echo "created_at: ".$data['job']['created_at']."<br/><br/>";
$o_time = $data['job']['created_at'];

echo "這是 server 的時間（GMT+0)<br/>";

// video_id & job_id
echo "video_id: ".$data['job']['job_videocloud_asset_id']."<br/>";
$video_id = $data['job']['job_videocloud_asset_id'];
echo "job_id: ".$data['job']['id']."<br/><br/>";
$job_id = $data['job']['id'];

// 跑檔印出當前的時間
date_default_timezone_set("Asia/Taipei");
echo "Now is ".date("Y-m-d_H:i:s a");
$now = date("Y-m-d_H:i:s a");

// send e-mail for msg
$to = "indianstau@linfair.com.tw";
$subject = "From BC Live stream state message";

$message = "Hi,\n\nVideo_id:".$video_id."\njob_id:".$job_id."\n\n這是來自 Brightcove 的通知\n目前 Live stream 己經進入 ".$state." \n在 ".$now."\n有任何問題再麻煩您與我聯繫\n\n謝謝\nIP SYSTEMS 宜沛科技股份有限公司\nE-mail: indianstau@linfair.com.tw";

$headers = "From :IP SYSTEMS000webhost@com.tw"."\r\n";
mail($to, $subject, $message, $headers);

echo "<br/>Here is ready to send e-mail";

?>

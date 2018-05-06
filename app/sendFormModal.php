<?php

// adress email where
$sendto = "info@site.ru";

// adress email from
$usermail = "info@site.ru";


$name  =  $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$numerid = $_POST['num'];

// Формирование заголовка письма
$subject  = "Новое сообщение";
$headers  = "From: " . strip_tags($usermail) . "\r\n";
$headers .= "Reply-To: ". strip_tags($usermail) . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html;charset=utf-8 \r\n";
// Формирование тела письма
$msg  = "<html><body style='font-family:Arial,sans-serif;'>";
$msg .= "<h2 style='font-weight:bold;border-bottom:1px dotted #ccc;'>Новое сообщение</h2>\r\n";
$msg .= "<p><strong>Имя:</strong> ".$name."</p>\r\n";
$msg .= "<p><strong>Телефон:</strong> ".$phone."</p>\r\n";
$msg .= "<p><strong>E-mail:</strong> ".$email."</p>\r\n";
$msg .= "<p><strong>Форма:</strong> ".$numerid."</p>\r\n";
$msg .= "</body></html>";

// отправка сообщения
if(@mail($sendto, $subject, $msg, $headers)) {
  echo "true";
} else {
  echo "false";
}

?>
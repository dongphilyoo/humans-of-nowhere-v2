<?php
header("Expires: Tue, 01 Jan 2000 00:00:00 GMT");
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

// DATABASE SETTINGS - CHANGE TO YOUR OWN !
define("DB_HOST", "mysql.dongphilyoo.com");
define("DB_NAME", "humans_of_nowhere");
define("DB_CHARSET", "utf8");
define("DB_USER", "dongphilyoocom3");
define("DB_PASSWORD", "D2PazQYn");
 
// CONNECT TO DATABASE
try {
  $pdo = new PDO(
    "mysql:host=" . DB_HOST . ";charset=" . DB_CHARSET . ";dbname=" . DB_NAME,
    DB_USER, DB_PASSWORD, [
      PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
      PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_NAMED
    ]
  );
} catch (Exception $ex) { exit($ex->getMessage()); }

// GET DATA
$stmt = $pdo->prepare("SELECT * FROM `gallery`");
$stmt->execute();
$items = $stmt->fetchAll();
// echo json_encode(array_reverse($items), JSON_PRETTY_PRINT);
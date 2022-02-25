<?php
header("Content-type: text/html; charset=utf-8");

$conn = new mysqli('mysql.dongphilyoo.com', 'dongphilyoocom3', 'D2PazQYn', 'humans_of_nowhere');

$conn->set_charset("utf8mb4");
// $jsonString = file_get_contents("php://input");
// $phpObject = json_decode($jsonString);
// echo "<scrip;>console.log('$phpObject')</script>";
// $sql="INSERT INTO `gallery` (`item`) VALUES ('$text')";

// $data = json_decode(file_get_contents("php://input"));

$text = $_POST['text'];
$image = $_POST['image'];
$class = $_POST['class'];

// echo $text . $image;

$sql="INSERT INTO `gallery` (`image`, `text`, `class`) VALUES ('$image', '$text', '$class')";

if ($conn->query($sql) === TRUE) {
    echo "data inserted";
}
else 
{
    echo "failed";
}



// $input = json_decode(file_get_contents('php://input'), true);

// // // $output_img = $_POST['output_img'];
// // $output = $_POST['output'];
// // // $str = $output.text();

// $x = $_POST['x'];

// echo "<div>'.$x.'</div>";

// $jsondata = '{ "image":"ddddddd", "text":"sgsgsgsgssg"}';
// //   $data = json_decode($josndata);
// //   $singledata = $data->student->name;
  
// $servername = "localhost";
// $username = "root";
// $password = "root";
// $dbname = "humans_of_nowhere";

// // Database connection
// $conn = new mysqli($servername, $username, $password, $dbname);

// $sql = "INSERT INTO gallery ( item ) VALUES ('$jsondata')";

// if ($conn->query($sql) === TRUE) {
//   echo "Store data only single successfully";
// }  
?>
<?php
require "../utils/response.php";

$DB_HOST = "172.19.0.2";
$DB_PORT = 3306;
$DB_USER = "admin";
$DB_PASS = "test";
$DB_NAME = "database";

$conn = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME, $DB_PORT);

if (!$conn) {
  die("Database connection failed" . mysqli_connect_error());
}

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
// get request method
$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {
  $person_id = (int)($_GET['person_id']);
  if ($person_id == null) {
    $sql = "SELECT * FROM person";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
      $data = array();
      while ($row = $result->fetch_assoc()) {
        $data[] = $row;
      }
      response($data);
    } else {
      response("No data found", 404);
    }
  } else {
    $sql = "SELECT * FROM person WHERE id = $person_id";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
      $row = $result->fetch_assoc();
      response($row);
    } else {
      response("No person found", 404);
    }
  }
}
if ($method == 'POST') {
  $person_id = $_POST['id'];
  $first_name = $_POST["first_name"];
  $last_name = $_POST["last_name"];
  $age = $_POST["age"];
  $address = $_POST["address"];
  $occupation = $_POST["occupation"];
  $gender = $_POST["gender"];
  if ($first_name == null || $last_name == null || $age == null || $address == null || $occupation == null || $gender == null) {
    response("Missing fields", 400);
  }
  $sql = "INSERT INTO person (first_name, last_name, age, address, occupation, gender) VALUES ('$first_name', '$last_name', $age, '$address', '$occupation', '$gender')";
  if ($person_id != null && $person_id != "undefined" && $person_id != "") {
    $sql = "UPDATE person SET first_name='$first_name', last_name='$last_name', age=$age, address='$address', occupation='$occupation', gender='$gender' WHERE id=$person_id";
  }
  if ($conn->query($sql) === TRUE) {
    response("Successful");
  } else {
    response("Error: " . $sql . "<br>" . $conn->error, 500);
  }
}
if ($method == 'DELETE') {
  $person_id = $_GET['person_id'];
  if ($person_id == null) {
    response("Missing person_id", 400);
  }
  $sql = "DELETE FROM person WHERE id=$person_id";
  if ($conn->query($sql) === TRUE) {
    response("Successful");
  } else {
    response("Error: " . $sql . "<br>" . $conn->error, 500);
  }
}

$conn->close();

<?php
include("connection.php");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = mysqli_real_escape_string($conn, $_POST['name']);
    $sql = "SELECT * FROM applicant_info WHERE fullname = ? LIMIT 1";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $name);
    $stmt->execute();
    $result = $stmt->get_result();
    $user_data = $result->fetch_assoc();

    if (mysqli_num_rows($result) > 0) {
        echo json_encode($user_data);
    } else {
        echo '';
    }

    // Close the database connection
    $stmt->close();
    $conn->close();
    exit();
}

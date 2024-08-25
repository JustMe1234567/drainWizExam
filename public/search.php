<?php
include("connection.php");

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['name'])) {
    $name = $_POST['name'];
    $sql = "SELECT fullname FROM applicant_info WHERE fullname LIKE ? ORDER BY created_at DESC LIMIT 3";
    $stmt = $conn->prepare($sql);
    $likeName = "%" . $name . "%";
    $stmt->bind_param("s", $likeName);
    $stmt->execute();
    $result = $stmt->get_result();

    $names = [];
    while ($row = $result->fetch_assoc()) {
        $names[] = $row['fullname'];
    }

    echo json_encode($names);
    $stmt->close();
    $conn->close();
}
?>

<?php
include("connection.php");  

// Check the request method
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    // Query to get data
    $sql = "SELECT * FROM applicant_info ORDER BY created_at DESC LIMIT 1";
    $result = $conn->query($sql);

    // Check if there's a result
    if ($result->num_rows > 0) {
        $latest_applicant = $result->fetch_assoc();
        echo json_encode($latest_applicant);  // Output the result as JSON
    } else {
        echo json_encode([]);
    }

    $conn->close();  // Close the connection
}

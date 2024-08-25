<?php
include("connection.php");

function random_num() {
    $text = '';
    $len = rand(5, 9);

    for ($i = 0; $i < $len; $i++) {
        $text .= rand(0, 9);
    }

    return $text;
}

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    // Retrieve and trim input parameters
    $firstName = trim($_POST['firstName'] ?? '');
    $midName = trim($_POST['midName'] ?? '');
    $lastName = trim($_POST['lastName'] ?? '');
    $suffix = trim($_POST['suffix'] ?? ''); 
    $mobileNumber = trim($_POST['mobileNumber'] ?? '');
    $email = trim($_POST['email'] ?? '');

    // Validate input parameters
    if (empty($firstName) || empty($lastName) || empty($mobileNumber) || empty($email)) {
        echo json_encode(['success' => false, 'message' => 'Required fields are missing.']);
        exit;
    }

    $fullName = "{$firstName} {$midName} {$lastName}" . ($suffix ? " $suffix" : "");
    $applicantCodeId = random_num();
    $applicantNumber = random_num();

    // Check if the full name already exists
    $stmt2 = $conn->prepare("SELECT * FROM applicant_info WHERE fullname = ? LIMIT 1");
    $stmt2->bind_param("s", $fullName);
    $stmt2->execute();
    $result2 = $stmt2->get_result();

    if ($result2->num_rows == 0) {
        // Full name does not exist, proceed to insert the new record
        $stmt = $conn->prepare("INSERT INTO applicant_info (applicantcodeid, applicantno, lastname, firstname, midname, suffix, fullname, mobileno, emailadd) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssssssss", $applicantCodeId, $applicantNumber, $lastName, $firstName, $midName, $suffix, $fullName, $mobileNumber, $email);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Record added successfully.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to add record.']);
        }
        $stmt->close();
        $stmt2->close();
    } else {
        // Full name already exists
        echo json_encode(['success' => false, 'message' => 'Record already exists.']);
        $stmt2->close();
    }

    
    
    $conn->close();
}
?>

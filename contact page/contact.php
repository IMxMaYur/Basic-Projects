<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];

    // Basic validation
    if (empty($name) || empty($email) || empty($message)) {
        // Handle validation errors, e.g., redirect back to the form with an error message
        header("Location: contact.php?error=1");
        exit();
    }

    // Email format validation
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Handle invalid email format, e.g., redirect back to the form with an error message
        header("Location: contact.php?error=2");
        exit();
    }

    // Process the form data (e.g., save to a database, send email notification)

    // Example: Sending an email
    $to = "mayurgiri16@email.com";
    $subject = "New Contact Form Submission";
    $headers = "From: $email";

    mail($to, $subject, $message, $headers);

    // Redirect to a thank-you page or display a confirmation message
    header("Location: thank-you.html");
    exit();
}
?>

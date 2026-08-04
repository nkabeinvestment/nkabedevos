<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON input']);
    exit;
}

$required = ['name', 'email', 'message'];
foreach ($required as $field) {
    if (empty($input[$field])) {
        http_response_code(400);
        echo json_encode(['error' => "$field is required"]);
        exit;
    }
}

$name = htmlspecialchars(strip_tags($input['name']));
$email = filter_var($input['email'], FILTER_SANITIZE_EMAIL);
$company = isset($input['company']) ? htmlspecialchars(strip_tags($input['company'])) : '';
$subject = isset($input['subject']) ? htmlspecialchars(strip_tags($input['subject'])) : 'general';
$message = htmlspecialchars(strip_tags($input['message']));

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email address']);
    exit;
}

$log_entry = date('Y-m-d H:i:s') . " | Name: $name | Email: $email | Company: $company | Subject: $subject | Message: $message\n";
$log_file = __DIR__ . '/contact_submissions.log';
file_put_contents($log_file, $log_entry, FILE_APPEND | LOCK_EX);

$email_to = 'hello@apexvc.com';
$email_subject = "[Apex VC Contact] $subject - $name";
$email_body = "Name: $name\nEmail: $email\nCompany: $company\nSubject: $subject\n\nMessage:\n$message\n";
$email_headers = "From: noreply@apexvc.com\r\nReply-To: $email\r\nX-PHP-Originating-Script: contact.php";

@mail($email_to, $email_subject, $email_body, $email_headers);

echo json_encode([
    'message' => 'Your message has been received. We will get back to you within 24-48 hours.',
    'reference' => 'AVC-' . date('Ymd') . '-' . strtoupper(substr(md5($email . time()), 0, 6))
]);

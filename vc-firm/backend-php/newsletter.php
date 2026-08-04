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

if (empty($input['email'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Email is required']);
    exit;
}

$email = filter_var($input['email'], FILTER_SANITIZE_EMAIL);
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email address']);
    exit;
}

$subscribers_file = __DIR__ . '/newsletter_subscribers.json';
$subscribers = [];
if (file_exists($subscribers_file)) {
    $subscribers = json_decode(file_get_contents($subscribers_file), true) ?: [];
}

foreach ($subscribers as $sub) {
    if ($sub['email'] === $email) {
        echo json_encode(['message' => 'You are already subscribed to our newsletter.']);
        exit;
    }
}

$subscribers[] = [
    'email' => $email,
    'subscribed_at' => date('c'),
    'active' => true,
    'source' => 'website'
];

file_put_contents($subscribers_file, json_encode($subscribers, JSON_PRETTY_PRINT));

$notification_to = 'marketing@apexvc.com';
$notification_subject = "New Newsletter Subscriber: $email";
@mail($notification_to, $notification_subject, "New subscriber: $email\nDate: " . date('Y-m-d H:i:s'), "From: noreply@apexvc.com");

echo json_encode([
    'message' => 'Successfully subscribed to the Apex Ventures newsletter. You will receive our weekly insights digest every Monday.',
    'email' => $email
]);

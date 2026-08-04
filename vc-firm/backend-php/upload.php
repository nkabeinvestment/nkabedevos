<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$upload_dir = __DIR__ . '/uploads';
if (!is_dir($upload_dir)) {
    mkdir($upload_dir, 0755, true);
}

if (empty($_FILES['file'])) {
    http_response_code(400);
    echo json_encode(['error' => 'No file uploaded']);
    exit;
}

$file = $_FILES['file'];
$allowed_types = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation'
];
$allowed_extensions = ['pdf', 'doc', 'docx', 'ppt', 'pptx'];
$max_size = 20 * 1024 * 1024;

$extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
if (!in_array($extension, $allowed_extensions)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid file type. Allowed: PDF, DOC, DOCX, PPT, PPTX']);
    exit;
}

if ($file['size'] > $max_size) {
    http_response_code(400);
    echo json_encode(['error' => 'File too large. Maximum size: 20MB']);
    exit;
}

if ($file['error'] !== UPLOAD_ERR_OK) {
    http_response_code(500);
    echo json_encode(['error' => 'Upload failed with error code: ' . $file['error']]);
    exit;
}

$company_name = isset($_POST['company']) ? htmlspecialchars(strip_tags($_POST['company'])) : 'unknown';
$founded_name = isset($_POST['founder']) ? htmlspecialchars(strip_tags($_POST['founder'])) : 'unknown';
$timestamp = date('Ymd_His');
$safe_company = preg_replace('/[^a-zA-Z0-9]/', '_', $company_name);
$new_filename = "{$safe_company}_{$timestamp}.{$extension}";
$destination = "{$upload_dir}/{$new_filename}";

if (move_uploaded_file($file['tmp_name'], $destination)) {
    $log_entry = date('Y-m-d H:i:s') . " | Company: $company_name | Founder: $founded_name | File: $new_filename | Size: " . $file['size'] . " bytes\n";
    file_put_contents(__DIR__ . '/upload_log.log', $log_entry, FILE_APPEND | LOCK_EX);

    echo json_encode([
        'message' => 'Pitch deck uploaded successfully. Our investment team will review it within 5-7 business days.',
        'filename' => $new_filename,
        'size' => $file['size'],
        'company' => $company_name
    ]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save uploaded file']);
}

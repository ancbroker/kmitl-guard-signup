<?php
// Simple proxy to forward form-data POST to remote third_party_save.php
// Adds CORS so frontend can read the upstream response.

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit; // Preflight
}

$remote = getenv('REMOTE_THIRD_PARTY_SAVE') ?: 'https://ancbroker.synology.me:8122/php/third_party_save.php';

// Collect POST fields; supports multipart/form-data automatically via CURLFile in $_FILES
$postFields = [];
foreach ($_POST as $k => $v) {
    $postFields[$k] = $v;
}

// Handle uploaded files if any (not expected now but future-proof)
foreach ($_FILES as $field => $info) {
    if (is_array($info['name'])) {
        // Multiple files
        for ($i = 0; $i < count($info['name']); $i++) {
            if ($info['error'][$i] === UPLOAD_ERR_OK) {
                $postFields[$field . '[]'] = new CURLFile($info['tmp_name'][$i], $info['type'][$i], $info['name'][$i]);
            }
        }
    } else {
        if ($info['error'] === UPLOAD_ERR_OK) {
            $postFields[$field] = new CURLFile($info['tmp_name'], $info['type'], $info['name']);
        }
    }
}

$ch = curl_init($remote);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $postFields);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);

$response = curl_exec($ch);
if ($response === false) {
    $err = curl_error($ch);
    curl_close($ch);
    http_response_code(502);
    header('Content-Type: application/json');
    echo json_encode(['proxyError' => true, 'message' => $err]);
    exit;
}

$headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
$rawHeaders = substr($response, 0, $headerSize);
$body = substr($response, $headerSize);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Pass through status code
http_response_code($httpCode);

// Try to detect content type from upstream headers
$contentType = 'application/json; charset=utf-8';
foreach (explode("\r\n", $rawHeaders) as $headerLine) {
    if (stripos($headerLine, 'Content-Type:') === 0) {
        $contentType = trim(substr($headerLine, strlen('Content-Type:')));
        break;
    }
}
header('Content-Type: ' . $contentType);

// Output body directly (should be JSON according to upstream contract)
echo $body;

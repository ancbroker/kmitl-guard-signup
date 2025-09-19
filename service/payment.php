<?php
// service/payment.php
// Handles creation of payment transaction and returns redirect URL data

ini_set('display_errors','1');
error_reporting(E_ALL);
header('Content-Type: application/json; charset=utf-8');

try {
    $raw = file_get_contents('php://input');
    $json = json_decode($raw, true);
    if (!$json || !isset($json['type'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid request']);
        exit;
    }
    if ($json['type'] === 'createTrans') {
        createTransection($json);
        exit;
    }
    http_response_code(400);
    echo json_encode(['error' => 'Unknown type']);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}

function createTransection(array $json): void {
    $host = $_SERVER['HTTP_HOST'] ?? '';
    $forceUat = getenv('PAYMENT_FORCE_UAT');
    $isUat = false;
    if ($forceUat !== false) {
        $isUat = in_array(strtolower($forceUat), ['1','true','yes','on']);
    } else {
        $isUat = in_array($host, ['ancbroker.synology.me:8120','localhost']);
    }

    // $paymentBase = $isUat
    //     ? (getenv('PAYMENT_UI_BASE_UAT') ?: 'https://dev-payment.prakun.com/static/ui/#/')
    //     : (getenv('PAYMENT_UI_BASE_PROD') ?: 'https://payment2.prakun.com/static/ui/#/');
    // $apiUrl = $isUat
    //     ? (getenv('PAYMENT_API_BASE_UAT') ?: 'https://dev-payment.prakun.com/api/transaction/')
    //     : (getenv('PAYMENT_API_BASE_PROD') ?: 'https://payment2.prakun.com/api/transaction/');

    $paymentBase = 'https://dev-payment.prakun.com/static/ui/#/';
    $apiUrl = 'https://dev-payment.prakun.com/api/transaction/';

    $data = $json['data'] ?? [];
    //$data['urlUpdate'] = getenv('PAYMENT_URL_UPDATE') ?: 'http://insurtech.synology.me:8119/admin/paid-update.php';
    $data['uat'] = $isUat;
    $data['requestType'] = 'Ui';
    $data['requestUser'] = 'prakun';

    $token = getenv('PAYMENT_BEARER_TOKEN') ?: '4019cdd1756aa7aad3884aa60c145514'; // TODO: override in prod env

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $apiUrl,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_POST => true,
        CURLOPT_HTTPHEADER => [
            'Authorization: Bearer ' . $token,
            'Content-Type: application/json'
        ],
        CURLOPT_POSTFIELDS => json_encode($data, JSON_UNESCAPED_UNICODE),
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlErr = curl_error($ch);
    curl_close($ch);

    $decoded = json_decode($response, true);
    if (!is_array($decoded)) {
        $decoded = ['raw' => $response];
    }
    $decoded['http_code'] = $httpCode;
    $decoded['curl_error'] = $curlErr;
    $decoded['urlRequest'] = $apiUrl;
    $decoded['url'] = isset($decoded['data']) ? $paymentBase . $decoded['data'] : null;

    echo json_encode($decoded, JSON_UNESCAPED_UNICODE);
}

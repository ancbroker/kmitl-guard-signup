<?php
header('Content-Type: application/json');
echo json_encode([
  'ok' => true,
  'time' => date('c'),
  'server' => $_SERVER['SERVER_SOFTWARE'] ?? 'unknown'
]);
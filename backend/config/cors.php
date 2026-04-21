<?php

$frontendOrigins = array_filter(array_map(
    static fn (string $value): string => trim($value),
    explode(',', (string) env('FRONTEND_URLS', env('FRONTEND_URL', 'http://localhost:3000')))
));

return [
    'paths' => ['api/*', 'up'],
    'allowed_methods' => ['*'],
    'allowed_origins' => $frontendOrigins ?: ['http://localhost:3000'],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];

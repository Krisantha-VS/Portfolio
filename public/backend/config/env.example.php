<?php
return [
    'db' => [
        'host'     => 'localhost',
        'port'     => 3306,
        'name'     => '',
        'user'     => '',
        'password' => '',
        'charset'  => 'utf8mb4',
    ],
    'email' => [
        'to'       => 'your@email.com',
        'from'     => 'noreply@yourdomain.com',
        'from_name'=> 'Portfolio Contact',
    ],
    'cors' => [
        'allowed_origins' => [
            'https://yourdomain.com',
            'http://localhost:3000',
        ],
    ],
];

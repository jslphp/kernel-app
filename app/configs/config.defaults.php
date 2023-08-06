<?php

/**
 * This is the default config and should not contain any 
 * environment specific or senseitive settings.
 * To override the defaults, copy this file as config.php and add your changed there.
 * 
 * All files in the config/ folder are gitignored, except from config.defaults.php.
 */
return [
    'database' => [
        'connections' => [
            'default' => [
                'driver'    => 'mysql',
                'host'      => 'localhost',
                'database'  => 'database_name',
                'username'  => 'username',
                'password'  => 'password',
                'charset'   => 'utf8mb4',
                'collation' => 'utf8mb4_unicode_ci',
                'lazy'      => false,
                'options'   => [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_EMULATE_PREPARES => false,
                ],
            ],
        ],
        // Connection to use as default
        'default' => 'default',
    ],

    /**
     * View settings
     */
    'views' => [
        'folders' => [
            'default' => __DIR__ . '/../views/templates',
        ],
    ],

    /**
     * Kernel settings
     */
    'kernel' => [
        // If true, error reporting will be set as E_ALL and display_errors will be turned on.
        // If false, nothing will be set and it will use the settings from php.ini
        'debug' => false,

        // Modules to be auto loaded upon boot. They will be added in order
        'modules' => [
            Jsl\Common\Module::class,
            App\App::class,
        ],
    ],
];

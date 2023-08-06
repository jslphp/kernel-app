<?php

use App\Errors\Errors;

require __DIR__ . '/helpers.php';

kernel()->router->setNotFoundRoute(function () {
    return kernel()->get(Errors::class)->notFound();
});

kernel()->router->setMethodNotAllowedRoute(function () {
    return kernel()->get(Errors::class)->methodNotAllowed();
});

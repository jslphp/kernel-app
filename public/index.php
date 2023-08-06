<?php

use Jsl\Router\Exceptions\MethodNotAllowedException;
use Jsl\Router\Exceptions\RouteNotFoundException;

require __DIR__ . '/../boot.php';

try {
    kernel()->process();
} catch (RouteNotFoundException $e) {
    if (kernel()->request->acceptsJson()) {
        jsonErrorResponse(404, ['The resource was not found'])->send();
        exit;
    }

    echo render('error', [
        'title' => '404 - Not Found',
        'message' => 'The current path was not found on the server',
    ]);
} catch (MethodNotAllowedException $e) {
    $method = kernel()->request->getMethod();

    if (kernel()->request->acceptsJson()) {
        jsonErrorResponse(405, ["The resource does not support {$method} requests"])->send();
        exit;
    }
    echo render('error', [
        'title' => '405 - Method Not Allowed',
        'message' => "The resource does not support {$method} requests",
    ]);
}

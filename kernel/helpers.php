<?php

use Jsl\Common\Views\ViewsInterface;
use Jsl\Kernel\Kernel;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Get the kernel instance
 *
 * @return Kernel
 */
function kernel(): Kernel
{
    static $kernel;

    if ($kernel === null) {
        $kernel = new Kernel([
            __DIR__ . '/../app/configs/config.defaults.php',
            __DIR__ . '/../app/configs/config.php',
        ]);
        $kernel->addModules(config('kernel.modules', []));
    }

    return $kernel;
}


/**
 * Get a value from the config
 *
 * @param string $key
 * @param mixed $fallback
 *
 * @return mixed
 */
function config(string $key, mixed $fallback = null): mixed
{
    return kernel()->config->get($key, $fallback);
}


/**
 * Get the views instance
 *
 * @return ViewsInterface
 */
function views(): ViewsInterface
{
    return kernel()->get(ViewsInterface::class);
}


/**
 * Render a view template
 *
 * @param string $template
 * @param array $data
 *
 * @return string
 */
function render(string $template, array $data = []): string
{
    return views()->render($template, $data);
}


/**
 * Create a json error response
 *
 * @param string $message
 *
 * @return JsonResponse
 */
function jsonErrorResponse(string $message, array $errors = [], int $responseCode = 200): JsonResponse
{
    return new JsonResponse([
        'success' => false,
        'data' => $errors,
        'message' => $message
    ], $responseCode);
}


/**
 * Create a json success response
 *
 * @param string $message
 * @param string $data
 *
 * @return JsonResponse
 */
function jsonSuccessResponse(string $message, mixed $data = null, int $responseCode = 200): JsonResponse
{
    return new JsonResponse([
        'success' => true,
        'message' => $message
    ], $responseCode);
}

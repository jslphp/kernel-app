<?php

namespace App\Errors;

use Jsl\Kernel\Request\RequestInterface;
use Symfony\Component\HttpFoundation\JsonResponse;

class Errors
{
    /**
     * @var RequestInterface
     */
    protected RequestInterface $request;


    public function __construct(RequestInterface $request)
    {
        $this->request = $request;
    }


    /**
     * Callback for 404 not found
     *
     * @return string|JsonResponse
     */
    public function notFound(): string|JsonResponse
    {
        http_response_code(404);

        $title = '404 - Not found';
        $message = 'Resource not found';

        if ($this->request->acceptsJson()) {
            return jsonErrorResponse('not_found', [$message]);
        }

        return render('error', ['title' => $title, 'message' => $message]);
    }


    /**
     * Callback for 405 method not allowed
     *
     * @return string|JsonResponse
     */
    public function methodNotAllowed(): string|JsonResponse
    {
        http_response_code(405);

        $method = $this->request->getMethod();
        $title = '405 - Method not allowed';
        $message = "The method {$method} is not allowed for this resource";

        if ($this->request->acceptsJson()) {
            return jsonErrorResponse('method_not_allowed', [$message]);
        }

        return render('error', ['title' => $title, 'message' => $message]);
    }
}

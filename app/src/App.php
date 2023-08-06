<?php

namespace App;

use Jsl\Kernel\Kernel;
use Jsl\Kernel\Modules\AbstractModule;
use Jsl\Router\Contracts\RouterInterface;

class App extends AbstractModule
{
    /**
     * @inheritDoc
     */
    public function boot(Kernel $kernel): void
    {
        // Bind any app services here
    }


    /**
     * @inheritDoc
     */
    public function routes(RouterInterface $router): void
    {
        // Add any app routes here
        $router->get('/', [Home\Controller::class, 'showHome']);
    }

    /**
     * @inheritDoc
     */
    public function name(): string
    {
        return 'App';
    }


    /**
     * @inheritDoc
     */
    public function id(): string
    {
        return 'app';
    }
}

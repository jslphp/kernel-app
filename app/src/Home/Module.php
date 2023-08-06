<?php

namespace App\Home;

use App\Home\Models\Article;
use Jsl\Kernel\Kernel;
use Jsl\Kernel\Modules\AbstractModule;
use Jsl\Router\Contracts\RouterInterface;

class Module extends AbstractModule
{
    /**
     * @inheritDoc
     */
    public function name(): string
    {
        return 'Home';
    }


    /**
     * @inheritDoc
     */
    public function id(): ?string
    {
        return 'home';
    }


    /**
     * @inheritDoc
     */
    public function boot(Kernel $kernel): void
    {
    }


    public function routes(RouterInterface $router): void
    {
        $router->get('/', [Controller::class, 'showHome']);
    }
}

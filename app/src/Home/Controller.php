<?php

namespace App\Home;

use App\Home\Models\Article;

class Controller
{
    public function showHome()
    {
        return render('home', [
            'name' => 'home'
        ]);
    }
}

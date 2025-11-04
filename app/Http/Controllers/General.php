<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class General extends Controller
{
    public function home(){
        return Inertia::render('Home', [
            'a' => rand(1, 100),
            'users' => User::all()
        ]);
    }

    public function other(){
        return Inertia::render('Other');
    }
}

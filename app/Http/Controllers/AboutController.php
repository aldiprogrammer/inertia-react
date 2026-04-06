<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AboutController extends Controller
{
    function index()
    {
        return Inertia::render('About/About');
    }
}

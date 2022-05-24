<?php

namespace App\Http\Controllers;

use App\Models\DealsData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DealsDataController extends Controller
{
    public function getData()
    {
        return DealsData::first();
    }
}

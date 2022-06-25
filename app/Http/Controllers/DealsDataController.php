<?php

namespace App\Http\Controllers;

use App\Models\DealsData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;
use Log;

class DealsDataController extends Controller
{
    public function getData(Request $request)
    {
        Log::Debug($request->all());
        try {
            return DealsData::inRandomOrder()->limit(10)->get();
        }
        catch (QueryException $ex) {
            //Letting laravel handle the errors instead of these arrays might be the better idea.
            return response()->json(["result" => false, "message" => $ex->getMessage()]);
        }
    }
}

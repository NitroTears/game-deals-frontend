<?php

namespace App\Http\Controllers;

use App\Models\DealsData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;
use Log;
use Exception;
use Illuminate\Support\Facades\Validator;
class DealsDataController extends Controller
{
    public function getData(Request $request)
    {
        Log::Debug($request->all());
        $validator = Validator::make($request->all(), [
            "searchType" => "required|string|max:5",
            "title" => "nullable|string|max:155",
            "physicality" => "nullable|string|max:4",
            "platform" => "nullable|string|max:8",

        ]);
        if ($validator->fails()) {
            return response()->json(["result" => false, "message" => $validator->errors()], 400);
        }
    
        try {
            $deals = DealsData::whereNotNull("min_price")->inRandomOrder()->limit(30)->get();
            
            // search params here

            return $deals;
        }
        catch (QueryException $ex) {
            //Letting laravel handle the errors instead of these arrays might be the better idea.
            return response()->json(["result" => false, "message" => $ex->getMessage()]);
        }
    }
}

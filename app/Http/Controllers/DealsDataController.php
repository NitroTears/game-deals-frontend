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
            $deals = DealsData::whereNotNull("min_price");
            // This runs on page load, if searchType == 'all', no other parameters are looked at.
            switch ($request->searchType) {
                case 'all':
                    $deals = $deals->limit(30)->get();
                    return $deals;
                case 'deals':
                // logic for 'deals' goes here
                case 'new':
                    $deals = $deals->whereNull('prv_price');
                    break;
            }
            if (isset($request->physicality)) {
                switch ($request->physicality) {
                    case 'phys':
                        // logic for 'physicals' goes here
                        break;
                    case 'digi':
                        // logic for 'digital' goes here
                        break;
                    default:
                        break;
                }
            }
            if (isset($request->platform)) {
                switch ($request->platform) {
                    case 'ps4':
                        $deals = $deals->where('platform', 'PS4');
                        break;
                    case 'ps5':
                        $deals = $deals->where('platform', 'PS5');
                        break;
                    case 'switch':
                        $deals = $deals->where('platform', 'Nintendo Switch');
                        break;
                    case 'xbone':
                        $deals = $deals->where('platform', 'Xbox One');
                        break;
                    case 'xbseries':
                        $deals = $deals->where('platform', 'Xbox Series X');
                        break;
                    default:
                        break;
                }
            }
            return $deals->limit(40)->get(); //TODO: the limit is temperary!

        }
        catch (QueryException $ex) {
            //Letting laravel handle the errors instead of these arrays might be the better idea.
            return response()->json(["result" => false, "message" => $ex->getMessage()]);
        }
    }
}

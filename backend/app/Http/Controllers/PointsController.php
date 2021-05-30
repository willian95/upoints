<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PointHistory;
use App\Models\User;
use App\Models\Affiliate;
use Auth;

class PointsController extends Controller
{
    
    function assignment(Request $request){

        $user = User::where("user_identification", $request->userIdentification)->first();
        $user->points = $user->points + $request->points;
        $user->update();

        $this->storePointsHistory($user, $request->points);
        $this->storeAffiliate($user);

        return response()->json(["success" => true, "msg" => "Puntos asignados exitosamente"]);

    }

    function storePointsHistory($user, $points){

        $auth = Auth::guard('api')->user() ? Auth::guard('api')->user() : Auth::user();

        $pointHistory = new PointHistory;
        $pointHistory->sender_id = $auth->id;
        $pointHistory->receiver_id = $user->id;
        $pointHistory->points = $points;
        $pointHistory->save();  

    }

    function storeAffiliate($user){

        $auth = Auth::guard('api')->user() ? Auth::guard('api')->user() : Auth::user();

        if(Affiliate::where("user_id", $user->id)->where("store_id", $auth->id)->count() == 0){

            $affiliate = new Affiliate;
            $affiliate->user_id = $user->id;
            $affiliate->store_id = $auth->id;
            $affiliate->save();

        }

    }

}

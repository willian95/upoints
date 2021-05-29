<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\RegisterRequest;
use App\Models\User;

class RegisterController extends Controller
{
    
    function register(RegisterRequest $request){

        $user = new User;
        $user->name = $request->name;
        $user->nickname = $request->nickname;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->role_id = $request->role;
        $user->user_identification = uniqid();
        if($request->role == 2){
            $user->image = url('/images/profiles')."/user.svg";
        }else if($request->role == 3){
            $user->image = url('/images/profiles')."/store.svg";
        }

        $user->save();

        return response()->json(["success" => true, "msg" => "Te has registrado exitosamente"]);

    }

}

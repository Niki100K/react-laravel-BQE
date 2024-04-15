<?php

namespace App\Http\Controllers;

use App\Mail\NewUserMail;
use App\Models\RequestRegisterModel;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'tel' => 'required',
            'email' => 'required|unique:users',
            'password' => 'required|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = User::create([
            'first_name' => $request->input('first_name'),
            'last_name' => $request->input('last_name'),
            'tel' => $request->input('tel'),
            'email_verified_at' => now(),
            'email' => $request->input('email'),
            'password' => $request->input('password'),
            'remember_token' => Str::random(10),
        ]);
        $token = $user->createToken('token')->plainTextToken;
        
        RequestRegisterModel::create([
            'tel' => $request->input('tel'),
            'email' => $request->input('email'),
        ]);

        Mail::to('niki5kaloianv@gmail.com')->send(new NewUserMail($user));
        return response()->json(['userId' => $user->id, 'token' => $token]);
    }

    public function login(Request $request)
    {
        $credentials = $request->only(['email', 'password']);

        if (!Auth::attempt($credentials)) {
            return response()->json(['Email or password is incorrect'], 401);
        }
        
        $user = User::where('email', $credentials['email'])->first();
        $user->tokens()->delete();
        $token = $user->createToken('token')->plainTextToken;
        $requests = RequestRegisterModel::all();
        return response()->json(['userId' => $user->id, 'token' => $token, 'requests' => $requests]);
    }
    
    public function update(Request $request)
    {
        $data = $request->only(['data']);
        $updatedData = [];
    
        foreach ($data as $item) {
            foreach ($item as $row) {
                $id = $row['id'];
                $status = $row['status'];
                $comments = $row['comments'];
                
                if (isset($status)) {
                    DB::table('requests')->where('id', $id)->update(['status' => $status]);
                }
                
                if (isset($comments)) {
                    DB::table('requests')->where('id', $id)->update(['comments' => $comments]);
                }
    
                $updatedRow = DB::table('requests')->where('id', $id)->first();
                $updatedData[] = $updatedRow;
            }
        }
    
        return response()->json($updatedData);
    }
    
}

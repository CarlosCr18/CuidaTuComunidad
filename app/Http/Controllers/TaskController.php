<?php

namespace App\Http\Controllers;

use App\Models\task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {        
        try{
            $search = $request->input('search');        
            $state = $request->input('MXState');
            $query = task::query();
            $columns = ["id", "title", "description", "state", "creator", "likes", "created_at as date"];
            $query->select($columns);
            $query->where("is_deleted", "=", false);
            if(isset($search)){
                $query->where("title","ilike","%" . $search . "%");
            }
            if(isset($state)){
                $query->where("state", "=", $state);
            }
            $query->orderBy('id');
            $tasks = $query->get();
            return response($tasks, 200);

        }catch(\Throwable $th){
            return response()->json([
            'status' => false,
            'message' => 'server error',
            'errors' => $th->getMessage()
        ], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        try{
            $validation = Validator::make($request->all(),[
                'title' => 'required',
                'description' => 'required',
                'MXState' => 'required',
                'creator' => 'required',
                'likes' => ['required','integer','min:0']
               ]);

            if ($validation->fails()) {
                return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => $validation->errors()
            ], 400);
    
            }
               
            $title = $request->post('title');
            $description = $request->post('description');
            $MXState = $request->post('MXState');
            $creator = $request->post('creator');
            $likes = $request->post('likes');

            $taskCreate = task::create(['title' => $title, 'description' => $description, 'state' => $MXState, 'creator' => $creator, 'likes' => $likes]);

            return response($taskCreate,201);
        }catch(\Throwable $th){
            return response()->json([
            'status' => false,
            'message' => 'server error',
            'errors' => $th->getMessage()
        ], 500);
        }
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update($id, Request $request)
    {try{
        $validation = Validator::make($request->all(),[
            'likes' => ['required','integer','min:0']
           ]);

        if ($validation->fails()) {
            return response()->json([
            'status' => false,
            'message' => 'validation error',
            'errors' => $validation->errors()
        ], 400);

        }
        $taskToUpdate = task::find($id);
        if(!isset($taskToUpdate)){
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => "Invalid ID"
                ], 400);
        }
        $likes = $request->post('likes');
        $taskToUpdate->likes = $likes;
        $taskToUpdate->updated_at = date('Y-m-d H:i:s');

        $save = $taskToUpdate->save();
        return response($save,200);
        }catch(\Throwable $th){
            return response()->json([
            'status' => false,
            'message' => 'server error',
            'errors' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function like($id, Request $request)
    {try{
        $taskToUpdate = task::find($id);
        if(!isset($taskToUpdate)){
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => "Invalid ID"
                ], 400);
        }
        
        $taskToUpdate->likes = $taskToUpdate->likes + 1;
        $taskToUpdate->updated_at = date('Y-m-d H:i:s');

        $save = $taskToUpdate->save();
        return response($save,200);
        }catch(\Throwable $th){
            return response()->json([
            'status' => false,
            'message' => 'server error',
            'errors' => $th->getMessage()
            ], 500);
        }
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id, Request $request)
    {try{
        $taskToUpdate = task::find($id);
        if(!isset($taskToUpdate)){
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => "Invalid ID"
                ], 400);
        }
        $taskToUpdate->is_deleted = true;
        $taskToUpdate->deleted_at = date('Y-m-d H:i:s');

        $save = $taskToUpdate->save();
        return response($save,200);
        }catch(\Throwable $th){
            return response()->json([
            'status' => false,
            'message' => 'server error',
            'errors' => $th->getMessage()
            ], 500);
        }
    }
}

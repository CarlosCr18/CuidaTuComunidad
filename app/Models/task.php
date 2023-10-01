<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class task extends Model
{
    use HasFactory;
    public $table = "task";
    protected $fillable = ['title', 'description', 'state', 'creator', 'likes'];
}

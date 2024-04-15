<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RequestRegisterModel extends Model
{
    use HasFactory;

    protected $table = 'requests';
    
    protected $fillable = [
        'tel',
        'email',
        'status',
    ];
}

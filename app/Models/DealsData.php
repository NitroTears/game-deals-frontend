<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class DealsData extends Model
{
    use HasFactory;

    protected $table = 'gamedealsdata';
    protected $primaryKey = 'item_id';
    public $timestamps = false;
}

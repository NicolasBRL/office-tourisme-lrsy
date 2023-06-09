<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categorie extends Model
{
    use HasFactory;
    protected $fillable = ['nom'];

    public function lieux()
    {
        return $this->belongsToMany(Lieu::class, 'lieux_categories');
    }
}

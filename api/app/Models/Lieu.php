<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lieu extends Model
{
    use HasFactory;
    protected $fillable = ['nom', 'adresse', 'ville', 'code_postal', 'longitude', 'latitude', 'categorie_id'];
    protected $table = 'lieux';

    public function categorie()
    {
        return $this->belongsTo(Categorie::class);
    }
}

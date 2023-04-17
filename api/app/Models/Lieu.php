<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lieu extends Model
{
    use HasFactory;
    protected $fillable = ['nom', 'adresse', 'ville', 'code_postal', 'longitude', 'latitude'];
    protected $table = 'lieux';

    public function categories()
    {
        return $this->belongsToMany(Categorie::class, 'lieux_categories');
    }

    public function images()
    {
        return $this->hasMany(ImageLieu::class);
    }
}

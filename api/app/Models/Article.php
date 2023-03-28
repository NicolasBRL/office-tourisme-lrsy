<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;
    protected $fillable = ['titre', 'slug', 'content', 'url_image', 'lieu_id'];
    protected $with = ['lieu'];

    public function lieu()
    {
        return $this->belongsTo(Lieu::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\File;

class ImageLieu extends Model
{
    use HasFactory;

    public $fillable = ['url', 'lieu_id'];
    protected $table = 'images_lieux';

    public static function boot()
    {
        parent::boot();

        ImageLieu::deleted(function ($image) {
            $file = public_path() . '/storage/' . $image->url;
            if (File::isFile($file)) {
                File::delete($file);
            }
        });
    }

    public function lieu()
    {
        return $this->belongsTo(Lieu::class, 'images_lieux',);
    }
}

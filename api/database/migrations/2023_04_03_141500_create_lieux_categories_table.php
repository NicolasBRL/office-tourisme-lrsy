<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('lieux_categories', function (Blueprint $table) {
            $table->id();


            $table->bigInteger('lieu_id')->unsigned();
            $table->foreign('lieu_id')
                ->references('id')
                ->on('lieux')
                ->onDelete('cascade');


            $table->bigInteger('categorie_id')->unsigned();
            $table->foreign('categorie_id')
                ->references('id')
                ->on('categories')
                ->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lieux_categories');
    }
};

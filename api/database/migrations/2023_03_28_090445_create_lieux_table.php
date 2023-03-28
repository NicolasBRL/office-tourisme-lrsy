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
        Schema::create('lieux', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('adresse');
            $table->string('code_postal', 5);
            $table->string('ville');
            $table->decimal('longitude', 10, 7);
            $table->decimal('latitude', 10, 7);

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
        Schema::dropIfExists('lieux');
    }
};

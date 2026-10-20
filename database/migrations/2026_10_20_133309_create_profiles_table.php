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
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('handle')->unique();
            $table->string('role');
            $table->json('roles');
            $table->text('tagline');
            $table->string('location');
            $table->string('email')->unique();
            $table->json('phones');
            $table->string('availability');
            $table->json('bio');
            $table->json('links');
            $table->json('languages');
            $table->json('stats');
            $table->json('diplomas');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};

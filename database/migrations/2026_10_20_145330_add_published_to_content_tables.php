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
        foreach (['projects', 'skill_categories', 'timeline_items'] as $tableName) {
            Schema::table($tableName, function (Blueprint $table) {
                $table->boolean('published')->default(true)->after('sort_order')->index();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        foreach (['projects', 'skill_categories', 'timeline_items'] as $tableName) {
            Schema::table($tableName, function (Blueprint $table) {
                $table->dropIndex(['published']);
                $table->dropColumn('published');
            });
        }
    }
};

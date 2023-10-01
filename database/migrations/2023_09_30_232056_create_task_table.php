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
        Schema::create('task', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('description');
            $table->string('state');
            $table->string('creator');
            $table->integer('likes')->default(0);
            $table->boolean('is_deleted')->default(FALSE);
            $table->timestamp("created_at")->useCurrent();
            $table->timestamp("updated_at")->nullable();
            $table->timestamp("deleted_at")->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('task');
    }
};

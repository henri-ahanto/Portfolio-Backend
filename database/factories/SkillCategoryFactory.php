<?php

namespace Database\Factories;

use App\Models\SkillCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<SkillCategory>
 */
class SkillCategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->word(),
            'icon' => fake()->randomElement(['palette', 'code', 'layers', 'brain', 'database', 'boxes']),
            'accent' => fake()->randomElement(['python', 'laravel', 'php', 'yellow']),
            'skills' => ['PHP', 'Laravel'],
            'sort_order' => 0,
            'published' => true,
        ];
    }
}

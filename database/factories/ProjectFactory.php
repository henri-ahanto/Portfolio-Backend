<?php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(3),
            'slug' => fake()->unique()->slug(),
            'description' => fake()->paragraph(),
            'tags' => ['Laravel', 'React'],
            'kind' => 'Application web',
            'href' => fake()->url(),
            'accent' => fake()->randomElement(['python', 'laravel', 'php', 'yellow']),
            'snippet' => '$ php artisan serve',
            'sort_order' => 0,
        ];
    }
}

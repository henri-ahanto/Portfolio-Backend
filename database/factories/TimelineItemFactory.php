<?php

namespace Database\Factories;

use App\Models\TimelineItem;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<TimelineItem>
 */
class TimelineItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'date' => '2025 — 2026',
            'title' => fake()->jobTitle(),
            'place' => fake()->company(),
            'description' => fake()->sentence(),
            'type' => fake()->randomElement(['work', 'education']),
            'current' => false,
            'sort_order' => 0,
            'published' => true,
        ];
    }
}

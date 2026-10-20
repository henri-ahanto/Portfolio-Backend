<?php

namespace Database\Factories;

use App\Models\Profile;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Profile>
 */
class ProfileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'handle' => fake()->unique()->slug(2),
            'role' => 'Développeur Web Fullstack',
            'roles' => ['Développeur Web Fullstack', 'Développeur Mobile'],
            'tagline' => fake()->sentence(),
            'location' => 'Cotonou, Bénin',
            'email' => fake()->unique()->safeEmail(),
            'phones' => ['+229 01 00 00 00 00'],
            'availability' => 'Ouvert aux opportunités CDI & Freelance',
            'bio' => [fake()->paragraph()],
            'links' => [
                'github' => 'https://github.com/example',
                'youtube' => 'https://youtube.com/@example',
                'portfolio' => 'https://example.com',
                'cv' => '/cv.pdf',
            ],
            'languages' => ['Français', 'Anglais'],
            'stats' => [
                ['value' => 4, 'suffix' => '', 'label' => 'Projets réalisés'],
            ],
            'diplomas' => [
                ['year' => '2023', 'title' => 'BAC', 'place' => 'Lycée'],
            ],
        ];
    }
}

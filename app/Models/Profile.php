<?php

namespace App\Models;

use Database\Factories\ProfileFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $name
 * @property string $first_name
 * @property string $last_name
 * @property string $handle
 * @property string $role
 * @property array<int, string> $roles
 * @property string $tagline
 * @property string $location
 * @property string $email
 * @property array<int, string> $phones
 * @property string $availability
 * @property array<int, string> $bio
 * @property array{github: string, youtube: string, portfolio: string, cv: string} $links
 * @property array<int, string> $languages
 * @property array<int, array{value: int, suffix: string, label: string}> $stats
 * @property array<int, array{year: string, title: string, place: string}> $diplomas
 */
#[Fillable([
    'name',
    'first_name',
    'last_name',
    'handle',
    'role',
    'roles',
    'tagline',
    'location',
    'email',
    'phones',
    'availability',
    'bio',
    'links',
    'languages',
    'stats',
    'diplomas',
])]
class Profile extends Model
{
    /** @use HasFactory<ProfileFactory> */
    use HasFactory;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'roles' => 'array',
            'phones' => 'array',
            'bio' => 'array',
            'links' => 'array',
            'languages' => 'array',
            'stats' => 'array',
            'diplomas' => 'array',
        ];
    }
}

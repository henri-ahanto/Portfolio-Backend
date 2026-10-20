<?php

namespace App\Models;

use Database\Factories\ProjectFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $title
 * @property string $slug
 * @property string $description
 * @property array<int, string> $tags
 * @property string $kind
 * @property string|null $href
 * @property string $accent
 * @property string $snippet
 * @property int $sort_order
 */
#[Fillable([
    'title',
    'slug',
    'description',
    'tags',
    'kind',
    'href',
    'accent',
    'snippet',
    'sort_order',
])]
class Project extends Model
{
    /** @use HasFactory<ProjectFactory> */
    use HasFactory;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'tags' => 'array',
        ];
    }
}

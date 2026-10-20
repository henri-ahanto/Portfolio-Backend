<?php

namespace App\Models;

use App\Models\Concerns\ClearsPortfolioCache;
use Database\Factories\ProjectFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
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
 * @property bool $published
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
    'published',
])]
class Project extends Model
{
    /** @use HasFactory<ProjectFactory> */
    use ClearsPortfolioCache, HasFactory;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'tags' => 'array',
            'published' => 'boolean',
        ];
    }

    /**
     * Limit the query to published projects.
     *
     * @param  Builder<Project>  $query
     * @return Builder<Project>
     */
    public function scopePublished(Builder $query): Builder
    {
        return $query->where('published', true);
    }
}

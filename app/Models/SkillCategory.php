<?php

namespace App\Models;

use App\Models\Concerns\ClearsPortfolioCache;
use Database\Factories\SkillCategoryFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $title
 * @property string $icon
 * @property string $accent
 * @property array<int, string> $skills
 * @property int $sort_order
 * @property bool $published
 */
#[Fillable([
    'title',
    'icon',
    'accent',
    'skills',
    'sort_order',
    'published',
])]
class SkillCategory extends Model
{
    /** @use HasFactory<SkillCategoryFactory> */
    use ClearsPortfolioCache, HasFactory;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'skills' => 'array',
            'published' => 'boolean',
        ];
    }

    /**
     * Limit the query to published skill categories.
     *
     * @param  Builder<SkillCategory>  $query
     * @return Builder<SkillCategory>
     */
    public function scopePublished(Builder $query): Builder
    {
        return $query->where('published', true);
    }
}

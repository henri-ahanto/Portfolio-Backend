<?php

namespace App\Models;

use App\Models\Concerns\ClearsPortfolioCache;
use Database\Factories\TimelineItemFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $date
 * @property string $title
 * @property string $place
 * @property string|null $description
 * @property string $type
 * @property bool $current
 * @property int $sort_order
 * @property bool $published
 */
#[Fillable([
    'date',
    'title',
    'place',
    'description',
    'type',
    'current',
    'sort_order',
    'published',
])]
class TimelineItem extends Model
{
    /** @use HasFactory<TimelineItemFactory> */
    use ClearsPortfolioCache, HasFactory;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'current' => 'boolean',
            'published' => 'boolean',
        ];
    }

    /**
     * Limit the query to published timeline items.
     *
     * @param  Builder<TimelineItem>  $query
     * @return Builder<TimelineItem>
     */
    public function scopePublished(Builder $query): Builder
    {
        return $query->where('published', true);
    }
}

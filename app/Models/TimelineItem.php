<?php

namespace App\Models;

use Database\Factories\TimelineItemFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
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
 */
#[Fillable([
    'date',
    'title',
    'place',
    'description',
    'type',
    'current',
    'sort_order',
])]
class TimelineItem extends Model
{
    /** @use HasFactory<TimelineItemFactory> */
    use HasFactory;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'current' => 'boolean',
        ];
    }
}

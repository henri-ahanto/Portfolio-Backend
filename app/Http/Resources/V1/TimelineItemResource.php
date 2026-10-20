<?php

namespace App\Http\Resources\V1;

use App\Models\TimelineItem;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin TimelineItem
 */
class TimelineItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'date' => $this->date,
            'title' => $this->title,
            'place' => $this->place,
            'description' => $this->description,
            'type' => $this->type,
            'current' => $this->current,
        ];
    }
}

<?php

namespace App\Http\Resources\V1;

use App\Models\SkillCategory;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin SkillCategory
 */
class SkillCategoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'title' => $this->title,
            'icon' => $this->icon,
            'accent' => $this->accent,
            'skills' => $this->skills,
        ];
    }
}

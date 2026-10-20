<?php

namespace App\Http\Resources\V1;

use App\Models\Profile;
use App\Models\Project;
use App\Models\SkillCategory;
use App\Models\TimelineItem;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Collection;

class PortfolioResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        /** @var array{
         *     profile: Profile,
         *     skillCategories: Collection<int, SkillCategory>,
         *     projects: Collection<int, Project>,
         *     timeline: Collection<int, TimelineItem>
         * } $payload
         */
        $payload = $this->resource;

        return [
            'profile' => (new ProfileResource($payload['profile']))->resolve($request),
            'stats' => $payload['profile']->stats,
            'skillCategories' => SkillCategoryResource::collection($payload['skillCategories'])->resolve($request),
            'projects' => ProjectResource::collection($payload['projects'])->resolve($request),
            'timeline' => TimelineItemResource::collection($payload['timeline'])->resolve($request),
            'diplomas' => $payload['profile']->diplomas,
        ];
    }
}

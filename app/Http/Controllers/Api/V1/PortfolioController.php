<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\PortfolioResource;
use App\Models\Profile;
use App\Models\Project;
use App\Models\SkillCategory;
use App\Models\TimelineItem;

class PortfolioController extends Controller
{
    /**
     * Return every section used by the portfolio frontend.
     */
    public function __invoke(): PortfolioResource
    {
        $profile = Profile::query()->firstOrFail();

        return new PortfolioResource([
            'profile' => $profile,
            'skillCategories' => SkillCategory::query()->orderBy('sort_order')->get(),
            'projects' => Project::query()->orderBy('sort_order')->get(),
            'timeline' => TimelineItem::query()->orderBy('sort_order')->get(),
        ]);
    }
}

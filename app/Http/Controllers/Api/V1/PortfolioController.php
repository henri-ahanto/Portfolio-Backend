<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\PortfolioResource;
use App\Models\Profile;
use App\Models\Project;
use App\Models\SkillCategory;
use App\Models\TimelineItem;
use App\Support\PortfolioCache;
use Illuminate\Support\Facades\Cache;

class PortfolioController extends Controller
{
    /**
     * Return every published section used by the portfolio frontend.
     */
    public function __invoke(): PortfolioResource
    {
        $payload = Cache::remember(
            PortfolioCache::KEY,
            now()->addMinutes(10),
            function (): array {
                $profile = Profile::query()->firstOrFail();

                return [
                    'profile' => $profile,
                    'skillCategories' => SkillCategory::query()
                        ->published()
                        ->orderBy('sort_order')
                        ->get(),
                    'projects' => Project::query()
                        ->published()
                        ->orderBy('sort_order')
                        ->get(),
                    'timeline' => TimelineItem::query()
                        ->published()
                        ->orderBy('sort_order')
                        ->get(),
                ];
            },
        );

        return new PortfolioResource($payload);
    }
}

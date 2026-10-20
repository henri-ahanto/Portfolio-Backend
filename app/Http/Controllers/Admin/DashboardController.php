<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use App\Models\Project;
use App\Models\SkillCategory;
use App\Models\TimelineItem;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the administration dashboard.
     */
    public function __invoke(): Response
    {
        return Inertia::render('admin/dashboard', [
            'stats' => [
                'projects' => [
                    'total' => Project::query()->count(),
                    'published' => Project::query()->published()->count(),
                ],
                'skills' => [
                    'total' => SkillCategory::query()->count(),
                    'published' => SkillCategory::query()->published()->count(),
                ],
                'timeline' => [
                    'total' => TimelineItem::query()->count(),
                    'published' => TimelineItem::query()->published()->count(),
                ],
                'messages' => [
                    'total' => ContactMessage::query()->count(),
                    'unread' => ContactMessage::query()->unread()->count(),
                ],
            ],
            'latestMessages' => ContactMessage::query()
                ->latest()
                ->limit(5)
                ->get(['id', 'name', 'email', 'message', 'read_at', 'created_at']),
        ]);
    }
}

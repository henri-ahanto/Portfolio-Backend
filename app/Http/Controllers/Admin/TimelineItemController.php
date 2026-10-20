<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\TimelineItemRequest;
use App\Models\TimelineItem;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class TimelineItemController extends Controller
{
    /**
     * Display a listing of the timeline items.
     */
    public function index(): Response
    {
        return Inertia::render('admin/timeline/index', [
            'timelineItems' => TimelineItem::query()
                ->orderBy('sort_order')
                ->orderBy('date')
                ->paginate(12),
        ]);
    }

    /**
     * Show the form for creating a new timeline item.
     */
    public function create(): Response
    {
        return Inertia::render('admin/timeline/form');
    }

    /**
     * Store a newly created timeline item.
     */
    public function store(TimelineItemRequest $request): RedirectResponse
    {
        TimelineItem::query()->create($request->validated());

        return redirect()
            ->route('admin.timeline.index')
            ->with('success', 'L’étape du parcours a été créée.');
    }

    /**
     * Show the form for editing the given timeline item.
     */
    public function edit(TimelineItem $timeline): Response
    {
        return Inertia::render('admin/timeline/form', [
            'timelineItem' => $timeline,
        ]);
    }

    /**
     * Update the given timeline item.
     */
    public function update(TimelineItemRequest $request, TimelineItem $timeline): RedirectResponse
    {
        $timeline->update($request->validated());

        return redirect()
            ->route('admin.timeline.index')
            ->with('success', 'L’étape du parcours a été mise à jour.');
    }

    /**
     * Delete the given timeline item.
     */
    public function destroy(TimelineItem $timeline): RedirectResponse
    {
        $timeline->delete();

        return redirect()
            ->route('admin.timeline.index')
            ->with('success', 'L’étape du parcours a été supprimée.');
    }
}

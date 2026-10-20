<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SkillCategoryRequest;
use App\Models\SkillCategory;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class SkillCategoryController extends Controller
{
    /**
     * Display a listing of the skill categories.
     */
    public function index(): Response
    {
        return Inertia::render('admin/skills/index', [
            'skillCategories' => SkillCategory::query()
                ->orderBy('sort_order')
                ->orderBy('title')
                ->paginate(12),
        ]);
    }

    /**
     * Show the form for creating a new skill category.
     */
    public function create(): Response
    {
        return Inertia::render('admin/skills/form');
    }

    /**
     * Store a newly created skill category.
     */
    public function store(SkillCategoryRequest $request): RedirectResponse
    {
        SkillCategory::query()->create($request->validated());

        return redirect()
            ->route('admin.skills.index')
            ->with('success', 'La catégorie de compétences a été créée.');
    }

    /**
     * Show the form for editing the given skill category.
     */
    public function edit(SkillCategory $skill): Response
    {
        return Inertia::render('admin/skills/form', [
            'skillCategory' => $skill,
        ]);
    }

    /**
     * Update the given skill category.
     */
    public function update(SkillCategoryRequest $request, SkillCategory $skill): RedirectResponse
    {
        $skill->update($request->validated());

        return redirect()
            ->route('admin.skills.index')
            ->with('success', 'La catégorie de compétences a été mise à jour.');
    }

    /**
     * Delete the given skill category.
     */
    public function destroy(SkillCategory $skill): RedirectResponse
    {
        $skill->delete();

        return redirect()
            ->route('admin.skills.index')
            ->with('success', 'La catégorie de compétences a été supprimée.');
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ProjectRequest;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    /**
     * Display a listing of the projects.
     */
    public function index(): Response
    {
        return Inertia::render('admin/projects/index', [
            'projects' => Project::query()
                ->orderBy('sort_order')
                ->orderBy('title')
                ->paginate(12),
        ]);
    }

    /**
     * Show the form for creating a new project.
     */
    public function create(): Response
    {
        return Inertia::render('admin/projects/form');
    }

    /**
     * Store a newly created project.
     */
    public function store(ProjectRequest $request): RedirectResponse
    {
        Project::query()->create($request->validated());

        return redirect()
            ->route('admin.projects.index')
            ->with('success', 'Le projet a été créé.');
    }

    /**
     * Show the form for editing the given project.
     */
    public function edit(Project $project): Response
    {
        return Inertia::render('admin/projects/form', [
            'project' => $project,
        ]);
    }

    /**
     * Update the given project.
     */
    public function update(ProjectRequest $request, Project $project): RedirectResponse
    {
        $project->update($request->validated());

        return redirect()
            ->route('admin.projects.index')
            ->with('success', 'Le projet a été mis à jour.');
    }

    /**
     * Delete the given project.
     */
    public function destroy(Project $project): RedirectResponse
    {
        $project->delete();

        return redirect()
            ->route('admin.projects.index')
            ->with('success', 'Le projet a été supprimé.');
    }
}

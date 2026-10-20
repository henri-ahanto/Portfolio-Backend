<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateProfileRequest;
use App\Models\Profile;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Show the profile edition form.
     */
    public function edit(): Response
    {
        return Inertia::render('admin/profile/edit', [
            'profile' => Profile::query()->firstOrFail(),
        ]);
    }

    /**
     * Update the portfolio profile.
     */
    public function update(UpdateProfileRequest $request): RedirectResponse
    {
        $profile = Profile::query()->firstOrFail();

        $profile->update($request->validated());

        return back()->with('success', 'Le profil a été mis à jour.');
    }
}

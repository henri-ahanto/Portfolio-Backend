<?php

namespace Tests\Feature;

use App\Models\Profile;
use App\Models\Project;
use App\Models\SkillCategory;
use App\Models\TimelineItem;
use App\Models\User;
use Database\Seeders\PortfolioSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminContentTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;

    protected function setUp(): void
    {
        parent::setUp();

        $this->admin = User::factory()->admin()->create();
        $this->actingAs($this->admin);
    }

    public function test_dashboard_is_accessible(): void
    {
        $this->get('/admin')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component('admin/dashboard'));
    }

    public function test_profile_can_be_edited_and_cache_is_cleared(): void
    {
        $this->seed(PortfolioSeeder::class);

        $profile = Profile::query()->firstOrFail();
        $payload = $profile->toArray();
        $payload['name'] = 'AHANTO Henri S.';
        $payload['tagline'] = 'Une nouvelle accroche.';

        $this->put('/admin/profile', $payload)
            ->assertRedirect()
            ->assertSessionHasNoErrors();

        $this->assertDatabaseHas('profiles', [
            'id' => $profile->id,
            'name' => 'AHANTO Henri S.',
        ]);

        $this->getJson('/api/v1/portfolio')
            ->assertOk()
            ->assertJsonPath('data.profile.name', 'AHANTO Henri S.');
    }

    public function test_project_can_be_created_from_the_back_office(): void
    {
        $response = $this->post('/admin/projects', [
            'title' => 'Nouveau projet',
            'slug' => 'nouveau-projet',
            'description' => 'Une description complète du projet.',
            'tags' => ['Laravel', 'React'],
            'kind' => 'Application web',
            'href' => 'https://example.com/projet',
            'accent' => 'laravel',
            'snippet' => '$ php artisan serve',
            'sort_order' => 2,
            'published' => true,
        ]);

        $response->assertRedirect('/admin/projects')->assertSessionHasNoErrors();

        $this->assertDatabaseHas('projects', [
            'slug' => 'nouveau-projet',
            'published' => true,
        ]);
    }

    public function test_project_requires_valid_data(): void
    {
        $this->post('/admin/projects', [])
            ->assertSessionHasErrors([
                'title',
                'slug',
                'description',
                'tags',
                'kind',
                'accent',
                'snippet',
                'sort_order',
            ]);
    }

    public function test_project_can_be_updated_and_deleted(): void
    {
        $project = Project::factory()->create([
            'published' => true,
        ]);

        $payload = $project->toArray();
        $payload['title'] = 'Titre modifié';

        $this->put("/admin/projects/{$project->id}", $payload)
            ->assertRedirect('/admin/projects')
            ->assertSessionHasNoErrors();

        $this->assertDatabaseHas('projects', [
            'id' => $project->id,
            'title' => 'Titre modifié',
        ]);

        $this->delete("/admin/projects/{$project->id}")
            ->assertRedirect('/admin/projects');

        $this->assertDatabaseMissing('projects', ['id' => $project->id]);
    }

    public function test_skill_category_can_be_created_and_updated(): void
    {
        $this->post('/admin/skills', [
            'title' => 'Nouveaux outils',
            'icon' => 'boxes',
            'accent' => 'python',
            'skills' => ['Docker', 'Git'],
            'sort_order' => 7,
            'published' => true,
        ])->assertRedirect('/admin/skills')->assertSessionHasNoErrors();

        $category = SkillCategory::query()->where('title', 'Nouveaux outils')->firstOrFail();

        $this->put("/admin/skills/{$category->id}", [
            'title' => 'Outils DevOps',
            'icon' => 'boxes',
            'accent' => 'python',
            'skills' => ['Docker', 'Git', 'CI/CD'],
            'sort_order' => 7,
            'published' => false,
        ])->assertRedirect('/admin/skills')->assertSessionHasNoErrors();

        $this->assertDatabaseHas('skill_categories', [
            'id' => $category->id,
            'title' => 'Outils DevOps',
            'published' => false,
        ]);
    }

    public function test_timeline_item_can_be_created_and_updated(): void
    {
        $this->post('/admin/timeline', [
            'date' => '2026',
            'title' => 'Nouvelle expérience',
            'place' => 'Entreprise',
            'description' => 'Une mission.',
            'type' => 'work',
            'current' => true,
            'sort_order' => 1,
            'published' => true,
        ])->assertRedirect('/admin/timeline')->assertSessionHasNoErrors();

        $item = TimelineItem::query()->where('title', 'Nouvelle expérience')->firstOrFail();

        $this->put("/admin/timeline/{$item->id}", [
            'date' => '2025 — 2026',
            'title' => 'Expérience mise à jour',
            'place' => 'Entreprise',
            'description' => null,
            'type' => 'education',
            'current' => false,
            'sort_order' => 1,
            'published' => false,
        ])->assertRedirect('/admin/timeline')->assertSessionHasNoErrors();

        $this->assertDatabaseHas('timeline_items', [
            'id' => $item->id,
            'title' => 'Expérience mise à jour',
            'type' => 'education',
            'published' => false,
        ]);
    }

    public function test_unpublished_content_is_hidden_from_the_public_api(): void
    {
        $this->seed(PortfolioSeeder::class);

        Project::query()->firstOrFail()->update(['published' => false]);
        SkillCategory::query()->firstOrFail()->update(['published' => false]);
        TimelineItem::query()->firstOrFail()->update(['published' => false]);

        $this->getJson('/api/v1/portfolio')
            ->assertOk()
            ->assertJsonCount(3, 'data.projects')
            ->assertJsonCount(5, 'data.skillCategories')
            ->assertJsonCount(5, 'data.timeline');
    }

    public function test_public_api_cache_is_invalidated_when_content_changes(): void
    {
        $this->seed(PortfolioSeeder::class);

        $this->getJson('/api/v1/portfolio')
            ->assertOk()
            ->assertJsonCount(4, 'data.projects');

        Project::query()->firstOrFail()->update(['published' => false]);

        $this->getJson('/api/v1/portfolio')
            ->assertOk()
            ->assertJsonCount(3, 'data.projects');
    }
}

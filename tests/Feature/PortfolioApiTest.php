<?php

namespace Tests\Feature;

use Database\Seeders\PortfolioSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PortfolioApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_portfolio_endpoint_returns_all_sections(): void
    {
        $this->seed(PortfolioSeeder::class);

        $response = $this->getJson('/api/v1/portfolio');

        $response->assertOk()
            ->assertJsonPath('data.profile.firstName', 'Henri Sylvain')
            ->assertJsonPath('data.profile.email', 'ahantohenrisylvain@gmail.com')
            ->assertJsonCount(4, 'data.stats')
            ->assertJsonCount(6, 'data.skillCategories')
            ->assertJsonCount(4, 'data.projects')
            ->assertJsonCount(6, 'data.timeline')
            ->assertJsonCount(5, 'data.diplomas');
    }

    public function test_portfolio_endpoint_returns_not_found_without_content(): void
    {
        $response = $this->getJson('/api/v1/portfolio');

        $response->assertNotFound();
    }
}

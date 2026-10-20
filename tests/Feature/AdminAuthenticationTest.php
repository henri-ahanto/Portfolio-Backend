<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminAuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_to_the_admin_login_page(): void
    {
        $this->get('/admin')->assertRedirect('/admin/login');
    }

    public function test_admin_login_page_is_accessible_to_guests(): void
    {
        $this->get('/admin/login')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component('admin/auth/login'));
    }

    public function test_administrator_can_log_in(): void
    {
        $admin = User::factory()->admin()->create([
            'email' => 'admin@example.com',
        ]);

        $response = $this->post('/admin/login', [
            'email' => 'admin@example.com',
            'password' => 'password',
        ]);

        $response->assertRedirect('/admin');
        $this->assertAuthenticatedAs($admin);
    }

    public function test_non_administrator_cannot_log_in(): void
    {
        User::factory()->create([
            'email' => 'visitor@example.com',
        ]);

        $response = $this->from('/admin/login')->post('/admin/login', [
            'email' => 'visitor@example.com',
            'password' => 'password',
        ]);

        $response->assertRedirect('/admin/login')->assertSessionHasErrors('email');
        $this->assertGuest();
    }

    public function test_authenticated_non_administrator_cannot_access_the_back_office(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)->get('/admin')->assertForbidden();
    }

    public function test_administrator_can_log_out(): void
    {
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)
            ->post('/admin/logout')
            ->assertRedirect('/admin/login');

        $this->assertGuest();
    }

    public function test_admin_create_command_creates_an_administrator(): void
    {
        $this->artisan('admin:create', [
            'email' => 'new-admin@example.com',
            '--name' => 'Nouvel administrateur',
            '--password' => 'a-very-secure-password',
        ])->assertSuccessful();

        $admin = User::query()->where('email', 'new-admin@example.com')->firstOrFail();

        $this->assertTrue($admin->is_admin);
        $this->assertTrue(Hash::check('a-very-secure-password', $admin->password));
    }
}

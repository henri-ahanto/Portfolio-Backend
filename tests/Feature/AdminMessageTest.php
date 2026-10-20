<?php

namespace Tests\Feature;

use App\Models\ContactMessage;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminMessageTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;

    protected function setUp(): void
    {
        parent::setUp();

        $this->admin = User::factory()->admin()->create();
        $this->actingAs($this->admin);
    }

    public function test_admin_can_list_messages(): void
    {
        ContactMessage::factory()->count(2)->create();

        $this->get('/admin/messages')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('admin/messages/index')
                ->has('messages.data', 2)
                ->where('unreadCount', 2));
    }

    public function test_messages_can_be_filtered_by_read_status(): void
    {
        ContactMessage::factory()->create(['read_at' => now()]);
        $unread = ContactMessage::factory()->create();

        $this->get('/admin/messages?status=unread')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('admin/messages/index')
                ->has('messages.data', 1)
                ->where('messages.data.0.id', $unread->id)
                ->where('unreadCount', 1));
    }

    public function test_opening_a_message_marks_it_as_read(): void
    {
        $message = ContactMessage::factory()->create(['read_at' => null]);

        $this->get("/admin/messages/{$message->id}")
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component('admin/messages/show'));

        $this->assertNotNull($message->fresh()->read_at);
    }

    public function test_admin_can_mark_a_message_as_unread(): void
    {
        $message = ContactMessage::factory()->create(['read_at' => now()]);

        $this->patch("/admin/messages/{$message->id}/read")
            ->assertRedirect('/admin/messages');

        $this->assertNull($message->fresh()->read_at);
    }

    public function test_admin_can_mark_a_message_as_read(): void
    {
        $message = ContactMessage::factory()->create(['read_at' => null]);

        $this->from('/admin/messages')
            ->patch("/admin/messages/{$message->id}/read")
            ->assertRedirect('/admin/messages');

        $this->assertNotNull($message->fresh()->read_at);
    }

    public function test_admin_can_delete_a_message(): void
    {
        $message = ContactMessage::factory()->create();

        $this->delete("/admin/messages/{$message->id}")
            ->assertRedirect('/admin/messages');

        $this->assertDatabaseMissing('contact_messages', ['id' => $message->id]);
    }
}

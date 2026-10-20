<?php

namespace Tests\Feature;

use App\Mail\ContactMessageReceived;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class ContactMessageApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_contact_message_is_stored_and_owner_is_notified(): void
    {
        Mail::fake();

        $response = $this->postJson('/api/v1/contact', [
            'name' => 'Ada Lovelace',
            'email' => 'ada@example.com',
            'message' => 'Bonjour, je souhaite discuter d\'un projet web.',
        ]);

        $response->assertCreated()
            ->assertJsonPath('message', 'Message envoyé avec succès.');

        $this->assertDatabaseHas('contact_messages', [
            'name' => 'Ada Lovelace',
            'email' => 'ada@example.com',
        ]);

        Mail::assertSent(ContactMessageReceived::class, function (ContactMessageReceived $mail): bool {
            return $mail->contactMessage->email === 'ada@example.com'
                && $mail->hasTo(config('portfolio.contact_email'));
        });
    }

    public function test_contact_message_requires_valid_data(): void
    {
        Mail::fake();

        $response = $this->postJson('/api/v1/contact', [
            'name' => 'A',
            'email' => 'not-an-email',
            'message' => 'Court',
        ]);

        $response->assertUnprocessable()
            ->assertJsonValidationErrors(['name', 'email', 'message']);

        $this->assertDatabaseCount('contact_messages', 0);
    }

    public function test_honeypot_submissions_are_silently_ignored(): void
    {
        Mail::fake();

        $response = $this->postJson('/api/v1/contact', [
            'name' => 'Spam Bot',
            'email' => 'spam@example.com',
            'message' => 'Ceci est un message de spam suffisamment long.',
            'website' => 'https://spam.example.com',
        ]);

        $response->assertCreated();
        $this->assertDatabaseCount('contact_messages', 0);
        Mail::assertNothingSent();
    }
}

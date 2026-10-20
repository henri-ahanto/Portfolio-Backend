<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\StoreContactMessageRequest;
use App\Mail\ContactMessageReceived;
use App\Models\ContactMessage;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Mail;
use Throwable;

class ContactMessageController extends Controller
{
    /**
     * Store a contact message and notify the portfolio owner.
     */
    public function store(StoreContactMessageRequest $request): JsonResponse
    {
        $validated = $request->validated();

        if (($validated['website'] ?? '') !== '') {
            return response()->json(['message' => 'Message envoyé avec succès.'], 201);
        }

        $message = ContactMessage::query()->create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'message' => $validated['message'],
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        try {
            Mail::to(config('portfolio.contact_email'))
                ->send(new ContactMessageReceived($message));
        } catch (Throwable $exception) {
            report($exception);
        }

        return response()->json(['message' => 'Message envoyé avec succès.'], 201);
    }
}

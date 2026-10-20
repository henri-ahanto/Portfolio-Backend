<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContactMessageController extends Controller
{
    /**
     * Display the contact message inbox.
     */
    public function index(Request $request): Response
    {
        $status = $request->string('status')->toString();
        $status = in_array($status, ['unread', 'read'], true) ? $status : 'all';
        $search = trim($request->string('search')->toString());

        $messages = ContactMessage::query()
            ->latest()
            ->when($status === 'unread', fn (Builder $query) => $query->unread())
            ->when($status === 'read', fn (Builder $query) => $query->whereNotNull('read_at'))
            ->when($search !== '', function (Builder $query) use ($search): void {
                $query->where(function (Builder $query) use ($search): void {
                    $query->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('message', 'like', "%{$search}%");
                });
            })
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('admin/messages/index', [
            'messages' => $messages,
            'filters' => [
                'status' => $status,
                'search' => $search,
            ],
            'unreadCount' => ContactMessage::query()->unread()->count(),
        ]);
    }

    /**
     * Display the given message and mark it as read.
     */
    public function show(ContactMessage $message): Response
    {
        $message->markAsRead();

        return Inertia::render('admin/messages/show', [
            'message' => $message,
        ]);
    }

    /**
     * Toggle the read state of the given message.
     */
    public function toggleRead(ContactMessage $message): RedirectResponse
    {
        if ($message->read_at !== null) {
            $message->markAsUnread();

            return redirect()
                ->route('admin.messages.index')
                ->with('success', 'Le message a été marqué comme non lu.');
        }

        $message->markAsRead();

        return back()->with('success', 'Le message a été marqué comme lu.');
    }

    /**
     * Delete the given message.
     */
    public function destroy(ContactMessage $message): RedirectResponse
    {
        $message->delete();

        return redirect()
            ->route('admin.messages.index')
            ->with('success', 'Le message a été supprimé.');
    }
}

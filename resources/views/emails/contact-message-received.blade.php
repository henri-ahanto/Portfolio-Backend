<x-mail::message>
# Nouveau message depuis le portfolio

**Nom :** {{ $contactMessage->name }}  
**Email :** {{ $contactMessage->email }}

{{ $contactMessage->message }}

<x-mail::button :url="'mailto:'.$contactMessage->email">
Répondre à {{ $contactMessage->name }}
</x-mail::button>

Message reçu le {{ $contactMessage->created_at->format('d/m/Y à H:i') }}.

À bientôt,<br>
{{ config('app.name') }}
</x-mail::message>

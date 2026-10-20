<?php

namespace App\Http\Resources\V1;

use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Profile
 */
class ProfileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'name' => $this->name,
            'firstName' => $this->first_name,
            'lastName' => $this->last_name,
            'handle' => $this->handle,
            'role' => $this->role,
            'roles' => $this->roles,
            'tagline' => $this->tagline,
            'location' => $this->location,
            'email' => $this->email,
            'phones' => $this->phones,
            'availability' => $this->availability,
            'bio' => $this->bio,
            'links' => $this->links,
            'languages' => $this->languages,
        ];
    }
}

<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'body' => $this->body,
            'tags' => $this->tags()->pluck('name'),
            'author' => new UserResource($this->user),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
            "expires_at" => $this->expires_at->format('Y-m-d H:i:s'),
        ];
    }
}

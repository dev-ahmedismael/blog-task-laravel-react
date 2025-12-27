<?php

namespace App\Services;

use App\Models\Post;
use App\Models\Tag;
use App\Repositories\PostRepo;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class PostService
{
    public function __construct(protected PostRepo $repo) {}

    public function index()
    {
        return $this->repo->index();
    }

    public function store(array $data): Post
    {
        $tags = $data['tags'] ?? [];
        unset($data['tags']);

        $data['user_id'] = Auth::id();
        $data['expires_at'] = now()->addDay();

        $post = $this->repo->store($data);

        $this->syncTags($tags, $post);

        return $post->load(['tags', 'user', 'comments']);
    }

    public function update(Post $post, array $data): Post
    {
        Gate::authorize('update', $post);

        $tags = $data['tags'] ?? [];
        unset($data['tags']);

        $post = $this->repo->update($post, $data);

        $this->syncTags($tags, $post);

        return $post;
    }


    public function destroy(Post $post): void
    {
        Gate::authorize('delete', $post);

        $this->repo->destroy($post);
    }

    public function syncTags(array $tags, Post $post): void
    {
        $tagIds = collect($tags)->map(function ($tagName) {
            return Tag::firstOrCreate(['name' => $tagName])->id;
        });

        $post->tags()->sync($tagIds);
    }
}

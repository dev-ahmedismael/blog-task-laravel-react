<?php

namespace App\Repositories;

use App\Models\Post;

class PostRepo
{
    public function index()
    {
        return Post::query()->latest()->paginate(10);
    }

    public function store(array $data): Post
    {
        return Post::create($data);
    }


    public function update(Post $post, array $data): Post
    {
        $post->update($data);
        return $post->fresh();
    }

    public function destroy(Post $post): void
    {
        $post->delete();
    }
}

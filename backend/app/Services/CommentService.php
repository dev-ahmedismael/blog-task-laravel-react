<?php

namespace App\Services;

use App\Models\Comment;
use App\Repositories\CommentRepo;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class CommentService
{
    public function __construct(protected CommentRepo $repo) {}

    public function store(array $data): Comment
    {
        $data['user_id'] = Auth::id();

        return $this->repo->store($data);
    }

    public function update(Comment $comment, array $data): Comment
    {
        Gate::authorize('update', $comment);

        $this->repo->update($comment, $data);

        return $comment->fresh();
    }

    public function destroy(Comment $comment): void
    {
        Gate::authorize('delete', $comment);

        $this->repo->destroy($comment);
    }
}

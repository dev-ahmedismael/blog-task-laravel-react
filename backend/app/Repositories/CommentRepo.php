<?php

namespace App\Repositories;

use App\Models\Comment;

class CommentRepo
{
    public function store(array $data)
    {
        return Comment::create($data);
    }

    public function update(Comment $comment, array $data)
    {
        return $comment->update($data);
    }

    public function destroy(Comment $comment)
    {
        return $comment->delete();
    }
}

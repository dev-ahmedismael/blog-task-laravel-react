<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommentRequest;
use App\Http\Resources\CommentResource;
use App\Models\Comment;
use App\Services\CommentService;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function __construct(protected CommentService $service) {}
    public function store(CommentRequest $request)
    {
        return new CommentResource(
            $this->service->store($request->validated())
        );
    }

    public function show(Comment $comment)
    {
        return new CommentResource($comment);
    }

    public function update(
        CommentRequest $request,
        Comment $comment,
        CommentService $service
    ) {
        return new CommentResource(
            $service->update($comment, $request->validated())
        );
    }

    public function destroy(
        Comment $comment,
        CommentService $service
    ) {
        $service->destroy($comment);

        return response()->noContent();
    }
}

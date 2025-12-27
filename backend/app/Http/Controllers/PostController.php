<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Http\Resources\CommentResource;
use App\Http\Resources\PostResource;
use App\Models\Post;
use App\Services\PostService;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function __construct(protected PostService $service) {}
    public function index()
    {
        $posts = $this->service->index();
        return PostResource::collection($posts);
    }

    public function store(PostRequest $request)
    {
        $post = $this->service->store($request->validated());

        return new PostResource($post);
    }

    public function show(Post $post)
    {
        return new PostResource($post);
    }

    public function update(PostRequest $request, Post $post)
    {
        $post = $this->service->update($post, $request->validated());
        return new PostResource($post);
    }

    public function destroy(Post $post)
    {
        $this->service->destroy($post);
        return response()->noContent();
    }

    public function comments(Post $post)
    {
        return CommentResource::collection($post->comments()->latest()->paginate(3));
    }

    public function me()
    {
        return PostResource::collection(Auth::user()->posts()->latest()->paginate(10));
    }
}

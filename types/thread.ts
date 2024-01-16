import { OriginalPost, Post } from "./post.ts";

interface BasicThread {
    posts: [ OriginalPost, ...Post[] ];
};

export type Thread = BasicThread;

// types like StickyThread, etc. could be appended here

"use client"

import {useInfiniteQuery, useQuery} from "@tanstack/react-query";
import {getFollowingPosts} from "@/app/(afterLogin)/home/_lib/getFollowingPosts";
import Post from "@/app/(afterLogin)/_component/Post";
import { Post as IPost } from '@/model/Post';

export default function FollowingPosts() {
  // const { data } = useInfiniteQuery<IPost[]>({
  //   queryKey: ['posts', 'followings'],
  //   queryFn: getFollowingPosts,
  //   initialPageParam: 0,
  //   getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
  //   staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
  //   gcTime: 300 * 1000,
  // })
  const { data } = useQuery<IPost[]>({
    queryKey: ['posts', 'followings'],
    queryFn: getFollowingPosts,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  })

  return data?.map((post) => (
    <Post key={post.postId} post={post} />
  ))
}
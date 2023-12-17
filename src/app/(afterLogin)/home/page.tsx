import style from './home.module.css';
import Tab from "@/app/(afterLogin)/home/_component/Tab";

import PostForm from "@/app/(afterLogin)/home/_component/PostForm";
import Post from "@/app/(afterLogin)/_component/Post";
import TabProvider from './_component/TabProvider';
import { HydrationBoundary, dehydrate, useQueryClient } from '@tanstack/react-query';

async function  getPostRecommends() {
  const res = await fetch(`http://localhost:9090/api/postRecommends`,{
    next:{
      tags:['posts','recommends']
    },
    // cache:'no-store' 캐싱안하려면 넣어라..
  })

  if(!res.ok){
    throw new Error('error')
  }

  return res.json()

}
export default async function Home() {
  // 서버에서 불러온 데이터를 클라이언트에서 react query가 물려받는다.
  const queryClient = useQueryClient()
  await queryClient.prefetchQuery({
    queryKey:['posts','recommends'],
    queryFn:getPostRecommends
  })
  const dehydratedState = dehydrate(queryClient)
  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydratedState}>
    <TabProvider>
    <Tab/>
        <PostForm />
        <Post/>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
    </TabProvider>
    </HydrationBoundary>
    </main>
  )
}

import style from './home.module.css';
import Tab from "@/app/(afterLogin)/home/_component/Tab";

import PostForm from "@/app/(afterLogin)/home/_component/PostForm";
import Post from "@/app/(afterLogin)/_component/Post";
import TabProvider from './_component/TabProvider';
import { HydrationBoundary, QueryClient, dehydrate, useQueryClient } from '@tanstack/react-query';
import { getPostRecommends } from './_lib/getPostRecommends';
import PostRecommends from './_component/PostRecommends';
import TabDecider from './_component/TabDecider';
import { auth } from '@/auth';
import { Suspense } from 'react';
import Loading from './loading';
import TabDeciderSuspense from './_component/TabDeciderSuspense';

// async function  getPostRecommends() {
//   const res = await fetch(`http://localhost:9090/api/postRecommends`,{
//     next:{
//       tags:['posts','recommends']
//     },
//     // cache:'no-store' 캐싱안하려면 넣어라..
//   })

//   if(!res.ok){
//     throw new Error('error')
//   }

//   return res.json()

// }
export default async function Home() {
  const session = await auth();
  // 서버에서 불러온 데이터를 클라이언트에서 react query가 물려받는다.
  // const queryClient = new QueryClient()
  // await queryClient.prefetchQuery({
  //   queryKey:['posts','recommends'],
  //   queryFn:getPostRecommends
  // })
  // await queryClient.prefetchInfiniteQuery({
  //   queryKey: ['posts', 'recommends'],
  //   queryFn: getPostRecommends,
  //   initialPageParam: 0,
  // })
  // const dehydratedState = dehydrate(queryClient)
  return (
    <main className={style.main}>
      {/* <HydrationBoundary state={dehydratedState}> */}
    <TabProvider>
    <Tab/>
        <PostForm me={session} />
        <Suspense fallback={<Loading/>}>
          <TabDeciderSuspense/>
        </Suspense>

        {/* <PostRecommends/> */}
        {/* <Post/>
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
        <Post/> */}
    </TabProvider>
    {/* </HydrationBoundary> */}
    </main>
  )
}

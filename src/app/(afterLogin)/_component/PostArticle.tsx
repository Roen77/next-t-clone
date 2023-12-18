"use client";

import {ReactNode} from "react";
import style from './post.module.css';
import {useRouter} from "next/navigation";

type Props = {
  children: ReactNode,
  post: {
    postId: number;
    content: string,
    User: {
      id: string,
      nickname: string,
      image: string,
    },
    createdAt: Date,
    Images: any[],
  }
}

export default function PostArticle({ children, post}: Props) {
  const router = useRouter();
  let target = post;
  // if (post.Original) {
  //   target = post.Original;
  // }
  const onClick = () => {
    router.push(`/${target.User.id}/status/${target.postId}`);
  }

  return (
    <article onClick={onClick} className={style.post}>
    {/* <article onClickCapture={onClick} className={style.post}> */}
      {children}
    </article>
  );
}
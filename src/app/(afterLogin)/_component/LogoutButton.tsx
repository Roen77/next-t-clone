"use client"

import { Session } from "next-auth";
import style from "./logoutButton.module.css";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
type Props = {
  me: Session | null
}
export default function LogoutButton({ me }: Props) {
  const router = useRouter();
  // const { data: me } = useSession();
  const queryClient = useQueryClient();

  const onLogout = () => {
    queryClient.invalidateQueries({
      queryKey: ["posts"],
    });
    queryClient.invalidateQueries({
      queryKey: ["users"],
    });
    signOut({ redirect: false })
      .then(() => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/logout`, {
          method: 'post',
          credentials: 'include',
        });
        // 같은페이지 30초동안 캐시해서 로그아웃에도 남아있는 버그 해결하기 위해 추가
        router.refresh();
        router.replace('/');
      });
  };
  if (!me?.user) {
    return null;
  }

  return (
    <button className={style.logOutButton} onClick={onLogout}>
      <div className={style.logOutUserImage}>
        <img src={me.user?.image as string} alt={me.user?.email as string} />
      </div>
      <div className={style.logOutUserName}>
        <div>{me.user?.name}</div>
        <div>@{me.user?.email}</div>
      </div>
    </button>
  )
}
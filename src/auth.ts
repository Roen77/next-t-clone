import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import KakaoProvider from "next-auth/providers/kakao";
import {NextResponse} from "next/server";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  pages: {
    signIn: '/i/flow/login',
    newUser: '/i/flow/signup',
  },
//   callbacks: {
//     jwt({ token}) {
//       console.log('auth.ts jwt', token);
//       return token;
//     },
//     session({ session, newSession, user}) {
//       console.log('auth.ts session', session, newSession, user);
//       return session;
//     }
//   },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const authResponse = await fetch(`${process.env.AUTH_URL}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: credentials.username,
            password: credentials.password,
          }),
        })

        if (!authResponse.ok) {
          return null
        }

        const user = await authResponse.json()
        console.log('user', user);
        return {
          email: user.id,
          name: user.nickname,
          image: user.image,
          ...user,
        }
      },
    }),
    // 이런식으로 프로바이더 추가 가능
    // KakaoProvider
  ]
});
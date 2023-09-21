import NextAuth from 'next-auth';
import { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
// import KakaoProvider from '...'; // KakaoProvider가 필요하다면 해당 경로를 추가하세요.

const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: 'ed7cac4b32aadeae559e',
      clientSecret: 'd92c1b933e89f89fab558cd5c4bac08b177111e1',
    }),
    // KakaoProvider({
    //
    // }),
  ],
  secret: 'qwerty1234',
};

export default NextAuth(authOptions);
export { authOptions };

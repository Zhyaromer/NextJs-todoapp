import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/error",
  },
  callbacks: {
    async signIn({ user, account }) {
      await fetch("http://localhost:3000/api/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          img: user.image,
          providerid: account?.providerAccountId || null,
          provider: account?.provider || null,
        }),
      })
      return true;
    },
    async session({ session }) {
      if (session.user?.email) {
        try {
          const userResponse = await fetch(`http://localhost:3000/api/user/returnid?email=${session.user.email}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const userData = await userResponse.json();

          if (userData && userData.id) {
            session.user.id = userData.id;
          }
        } catch (error) {
          console.error("Error fetching user ID:", error);
        }
      }

      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.includes('/api/auth/callback/')) {
        return baseUrl + "/dashboard";
      }

      if (url.startsWith("/") && !url.startsWith("//")) {
        const safePath = url.split("?")[0];

        const allowedPaths = ["/dashboard"];

        if (allowedPaths.some(path => safePath === path)) {
          return `${baseUrl}${url}`;
        } else {
          return baseUrl + "/dashboard";
        }
      }

      if (url.startsWith(baseUrl)) {
        const parsedUrl = new URL(url);

        if (parsedUrl.origin === baseUrl) {
          const safePath = parsedUrl.pathname;
          const allowedPaths = ["/dashboard"];

          if (allowedPaths.some(path => safePath === path)) {
            return url;
          }
        }
      }

      return baseUrl + "/dashboard";
    }
  }
})

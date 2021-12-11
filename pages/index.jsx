import Head from "next/head";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <div>
      <Head>
        <title>Practice Parrot</title>
        <meta name="description" content="Practice Parrot" />
      </Head>
      <main
        className={
          "flex flex-col items-center justify-center w-screen h-screen"
        }
      >
        <h1
          className={
            "text-4xl font-bold bg-gradient-to-tr from-primary-500 to-cyan-400 bg-clip-text text-transparent"
          }
        >
          Practice Parrot
        </h1>
        <div className="mt-4">
          <Link href={session ? "/" : "/sign-in"}>
            <a className="bg-gray-800 text-gray-50 text-2xl px-4 py-2 rounded shadow-lg shadow-primary-100 hover:shadow-secondary-300 duration-500">
              Get Started
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
}

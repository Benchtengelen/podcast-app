import { gql } from "@apollo/client/core";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import client from "../apollo-client";

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Podcastera</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{" "}
          <a className="text-blue-600" href="https://nextjs.org">
            Podcastera
          </a>
        </h1>

        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
          <a
            href="https://nextjs.org/learn"
            className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">Learn &rarr;</h3>
            <p className="mt-4 text-xl">
              Learn about Next.js in an interactive course with quizzes!
            </p>
          </a>
        </div>
      </main>
    </div>
  );
};

export default Home;

export const getStaticProps = async (_req: any, res: any) => {
  const { data } = await client.query({
    query: gql`
      query AllPodcastQuery {
        podcasts {
          id
          slug
          title
          releaseDate
          description {
            html
          }
          categories {
            title
          }
        }
      }
    `,
  });
  console.log(data);

  return {
    props: {
      podcasts: data.podcasts,
    },
  };
};

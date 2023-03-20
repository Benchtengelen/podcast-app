import gql from "graphql-tag";
import Head from "next/head";
import Link from "next/link";
import client from "../apollo-client";

export default function Home({ podcasts }) {
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
        {podcasts.map((podcast) => (
          <Link
            legacyBehavior
            key={podcast.id}
            className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full"
            href={`podcasts/${podcast.slug}`}
          >
            <a
              href="https://nextjs.org/learn"
              className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600"
            >
              <h3 className="text-2xl font-bold">{podcast.title} &rarr;</h3>
              {podcast.categories.map((category) => (
                <p key={category.id} className="mt-4 text-xl">
                  {category.title}
                </p>
              ))}
            </a>
          </Link>
        ))}
      </main>
    </div>
  );
}

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
            id
            title
          }
        }
      }
    `,
  });

  const { podcasts } = data;
  return {
    props: {
      podcasts,
    },
  };
};

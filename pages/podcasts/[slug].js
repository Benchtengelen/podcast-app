import gql from "graphql-tag";
import React from "react";
import Link from "next/link";
import client from "../../apollo-client";

export default function PodcastDetailPage({ podcast }) {
  return (
    <>
      <Link href="/">
        <div className="pl-16 pt-8 flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>
          <span className="text-pink-600 font-semibold">Go Back</span>
        </div>
      </Link>
      <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <figure>
          <audio controls src={podcast.record.url}>
            <a href="/media/cc0-audio/t-rex-roar.mp3">Download audio</a>
          </audio>
        </figure>
        <figcaption className="m-5">{podcast.title}</figcaption>
        <div
          className="max-w-3xl mt-6"
          dangerouslySetInnerHTML={{ __html: podcast.description.html }}
        />
        <span className="text-purple-700 mt-7">
          {podcast.isAdult ? "Not Appropriate" : "Appropriate"}
        </span>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query AllPodcastQuery {
        podcasts {
          slug
        }
      }
    `,
  });

  const paths = data.podcasts.map((podcast) => ({
    params: { slug: podcast.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  const { data, errors } = await client.query({
    query: gql`
      query PodcastDetailQuery($slug: String!) {
        podcast(where: { slug: $slug }) {
          id
          title
          isAdult
          releaseDate
          description {
            html
          }
          record {
            id
            url
          }
        }
      }
    `,
    variables: {
      slug,
    },
  });

  return {
    props: {
      podcast: data.podcast,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
}

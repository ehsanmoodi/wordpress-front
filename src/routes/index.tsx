import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "../components/layout";
import { Loading } from "../components/loading";
import { postsQueryOptions } from "../services/posts";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Button } from "../components/button";
import { Error } from "../components/error";
import { PostCard } from "../components/post-card";

export const Route = createFileRoute("/")({
  component: HomeComponent,
  pendingComponent: () => <Loading />,
  errorComponent: () => <Error />,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(postsQueryOptions(1)),
});

function HomeComponent() {
  const [page, setPage] = useState<number>(1);
  const { data } = useSuspenseQuery(postsQueryOptions(page));

  return (
    <Layout>
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {data.posts.map((post: any) => (
            <PostCard
              key={post.id}
              id={post.id}
              title={post.title.rendered}
              image={
                post["_embedded"]["wp:featuredmedia"]
                  ? post["_embedded"]["wp:featuredmedia"][0].source_url
                  : ""
              }
              date={post.date}
            />
          ))}
        </div>

        <div className="flex gap-3 justify-between">
          <Button
            isDisabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Prev Page
          </Button>
          <Button
            isDisabled={page === data.totalPages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next Page
          </Button>
        </div>
      </div>
    </Layout>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Loading } from "../components/loading";
import { Error } from "../components/error";
import { postQueryOptions } from "../services/posts";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Layout } from "../components/layout";

export const Route = createFileRoute("/$id")({
  component: RouteComponent,
  pendingComponent: () => <Loading />,
  errorComponent: () => <Error />,
  loader: ({ context: { queryClient }, params: { id } }) => {
    return queryClient.ensureQueryData(postQueryOptions(id));
  },
});

function RouteComponent() {
  const id = Route.useParams().id;
  const { data } = useSuspenseQuery(postQueryOptions(id));

  return (
    <Layout>
      <div className="flex flex-col gap-5 dark:prose-invert">
        {data["_embedded"]["wp:featuredmedia"] && (
          <img
            src={data["_embedded"]["wp:featuredmedia"][0].source_url}
            alt={data.title.rendered}
            className="mx-auto h-full w-auto rounded-md"
          />
        )}
        <h1 className="prose-2xl font-bold dark:prose-invert">
          {data.title.rendered}
        </h1>
        <article
          className="prose dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: data.content.rendered }}
        />
      </div>
    </Layout>
  );
}

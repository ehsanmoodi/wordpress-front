import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const id = Route.useParams().id;

  return <div>Hello "/${id}"!</div>;
}

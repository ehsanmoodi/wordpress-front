import {
  Link,
  Outlet,
  createRootRoute,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { QueryClient } from "@tanstack/react-query";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <nav className="p-4 flex gap-2 text-lg max-w-xl mx-auto">
        <Link
          to="/"
          activeProps={{
            className: "",
          }}
          className="font-bold"
          activeOptions={{ exact: true }}
        >
          Wordpress Frontend
        </Link>
      </nav>
      <hr />
      <Outlet />
      <ReactQueryDevtools buttonPosition="bottom-left" />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}

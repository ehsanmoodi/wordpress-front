import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "../components/layout";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <Layout>
      <h3>Welcome Home!</h3>
    </Layout>
  );
}

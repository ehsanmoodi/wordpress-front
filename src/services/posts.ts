import { queryOptions } from "@tanstack/react-query";
import axios from "axios";

const fetchPosts = async ({ page }: { page: number }) => {
  // TODO: add types for response
  const { data, headers } = await axios.get(
    import.meta.env.VITE_API_BASE + "posts",
    { params: { page, per_page: 6, context: "embed", _embed: true } },
  );

  return {
    posts: data,
    totalPages: Number(headers["x-wp-totalpages"]),
  };
};

export const postsQueryOptions = (page: number) =>
  queryOptions({
    queryKey: ["posts", page],
    queryFn: () => fetchPosts({ page }),
  });

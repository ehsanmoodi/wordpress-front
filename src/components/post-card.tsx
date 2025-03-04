import { Link } from "@tanstack/react-router";
import placeholder from "../assets/image-not-available.png";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

type PostCardProps = {
  id: string;
  image: string;
  title: string;
  date: string;
};

export function PostCard({ id, image, title, date }: PostCardProps) {
  return (
    <Link
      to="/$id"
      params={{ id: id }}
      className="flex flex-col border border-gray-300 rounded-md group"
    >
      <div className="overflow-hidden shrink-0 rounded-t-md h-36">
        <img
          src={image || placeholder}
          alt={title}
          className="object-cover object-center group-hover:scale-125 transition-all duration-300"
        />
      </div>
      <div className="grow p-2 prose-sm dark:prose-invert">
        <p>{title}</p>
        <small>{dayjs(date).fromNow()}</small>
      </div>
    </Link>
  );
}

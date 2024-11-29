import { fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import ThreadCard from "../cards/ThreadCard";
import { currentUser } from "@clerk/nextjs/server";

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

interface Thread {
  _id: string
  text: string,
  author: {
    name: string,
    image: string,
    id: string
  },
  parentId: string | null,
  community: {
    id: string;
    name: string;
    image: string;
  } | null,
  createdAt: string,
  children: string[],
  comments: {
    author: {
      image: string
    }
  }[]
}

const ThreadsTab = async ({ currentUserId, accountId, accountType }: Props) => {
  let result = await fetchUserPosts(accountId);

  if (!result) redirect("/");

  return (
    <section className="mt-9 flex flex-col gap-10">
      {result[0].threads.map((thread: Thread) => (
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={currentUserId}
          parentId={thread.parentId}
          content={thread.text}
          author={
            accountType === "User"
              ? {
                  name: result[0].name,
                  image: result[0].image,
                  id: result[0].id,
                }
              : {
                  name: thread.author.name,
                  image: thread.author.image,
                  id: thread.author.id,
                }
          }
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.comments}
        />
      ))}
    </section>
  );
};

export default ThreadsTab;

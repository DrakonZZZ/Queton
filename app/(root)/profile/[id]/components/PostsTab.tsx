import QuestionCard from '@/components/QuestionCard';
import { getUserQuestions } from '@/lib/actions/user.action';
import { SearchParamsProps } from '@/types';

interface PostsTabProps extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const PostsTab = async ({ searchParams, userId, clerkId }: PostsTabProps) => {
  const data = await getUserQuestions({ userId, page: 1 });
  return (
    <>
      {data?.questions.map((q) => {
        const { id, title, author, upvotes, view, createdAt, tags, replies } =
          q;

        return (
          <div key={id} className="my-4">
            <QuestionCard
              id={id}
              clerkId={clerkId}
              title={title}
              author={author}
              upvotes={upvotes.length}
              replies={replies.length}
              view={view}
              createAt={createdAt}
              tags={tags}
            />
          </div>
        );
      })}
    </>
  );
};

export default PostsTab;

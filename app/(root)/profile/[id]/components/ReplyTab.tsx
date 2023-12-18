import ReplyCard from '@/components/ReplyCard';
import { getUserReplies } from '@/lib/actions/user.action';
import { SearchParamsProps } from '@/types';

interface ReplyTabProps extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const ReplyTab = async ({ searchParams, userId, clerkId }: ReplyTabProps) => {
  const data = await getUserReplies({ userId, page: 1 });
  return (
    <>
      {data?.replies.map((r) => {
        const { _id, question, author, upvotes, createdAt, view } = r;
        return (
          <div className="my-4" key={_id}>
            <ReplyCard
              id={_id}
              clerkId={clerkId}
              author={author}
              question={question}
              upvotes={upvotes.length}
              createdAt={createdAt}
              view={view}
            />
          </div>
        );
      })}
    </>
  );
};

export default ReplyTab;

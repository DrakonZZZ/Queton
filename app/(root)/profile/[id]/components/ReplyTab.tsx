import ReplyCard from '@/components/ReplyCard';
import { getUserReplies } from '@/lib/actions/user.action';
import { SearchParamsProps } from '@/types';

interface ReplyTabProps extends SearchParamsProps {
  userId: string;
}

const ReplyTab = async ({ searchParams, userId }: ReplyTabProps) => {
  const data = await getUserReplies({ userId, page: 1 });
  return (
    <>
      {data?.replies.map((r) => {
        const { _id, clerkId, question, author, upvotes, createdAt } = r;
        return (
          <div className="my-4" key={_id}>
            <ReplyCard
              id={_id}
              clerkId={clerkId}
              author={author}
              question={question}
              upvotes={upvotes.length}
              createdAt={createdAt}
            />
          </div>
        );
      })}
    </>
  );
};

export default ReplyTab;

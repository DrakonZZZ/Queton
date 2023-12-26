'use client';
import { deleteReply } from '@/lib/actions/answer.action';
import { deleteQuestion } from '@/lib/actions/ask.actions';
import { usePathname, useRouter } from 'next/navigation';
import { FaRegEdit } from 'react-icons/fa';
import { MdOutlineDelete } from 'react-icons/md';

interface EditProps {
  type: string;
  itemId: string;
}

const EditActions = ({ type, itemId }: EditProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleEdit = async () => {
    router.push(`/question/edit/${JSON.parse(itemId)}`);
  };

  const handleDelete = async () => {
    if (type === 'post') {
      await deleteQuestion({ questionId: JSON.parse(itemId), path: pathname });
    } else if (type === 'reply') {
      await deleteReply({ replyId: JSON.parse(itemId), path: pathname });
    }
  };

  return (
    <div className="flex items-center justify-end gap-3 max-sm:w-full">
      {type === 'post' && (
        <FaRegEdit
          size={14}
          className="cursor-pointer text-black/50 dark:text-white hover:text-black/70"
          onClick={handleEdit}
        />
      )}
      {
        <MdOutlineDelete
          size={14}
          className="cursor-pointer text-black/50 dark:text-white hover:text-black/70"
          onClick={handleDelete}
        />
      }
    </div>
  );
};

export default EditActions;

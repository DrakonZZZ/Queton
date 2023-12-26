'use client';

import { searchQuery } from '@/lib/query';
import { Button } from './ui/button';
import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
  pageNumber: number;
  nextPage: boolean;
}

const Pagination = ({ pageNumber, nextPage }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageNavigation = (change: string) => {
    const pageSwitch = change === 'prev' ? pageNumber - 1 : pageNumber + 1;

    const newUrl = searchQuery({
      params: searchParams.toString(),
      key: 'page',
      value: pageSwitch.toString(),
    });

    router.push(newUrl);
  };

  if (!nextPage && pageNumber === 1) return null;
  return (
    <div className="flex w-full items-center justify-between mt-6 px-3">
      <p>Page no. {pageNumber}</p>
      <div className="flex gap-2">
        <Button
          disabled={pageNumber === 1}
          onClick={() => handlePageNavigation('prev')}
          className="w-fit flex gap-2 bg-black text-white dark:bg-white dark:text-black min-h-[30px] px-6 py-3 rounded-md hover:bg-black/70 dark:hover:bg-white/80 transistion self-end"
        >
          <span className="body-medium">Prev</span>
        </Button>
        <Button
          disabled={!nextPage}
          onClick={() => handlePageNavigation('next')}
          className="w-fit flex gap-2 bg-black text-white dark:bg-white dark:text-black min-h-[30px] px-6 py-3 rounded-md hover:bg-black/70 dark:hover:bg-white/80 transistion self-end"
        >
          <span className="body-medium">Next</span>
        </Button>
      </div>
    </div>
  );
};

export default Pagination;

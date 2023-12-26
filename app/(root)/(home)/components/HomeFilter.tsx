'use client';

import { HomePageFilters } from '@/constants/filters';
import { searchQuery } from '@/lib/query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const HomeFilter = () => {
  const searchParams = useSearchParams();
  const [active, setActive] = useState('recommended');
  const router = useRouter();

  const handleFilterChange = (item: string) => {
    if (active === item) {
      const urlChange = searchQuery({
        params: searchParams.toString(),
        key: 'filter',
        value: item.toLocaleLowerCase(),
      });

      router.push(urlChange, { scroll: false });
    } else {
      setActive(item);

      const urlChange = searchQuery({
        params: searchParams.toString(),
        key: 'filter',
        value: item.toLocaleLowerCase(),
      });
      router.push(urlChange, { scroll: false });
    }
  };

  return (
    <div className="w-fit mt-top hidden flex-wrap gap-3 md:flex mx-2 pb-1">
      {HomePageFilters.map((item) => {
        const { name, value } = item;
        return (
          <div
            key={value}
            onClick={() => {}}
            className="text-black/30 dark:text-white/30 text-xl"
          >
            /{' '}
            <span
              className={`${
                active === value
                  ? 'text-black font-bold dark:text-white'
                  : 'text-black/70 dark:text-white/70  hover:text-black hover:font-bold dark:hover:text-white dark:hover:font-bold text-lg'
              }  cursor-pointer transition`}
              onClickCapture={() => handleFilterChange(value)}
            >
              {name}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default HomeFilter;

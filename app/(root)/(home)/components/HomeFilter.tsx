'use client';

import { HomePageFilters } from '@/constants/filters';

const HomeFilter = () => {
  const isActive = 'recommended';
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
                isActive === value
                  ? 'text-black font-bold dark:text-white'
                  : 'text-black/70 dark:text-white/70  hover:text-black hover:font-bold dark:hover:text-white dark:hover:font-bold text-lg'
              }  cursor-pointer transition`}
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

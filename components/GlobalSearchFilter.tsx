'use client';
import { GSearchFilters } from '@/constants/filters';
import { searchQuery } from '@/lib/query';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

const GlobalSearchFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const typeSelection = searchParams.get('type');

  const [activeType, setActiveType] = useState(typeSelection || '');

  const handleTypeClick = (type: string) => {
    if (activeType === type) {
      const urlChange = searchQuery({
        params: searchParams.toString(),
        key: 'type',
        value: type.toLocaleLowerCase(),
      });

      router.push(urlChange, { scroll: false });
    } else {
      setActiveType(type);

      const urlChange = searchQuery({
        params: searchParams.toString(),
        key: 'type',
        value: type.toLocaleLowerCase(),
      });
      router.push(urlChange, { scroll: false });
    }
  };
  return (
    <div className="flex items-center text-dark-400_dark-900 px-5 dark:text-white">
      <p className="body-medium">Type: </p>
      <div className="flex items-center gap-3 ml-5">
        {GSearchFilters.map((item) => (
          <button
            type="button"
            key={item.value}
            className={`light-border-2 small-medium rounded-md py-1 px-2   hover:bg-black dark:hover:bg-white text-white dark:text-black ${
              activeType === item.value
                ? 'bg-black dark:bg-white'
                : 'bg-black/40 dark:bg-white/40'
            }`}
            onClick={() => handleTypeClick(item.value)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GlobalSearchFilter;

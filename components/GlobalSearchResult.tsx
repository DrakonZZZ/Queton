'use client';
import { useEffect, useRef, useState } from 'react';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import GlobalSearchFilter from './GlobalSearchFilter';
import { globalSearch } from '@/lib/actions/search.action';

const GlobalSearchResult = () => {
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const [results, setResults] = useState([
    {
      type: 'posts',
      id: '1',
      title: 'Hail Jesus',
    },
    {
      type: 'tag',
      id: '2',
      title: 'Read daily',
    },
    {
      type: 'user',
      id: '3',
      title: 'Paul',
    },
  ]);

  const global = searchParams.get('global');
  const type = searchParams.get('type');

  const linkDestination = (type: string, id: string) => {
    switch (type) {
      case 'question':
        return `/question/${id}`;
      case 'user':
        return `/profile/${id}`;
      case 'answer':
        return `/question/${id}`;
      case 'tag':
        return `/tags/${id}`;
      default:
        return '/';
    }
  };

  useEffect(() => {
    const fetcher = async () => {
      //resetting the global result
      setResults([]);
      setIsLoading(true);

      try {
        const data = await globalSearch({ query: global, type });

        setResults(JSON.parse(data));
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };

    if (global) {
      fetcher();
    }
  }, [global, type]);
  return (
    <div className="w-full top-full absolute z-10 mt-3 py-5 shadow-sm p-4 bg-white dark:bg-black border-2 border-black/10 dark:border-white/20">
      <GlobalSearchFilter />
      <div className="my-2 h-[1px] dark:bg-white/20 bg-black/10"></div>
      <div className="spac-y-5">
        <p className="text-dark-400_dark-900 paragraph-semibold px-5">
          Top Results
        </p>
        {isLoading ? (
          <div className="flex justify-center items-center gap-6 w-full px-5">
            <ReloadIcon className="my-2 h-6 w-6 text-primary-500 animate-spin" />
            <p className="text-dark-200_light-800 body-regular">
              Looking through database
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {results.length > 0 ? (
              results.map((item: any, idx: number) => (
                <Link
                  href={linkDestination(item.type, item.id)}
                  key={item.type + item.id + idx}
                  className="w-full flex cursor-pointer items-start gap-3 px-5 py-2.5 hover:bg-light-700/20"
                >
                  <Image
                    src="/assets/icons/tag.svg"
                    alt="tags"
                    width={18}
                    height={18}
                    className="invert-colors mt-1 object-contain"
                  />
                  <div className="flex flex-col">
                    <p className="body-medium text-dark dark:text-white line-clamp-1">
                      {item.title}
                    </p>
                    <p className="text-black/40 dark:text-white small-medium mt-1 font-bold capitalize">
                      {item.type}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex-center flex-col px-5">
                <p className="text-dark-200_light-800 body-regular px-5 py-2.5">
                  No results found
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalSearchResult;

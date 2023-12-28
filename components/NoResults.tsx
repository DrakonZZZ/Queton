import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';

interface NoResultsProps {
  title: string;
  link: string;
  btnTitle: string;
  desc: string;
}

const NoResults = ({ title, link, btnTitle, desc }: NoResultsProps) => {
  return (
    <div className="mt-10 w-full flex flex-col justify-center items-center">
      <Image
        src="/assets/no-data-icon.svg"
        width={270}
        height={200}
        alt="Not Found"
        className="block object-cover"
      />
      <h2 className="h2-bold text-dark-200_light-900 mt-8">{title}</h2>
      <p className="body-regular text-dark-500_light-700 my-3.5 max-w-md text-center">
        {desc}
      </p>
      <Link href={link}>
        <Button className="bg-black text-white dark:bg-white dark:text-black min-h-[40px] px-4 py-3 rounded-md hover:bg-black/70 dark:hover:bg-white/80 transistion mt-5">
          {btnTitle}
        </Button>
      </Link>
    </div>
  );
};

export default NoResults;

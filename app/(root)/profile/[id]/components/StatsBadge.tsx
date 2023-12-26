import Image from 'next/image';

interface StatsBadgeProp {
  imgUrl: string;
  title: string;
  value: number;
}

const StatsBadge = ({ imgUrl, title, value }: StatsBadgeProp) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border border-black/10 dark:border-white/20 rounded-md p-6 shadow-light300 dark:shadow-dark-200">
      <div>
        <p className="paragraph-semibold text-black dark:text-white">{value}</p>
        <p className="body-medium text-black dark:text-white">{title}</p>
      </div>
      <Image src={imgUrl} alt={title} width={40} height={50} />
    </div>
  );
};

export default StatsBadge;

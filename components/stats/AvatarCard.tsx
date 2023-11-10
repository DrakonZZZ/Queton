import Image from 'next/image';
import Link from 'next/link';

interface AvatarCardProp {
  imgSrc: string;
  author: string;
  isAuthor: boolean;
  href: string;
  title: string;
}

const AvatarCard = ({
  imgSrc,
  author,
  isAuthor,
  href,
  title,
}: AvatarCardProp) => {
  return (
    <div>
      <Link href={href} className="flex-center flex-wrap gap-2">
        <Image
          src={imgSrc}
          width={20}
          height={20}
          alt={author}
          className=" object-contain rounded-full"
        />
        <p className="hidden small-medium text-dark-400_light-800 md:flex items-center gap-1  ">
          {author}
          {title}
        </p>
      </Link>
    </div>
  );
};

export default AvatarCard;

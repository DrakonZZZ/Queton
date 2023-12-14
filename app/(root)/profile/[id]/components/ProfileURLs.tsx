import Link from 'next/link';
import { IoLinkSharp } from 'react-icons/io5';

interface ProfileURLsProp {
  title: string;
  href?: string;
}

const ProfileURLs = ({ title, href }: ProfileURLsProp) => {
  return (
    <div className="flex-center gap-1">
      {href ? (
        <Link href={href} target="_blank" className="paragraph-medium">
          {title}
        </Link>
      ) : (
        <p className="paragraph-medium">{title}</p>
      )}
      <IoLinkSharp />
    </div>
  );
};

export default ProfileURLs;

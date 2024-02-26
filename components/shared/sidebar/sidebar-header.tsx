import { ArrowLeftRight } from 'lucide-react';
import Image from 'next/image';

type Props = {
  props: boolean;
};
const SidebarHeader = ({ props }: Props) => {
  return (
    <div className="flex items-center w-full my-5 justify-center  gap-x-5">
      <Image
        src={'/images/logo-2.png'}
        alt="logo"
        width={100}
        height={100}
      />
    </div>
  );
};

export default SidebarHeader;

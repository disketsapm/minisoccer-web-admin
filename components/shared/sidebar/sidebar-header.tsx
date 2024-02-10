import { ArrowLeftRight } from 'lucide-react';

type Props = {
  props: boolean;
};
const SidebarHeader = ({ props }: Props) => {
  return (
    <div className="flex items-center w-full my-8 justify-center  gap-x-5">
      <ArrowLeftRight className="text-white" />

      <h1 className={props ? 'text-white font-semibold text-md cursor-pointer text-lg' : 'hidden'}>
        <span> Mini Soccer</span>
      </h1>
    </div>
  );
};

export default SidebarHeader;

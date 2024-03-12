"use client";

import { BannerForm } from "./components/banner-form";
import { useGetBanners } from "@/hooks/banner/useGetBanners";

const BannerIdPage = ({ params }: { params: { bannerId: string } }) => {
  const { data, isPending } = useGetBanners({ _id: params.bannerId });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BannerForm data={(data?.data as object) ?? null} />
      </div>
    </div>
  );
};

export default BannerIdPage;

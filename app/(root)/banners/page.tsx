"use client";

import { BannerClient } from "./components/client";
import { useGetBanners } from "@/hooks/banner/useGetBanners";

const BannerPage = () => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BannerClient />
      </div>
    </div>
  );
};

export default BannerPage;

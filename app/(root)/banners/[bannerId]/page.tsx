import { BannerService } from "@/services/banner/banner.service";
import { BannerForm } from "./components/banner-form";

const BannerPage = async ({ params }: { params: { bannerId: string } }) => {
  const bannerService = new BannerService();

  let response: any = {};
  if (params.bannerId !== "new") {
    response = await bannerService.getBannerById({ _id: params.bannerId });
  }
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BannerForm data={response?.data ?? null} />
      </div>
    </div>
  );
};

export default BannerPage;

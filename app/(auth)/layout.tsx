import BackgroundImage from "@/public/bg.jpg";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div
        className={`flex  items-center  justify-center min-h-screen  py-10 px-4 sm:px-6 lg:px-8`}
      >
        <div className="z-10 flex w-full items-center  justify-center ">{children}</div>
      </div>
    </>
  );
}

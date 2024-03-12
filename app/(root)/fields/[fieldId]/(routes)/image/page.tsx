"use client";

import { ImageFieldClient } from "./components/client";

const ImageFieldPage = () => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ImageFieldClient />
      </div>
    </div>
  );
};

export default ImageFieldPage;

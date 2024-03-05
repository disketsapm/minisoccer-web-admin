"use client";

import { FieldClient } from "./components/client";

const FieldPage = () => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <FieldClient />
      </div>
    </div>
  );
};

export default FieldPage;

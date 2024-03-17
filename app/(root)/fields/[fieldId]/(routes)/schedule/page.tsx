"use client";

import { ScheduleClient } from "./components/client";

const SchedulePage = () => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ScheduleClient />
      </div>
    </div>
  );
};

export default SchedulePage;

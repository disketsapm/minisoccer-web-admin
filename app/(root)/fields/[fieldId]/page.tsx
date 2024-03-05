"use client";

import { FieldForm } from "./components/field-form";
import { useGetFields } from "@/hooks/field/useGetFields";

const FieldPage = ({ params }: { params: { fieldId: string } }) => {
  const { data, isPending } = useGetFields({ _id: params.fieldId });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <FieldForm data={(data?.data as object) ?? null} />
      </div>
    </div>
  );
};

export default FieldPage;

"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UsersClient } from "./components/client";

const UserPage = () => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Role</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
          </TabsList>
          <TabsContent
            className="space-y-4 p-8 pt-6"
            value="all"
          >
            <UsersClient />
          </TabsContent>
          <TabsContent
            className="space-y-4 p-8 pt-6"
            value="admin"
          >
            <UsersClient type="admin" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserPage;

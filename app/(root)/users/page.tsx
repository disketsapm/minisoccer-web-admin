'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UsersClient } from './components/client';

const UserPage = () => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Role</TabsTrigger>
            <TabsTrigger value="Admin">Admin</TabsTrigger>
            <TabsTrigger value="Cashier">Cashier</TabsTrigger>
            <TabsTrigger value="Customer">Customer</TabsTrigger>
          </TabsList>
          <TabsContent
            className="space-y-4 p-8 pt-6"
            value="all"
          >
            <UsersClient />
          </TabsContent>
          <TabsContent
            className="space-y-4 p-8 pt-6"
            value="Admin"
          >
            <UsersClient type="Admin" />
          </TabsContent>
          <TabsContent
            className="space-y-4 p-8 pt-6"
            value="Cashier"
          >
            <UsersClient type="Cashier" />
          </TabsContent>
          <TabsContent
            className="space-y-4 p-8 pt-6"
            value="Customer"
          >
            <UsersClient type="Customer" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserPage;

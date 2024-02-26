'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UsersClient } from './components/client';

const UserPage = () => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">Semua Akun</TabsTrigger>
            <TabsTrigger value="Customer">Customer</TabsTrigger>
            <TabsTrigger value="Cashier">Kasir</TabsTrigger>
            <TabsTrigger value="Admin">Admin</TabsTrigger>
          </TabsList>
          <TabsContent
            className="space-y-4 p-8 pt-6"
            value="all"
          >
            <UsersClient />
          </TabsContent>
          <TabsContent
            className="space-y-4 p-8 pt-6"
            value="Customer"
          >
            <UsersClient type="Customer" />
          </TabsContent>
          <TabsContent
            className="space-y-4 p-8 pt-6"
            value="Cashier"
          >
            <UsersClient type="Cashier" />
          </TabsContent>
          <TabsContent
            className="space-y-4 p-8 pt-6"
            value="Admin"
          >
            <UsersClient type="Admin" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserPage;

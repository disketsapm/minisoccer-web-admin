import LoginForm from "./components/user-auth-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LoginPage = () => {
  return (
    <>
      <Card className="w-full md:1/2 lg:w-[40%] xl:w-[30%]">
        <CardHeader className="border-none">
          <CardTitle className="text-center my-5 ">Soccer Chief</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </>
  );
};

export default LoginPage;

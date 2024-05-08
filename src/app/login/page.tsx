import LoginForm from "@/components/auth/LoginForm";
import OAuthButtons from "@/components/auth/OAuthButtons";
import { getProviders } from "next-auth/react";

export default async function LoginPage() {
  const providers = await getProviders();

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-8">
      <LoginForm />
      {/* <OAuthButtons providers={providers} /> */}
    </div>
  );
}

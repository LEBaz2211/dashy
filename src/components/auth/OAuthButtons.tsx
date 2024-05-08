"use client";

import { signIn, ClientSafeProvider } from "next-auth/react";

type Props = {
  providers: Record<string, ClientSafeProvider> | null;
};

const OAuthButtons: React.FC<Props> = ({ providers }) => {
  if (!providers) return null;

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-100 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Sign in with</h2>
      {Object.values(providers).map(
        (provider) =>
          provider.name !== "Credentials" && (
            <button
              key={provider.name}
              className="px-4 py-2 bg-blue-500 text-white rounded my-2 w-full"
              onClick={() => signIn(provider.id)}
            >
              {provider.name}
            </button>
          )
      )}
    </div>
  );
};

export default OAuthButtons;

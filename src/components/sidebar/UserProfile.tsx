import Image from "next/image";
import { User } from "next-auth";

type Props = {
  user: User | null | undefined;
};

export default function UserProfile({ user }: Props) {
  return (
    <div className="mt-8 flex items-center gap-4">
      {user?.image ? (
        <Image
          src={user.image}
          alt="User Avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
      ) : (
        <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center">
          <span className="text-white text-lg">
            {user?.name?.charAt(0).toUpperCase()}
          </span>
        </div>
      )}
      <div>
        <p className="font-bold">{user?.name || "Username"}</p>
        <p className="text-gray-600">{user?.email}</p>
      </div>
    </div>
  );
}

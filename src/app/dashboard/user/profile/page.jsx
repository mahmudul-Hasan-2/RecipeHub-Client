import ProfileForm from "@/components/dashboard/user/ProfileForm";
import { getSession } from "@/lib/core/session";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const session = await getSession();
  const user = session?.user;

  if (!user) redirect("/login");

  return (
    <div className="w-full sm:max-w-xl mx-auto p-6 md:p-10">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="relative h-28 w-28 mx-auto rounded-full overflow-hidden border-4 border-zinc-100 dark:border-zinc-800 mb-4">
            <img
              src={user.image || "/avatar.png"}
              alt={user.name}
              className="h-full w-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-black">{user.name}</h2>
          <p className="text-zinc-500">{user.email}</p>
        </div>

        {/* Profile Edit Form Component */}
        <ProfileForm user={user} />
      </div>
    </div>
  );
};

export default ProfilePage;

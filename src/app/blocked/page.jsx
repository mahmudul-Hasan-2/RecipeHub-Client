import React from "react";
import Link from "next/link";
import { FiAlertOctagon, FiMail, FiHome } from "react-icons/fi";
import { Button } from "@heroui/react";

const Blocked = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 ">
      <div className="max-w-md w-full bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl text-center">
        {/* আইকন */}
        <div className="w-20 h-20 mx-auto bg-rose-100 dark:bg-rose-900/20 text-rose-500 rounded-full flex items-center justify-center mb-6">
          <FiAlertOctagon size={40} />
        </div>

        {/* টেক্সট */}
        <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 mb-3">
          Account Restricted
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 mb-8 leading-relaxed">
          Your account has been blocked by the administrator due to a violation
          of our community guidelines. If you believe this is a mistake, please
          contact our support team.
        </p>

        {/* বাটন */}
        <div className="flex flex-col gap-3">
          <Link href="/">
            <Button
              variant="flat"
              className="w-full font-bold"
              startContent={<FiHome size={18} />}
            >
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Blocked;

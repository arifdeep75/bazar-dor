"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { authClient } from "../lib/auth-client";

export default function AuthControls() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          setOpen(false);
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  if (isPending) {
    return (
      <div className="h-9 w-24 animate-pulse rounded-lg bg-gray-100" />
    );
  }

  if (session?.user) {
    return (
      <div className="relative">
        {/* User Button */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition hover:bg-gray-50"
        >
          {/* Avatar */}
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-sm font-semibold text-green-700">
            {session.user.name?.charAt(0).toUpperCase() || "U"}
          </div>

          {/* Name */}
          <span className="hidden text-sm font-medium text-gray-700 sm:block">
            {session.user.name}
          </span>

          {/* Arrow */}
          <span
            className={`text-xs text-gray-500 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          >
            ▾
          </span>
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-xl border border-gray-200 bg-white p-3 shadow-lg">
            {/* User Info */}
            <div className="border-b border-gray-100 px-2 pb-3">
              <p className="font-semibold text-gray-900">
                {session.user.name}
              </p>
              

              <p className="mt-1 truncate text-xs text-gray-500">
                {session.user.email}
              </p>
            </div>

            {/* Profile */}
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
            >
              <span>👤</span>
              <span>আমার প্রোফাইল</span>
            </Link>

            {/* Logout */}
            <button
              type="button"
              onClick={handleLogout}
              className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-600 transition hover:bg-red-50"
            >
              <span>🚪</span>
              <span>সাইন আউট</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/sign-in"
        className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
      >
        সাইন ইন
      </Link>

      <Link
        href="/sign-up"
        className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
      >
        সাইন আপ
      </Link>
    </div>
  );
}
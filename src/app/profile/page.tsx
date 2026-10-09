"use client";
import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "../../lib/auth-client";
import Image from "next/image";
export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (!isPending && !session?.user) {
      router.replace("/sign-in");
    }
    
  }, [isPending, session, router]);
  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
          router.refresh();
        },
      },
    });
  };
  const handleUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    const trimmedName = name.trim();
    if (!trimmedName) {
      setMessage("আপনার নাম লিখুন।");
      return;
    }
    setSaving(true);
    try {
      const { error } = await authClient.updateUser({ name: trimmedName });
      if (error) {
        setMessage(error.message || "তথ্য আপডেট করা যায়নি।");
        return;
      }
      setMessage("আপনার নাম সফলভাবে আপডেট হয়েছে।");
      router.refresh();
    } catch {
      setMessage("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setSaving(false);
    }
  };
  if (isPending || !session?.user) {
    return (
      <main className="min-h-[70vh] bg-[#f0f6f0] px-4 py-12">
        {" "}
        <div className="mx-auto max-w-2xl animate-pulse rounded-2xl bg-white p-8">
          {" "}
          <div className="h-6 w-40 rounded bg-gray-200" />{" "}
          <div className="mt-6 h-20 rounded-xl bg-gray-100" />{" "}
          <div className="mt-4 h-32 rounded-xl bg-gray-100" />{" "}
        </div>{" "}
      </main>
    );
  }
  const user = session.user;
  const initials =
    user.name
      ?.trim()
      .split(/\s+/)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";
  return (
    <main className="min-h-[70vh] bg-[#f0f6f0] px-4 py-12 sm:py-16">
      {" "}
      <div className="mx-auto max-w-2xl">
        {" "}
        {/* Page Heading */}{" "}
        <div className="mb-6 text-center">
          {" "}
          <h1 className="text-2xl font-bold text-gray-900">
            {" "}
            আমার প্রোফাইল{" "}
          </h1>{" "}
          <p className="mt-1 text-sm text-gray-500">
            {" "}
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।{" "}
          </p>{" "}
        </div>{" "}
        {/* User Information Card */}{" "}
        <section className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
          {" "}
          <div className="flex min-w-0 items-center gap-3">
            {" "}
            {user.image ? (
              <Image
                src={user.image}
                alt="প্রোফাইল ছবি"
                width={48}
                height={48}
                className="h-12 w-12 shrink-0 rounded-xl object-cover"
              />
            ) : (
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 font-semibold text-green-700">
                {" "}
                {initials}{" "}
              </div>
            )}{" "}
            <div className="min-w-0">
              {" "}
              <h2 className="truncate text-sm font-semibold text-gray-900">
                {" "}
                {user.name}{" "}
              </h2>{" "}
              <p className="break-all text-xs text-gray-500">
                {" "}
                {user.email}{" "}
              </p>{" "}
            </div>{" "}
          </div>{" "}
          <button
            type="button"
            onClick={handleSignOut}
            className="shrink-0 self-start rounded-lg border border-red-300 px-3 py-2 text-xs font-medium text-red-500 transition hover:bg-red-50 sm:self-center"
          >
            {" "}
            সাইন আউট{" "}
          </button>{" "}
        </section>{" "}
        {/* Profile Information Form */}{" "}
        <section className="mt-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
          {" "}
          <h2 className="text-sm font-semibold text-gray-900"> তথ্য </h2>{" "}
          <form onSubmit={handleUpdate} className="mt-5">
            {" "}
            <label
              htmlFor="profile-name"
              className="mb-2 block text-xs font-medium text-gray-700"
            >
              {" "}
              নাম{" "}
            </label>{" "}
            <input
              id="profile-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />{" "}
            {message && (
              <p
                role="status"
                className={`mt-3 text-sm ${message.includes("সফলভাবে") ? "text-green-700" : "text-red-600"}`}
              >
                {" "}
                {message}{" "}
              </p>
            )}{" "}
            <button
              type="submit"
              disabled={saving}
              className="mt-3 w-full rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {" "}
              {saving ? "আপডেট হচ্ছে..." : "আপডেট"}{" "}
            </button>{" "}
          </form>{" "}
        </section>{" "}
      </div>{" "}
    </main>
  );
}

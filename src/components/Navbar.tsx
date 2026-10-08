"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import AuthControls from "./AuthControls";

const categories = [
  { name: "চাল", icon: "🍚", slug: "chal" },
  { name: "ডাল", icon: "🫘", slug: "dal" },
  { name: "তেল", icon: "🛢️", slug: "tel" },
  { name: "সবজি", icon: "🥬", slug: "sobji" },
  { name: "মাছ", icon: "🐟", slug: "mach" },
  { name: "মাংস", icon: "🍗", slug: "mangsho" },
  { name: "ডিম-দুধ", icon: "🥛", slug: "dim-dui" },
  { name: "মসলা", icon: "🌶️", slug: "mosla" },
];

const tickerItems = [
  { name: "স্বর্ণমাছি চাল", price: 148, change: "+2.1%", up: true },
  { name: "মিনিকেট চাল", price: 99, change: "-2.9%", up: false },
  { name: "বাটাম সাইজ চাল", price: 88, change: "+3.1%", up: true },
  { name: "মসুর ডাল", price: 145, change: "-1.9%", up: false },
  { name: "সয়াবিন তেল", price: 180, change: "+2.8%", up: true },
];

function CurrentDate() {
  const currentDate = new Intl.DateTimeFormat("bn-BD", {
    timeZone: "Asia/Dhaka",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <p className="text-xs text-gray-500">
      {currentDate}
    </p>
  );
}

function CategoryLinks() {
  const pathname = usePathname();

  return (
    <nav className="mx-auto flex max-w-6xl gap-6 overflow-x-auto px-4 py-2">
      {categories.map((category) => {
        const isActive =
          pathname === `/category/${category.slug}`;

        return (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            className={`flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-sm ${
              isActive
                ? "bg-green-50 font-semibold text-green-700"
                : "text-gray-700 hover:text-green-600"
            }`}
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export default function Navbar() {
  return (
    <header className="bg-white">

      {/* Top Navbar */}
      <div className="border-b">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">

          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-xl">
              🛒
            </div>

            <div>
              <h1 className="text-xl font-bold text-gray-900">
                বাজার দর
              </h1>

              <Suspense
                fallback={
                  <p className="text-xs text-gray-500">
                    লোড হচ্ছে...
                  </p>
                }
              >
                <CurrentDate />
              </Suspense>
            </div>
          </Link>

          <AuthControls />

        </div>
      </div>

      {/* Categories */}
      <div className="border-b">
        <Suspense
          fallback={
            <div className="mx-auto max-w-6xl px-4 py-2 text-sm text-gray-400">
              লোড হচ্ছে...
            </div>
          }
        >
          <CategoryLinks />
        </Suspense>
      </div>

      {/* Price Ticker */}
      <div className="overflow-hidden border-b bg-gray-50">
        <div className="flex w-max animate-[marquee_25s_linear_infinite] gap-10 px-4 py-2">

          {[...tickerItems, ...tickerItems].map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="flex shrink-0 items-center gap-2 text-sm"
            >
              <span>🟢</span>

              <span className="text-gray-700">
                {item.name} {item.price} টাকা/কেজি
              </span>

              <span
                className={
                  item.up
                    ? "font-semibold text-red-500"
                    : "font-semibold text-green-600"
                }
              >
                {item.up ? "▲" : "▼"} {item.change}
              </span>
            </div>
          ))}

        </div>
      </div>

    </header>
  );
}
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Hero() {
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();

      const formattedDate = new Intl.DateTimeFormat("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(now);

      setDate(formattedDate);
    };

    updateDate();

    // Update automatically every day
    const timer = setInterval(updateDate, 60 * 60 * 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-[#f3f8f3] py-8 sm:py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex min-h-75 items-center justify-between overflow-hidden rounded-3xl border border-gray-200 bg-white px-6 py-8 sm:px-10 lg:px-12">

          {/* Left Content */}
          <div className="w-full lg:w-[60%]">

            {/* Live Date */}
            <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
              {date}
            </span>

            <h1 className="mt-4 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
              বাজারভিত্তিক হালনাগাদ তথ্য, দ্রুত এবং নির্ভরযোগ্যভাবে এক জায়গায়।
            </p>

            <a
              href="#সব-পণ্য"
              className="mt-6 inline-block rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-green-700"
            >
              সব পণ্য দেখুন
            </a>
          </div>

          {/* Hero Image */}
          <div className="hidden w-[35%] justify-center lg:flex">
            <Image
              src="/bazar-hero.png"
              alt="বাজারের পণ্যের ঝুড়ি"
              width={300}
              height={250}
              className="w-full max-w-70 object-contain"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
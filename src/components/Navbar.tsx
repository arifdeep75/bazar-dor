const categories = [
  { name: "চাল", icon: "🍚" },
  { name: "ডাল", icon: "🫘" },
  { name: "তেল", icon: "🛢️" },
  { name: "সবজি", icon: "🥬" },
  { name: "মাছ", icon: "🐟" },
  { name: "মাংস", icon: "🍗" },
  { name: "ডিম-দুধ", icon: "🥛" },
  { name: "মসলা", icon: "🌶️" },
];

const tickerItems = [
  { name: "স্বর্ণমাছি চাল", price: 148, change: "+2.1%", up: true },
  { name: "মিনিকেট চাল", price: 99, change: "-2.9%", up: false },
  { name: "বাটাম সাইজ চাল", price: 88, change: "+3.1%", up: true },
  { name: "মসুর ডাল", price: 145, change: "-1.9%", up: false },
  { name: "সয়াবিন তেল", price: 180, change: "+2.8%", up: true },
];

export default function Navbar() {
  return (
    <header className="bg-white">

      {/* Top Row */}
      <div className="border-b">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-xl">
              🛒
            </div>

            <div>
              <h1 className="text-xl font-bold text-gray-900">
                বাজার দর
              </h1>

              <p className="text-xs text-gray-500">
                রাজধানী ও আঞ্চলিক, ২০২৬
              </p>
            </div>
          </div>

          {/* Auth */}
          <div className="flex items-center gap-2">
            <button className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
              সাইন ইন
            </button>

            <button className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700">
              সাইন আপ
            </button>
          </div>

        </div>
      </div>

      {/* Category Row */}
      <div className="border-b">
        <nav className="mx-auto flex max-w-6xl gap-6 overflow-x-auto px-4 py-2">

          {categories.map((category, index) => (
            <button
              key={category.name}
              className={`flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-sm ${
                index === 0
                  ? "bg-green-50 font-semibold text-green-700"
                  : "text-gray-700 hover:text-green-600"
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}

        </nav>
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
"use client";

import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email) return;

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/newsletter",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
        
      );

      const data = await res.json();
      setMessage(data.message);

      if (res.ok) {
        setEmail("");
      }
    } catch (error) {
      setMessage("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-neutral-900 text-neutral-300 mt-24 relative">
      <div className="container mx-auto px-6 py-14">

        {/* Top Section */}
        <div className="grid gap-12 md:grid-cols-3 items-start">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white">
              Ram<span className="text-blue-500">Code</span>
            </h2>
            <p className="text-sm text-neutral-400 mt-3 max-w-xs">
              A modern blog platform sharing knowledge, ideas, and real-world insights.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3 text-sm">
            <a href="/" className="hover:text-white transition">Home</a>
            <a href="/about" className="hover:text-white transition">About</a>
            <a href="/contact" className="hover:text-white transition">Contact</a>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-3">
              Subscribe to Newsletter
            </h4>
            <p className="text-sm text-neutral-400 mb-4">
              Get latest posts directly to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="flex-1 px-3 py-2 rounded-md bg-neutral-800 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 rounded-md text-sm transition
                  ${loading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"}
                `}
              >
                {loading ? "..." : "Subscribe"}
              </button>
            </form>

            {/* Message */}
            {message && (
              <p className="mt-3 text-sm text-green-400">
                {message}
              </p>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-800 my-10" />

        {/* Bottom */}
        <div className="text-center text-sm text-neutral-400">
          © {new Date().getFullYear()} RamCode. All rights reserved.
        </div>
      </div>

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className="absolute right-6 bottom-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
        aria-label="Scroll to top"
      >
        ↑
      </button>
    </footer>
  );
}

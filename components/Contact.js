"use client";
import { useState } from "react";

export default function Contact() {
  const [inputs, setInputs] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    setInputs((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputs),
    });

    const data = await res.json();

    setMessage(data.message);
    setInputs({});
    setLoading(false);

    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl transition-all">
        
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Contact Us
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Name */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              name="name"
              onChange={handleInput}
              value={inputs.name ?? ""}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Your name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={handleInput}
              value={inputs.email ?? ""}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="you@example.com"
              required
            />
          </div>

          {/* Message */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Message
            </label>
            <textarea
              name="message"
              rows="4"
              onChange={handleInput}
              value={inputs.message ?? ""}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Type your message"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Description (optional)
            </label>
            <textarea
              name="description"
              rows="3"
              onChange={handleInput}
              value={inputs.description ?? ""}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Additional details"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition-all
              ${loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"}
            `}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {/* Success Message */}
        {message && (
          <p className="mt-5 text-center text-green-600 font-medium animate-pulse">
            {message}
          </p>
        )}
      </div>
    </main>
  );
}

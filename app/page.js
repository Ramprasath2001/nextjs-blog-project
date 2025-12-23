"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [searching, setSearching] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "/posts")
      .then((res) => res.json())
      .then(setPosts)
      .catch(() => setPosts([]));
  }, []);

  const searchPost = (e) => {
    if (e?.type === "keydown" && e.key !== "Enter") return;

    const value = inputRef.current?.value || "";
    setQuery(value);
    setSearching(true);

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts?q=${encodeURIComponent(value)}`
    )
      .then((res) => res.json())
      .then(setPosts)
      .finally(() => setSearching(false));
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-r from-gray-100 to-gray-200 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
            Welcome to Our Blog
          </h1>
          <p className="text-gray-600 mb-8">
            Discover the latest articles, insights, and stories.
          </p>

          <div className="flex justify-center gap-2 max-w-lg mx-auto">
            <input
              ref={inputRef}
              onKeyDown={searchPost}
              disabled={searching}
              placeholder="Search articles..."
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 transition"
            />
            <button
              onClick={searchPost}
              disabled={searching}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {searching ? "..." : "Search"}
            </button>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="container mx-auto px-4 py-12">
        {searching ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-72 bg-gray-200 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link key={post._id} href={`/post/${post._id}`}>
                <article className="bg-white rounded-xl shadow hover:shadow-xl transition transform hover:-translate-y-1 cursor-pointer overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover hover:scale-105 transition duration-300"
                  />
                  <div className="p-5">
                    <h3 className="text-lg font-semibold mb-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {post.short_description}
                    </p>
                    <span className="inline-block mt-4 text-blue-600 font-medium">
                      Read more →
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}

        {!posts.length && query && !searching && (
          <p className="text-center mt-10 text-gray-500">
            No posts found for <b>{query}</b>
          </p>
        )}
      </section>
    </>
  );
}

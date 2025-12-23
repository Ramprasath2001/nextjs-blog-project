"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Post({ params }) {
  const id = params.id;

  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [zoom, setZoom] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "/post/" + id)
      .then((res) => res.json())
      .then((res) => {
        setPost(res);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "/posts")
      .then((res) => res.json())
      .then((res) => {
        const filtered = res.filter((p) => p._id !== id).slice(0, 3);
        setRelated(filtered);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-2/3 mb-4" />
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-6" />
        <div className="h-56 bg-gray-200 rounded-xl mb-8" />
      </div>
    );
  }

  const readingTime = Math.ceil(
    post.description.split(" ").length / 200
  );

  return (
    <main className="bg-gray-50 min-h-screen">
      <article className="container mx-auto px-4 py-12">

        {/* Title */}
        <div className="max-w-3xl mx-auto mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {post.title}
          </h1>
          <p className="text-sm text-gray-500">
            {post.created_at_formatted} • {readingTime} min read
          </p>
        </div>

        {/* Image */}
        <figure className="max-w-4xl mx-auto mb-10">
          <div
            className="relative cursor-zoom-in bg-gray-100 rounded-2xl"
            onClick={() => setZoom(true)}
          >
            <img
              src={post.image}
              alt={post.title}
              onLoad={() => setImgLoaded(true)}
              className={`
                w-full h-auto max-h-[60vh] object-contain
                rounded-2xl shadow-md transition duration-700
                ${imgLoaded ? "blur-0" : "blur-md scale-105"}
              `}
            />
          </div>
          <figcaption className="text-sm text-gray-500 text-center mt-3">
            {post.image_caption || "Image for visual reference"}
          </figcaption>
        </figure>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-10 max-w-3xl mx-auto">
          <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
            {post.description}
          </p>
        </div>

        {/* Related Posts */}
        {related.length > 0 && (
          <section className="max-w-5xl mx-auto mt-16">
            <h3 className="text-2xl font-bold mb-6">
              Related Posts
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((item) => (
                <Link key={item._id} href={`/post/${item._id}`}>
                  <article className="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-40 w-full object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold mb-2 line-clamp-2">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {item.short_description}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>

      {/* Zoom Modal */}
      {zoom && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setZoom(false)}
        >
          <img
            src={post.image}
            alt={post.title}
            className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl"
          />
        </div>
      )}
    </main>
  );
}

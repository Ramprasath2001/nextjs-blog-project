export const metadata = {
  title: "About Us",
  description: "Learn more about JVLCode and our mission",
};

export default function About() {
  return (
    <main className="bg-gray-50">
      {/* Hero */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          About <span className="text-blue-600">RamCode.</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          A free platform focused on learning coding, building real-world
          projects, and growing as a developer.
        </p>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-3">

          {/* Card 1 */}
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">
              Learn by Doing
            </h3>
            <p className="text-gray-600 text-sm">
              We focus on hands-on learning with practical examples and
              real-world projects.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">
              Beginner Friendly
            </h3>
            <p className="text-gray-600 text-sm">
              Simple explanations, clear structure, and step-by-step guidance
              for all learners.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">
              Build Real Projects
            </h3>
            <p className="text-gray-600 text-sm">
              Learn modern tools by building blogs, dashboards, APIs, and full
              stack apps.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-700 mb-6 text-lg">
            Start learning today and turn your ideas into real applications.
          </p>
          <a
            href="/"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Explore the Blog →
          </a>
        </div>
      </section>
    </main>
  );
}

import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Logo / Title */}
        <Link href="/" className="group">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Blog<span className="text-blue-600">One</span>
          </h1>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8 text-sm font-medium">
          <Link
            href="/"
            className="relative text-gray-700 hover:text-blue-600 transition
              after:absolute after:left-0 after:-bottom-1 after:h-[2px]
              after:w-0 after:bg-blue-600 after:transition-all
              hover:after:w-full"
          >
            Home
          </Link>

          <Link
            href="/about"
            className="relative text-gray-700 hover:text-blue-600 transition
              after:absolute after:left-0 after:-bottom-1 after:h-[2px]
              after:w-0 after:bg-blue-600 after:transition-all
              hover:after:w-full"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="relative text-gray-700 hover:text-blue-600 transition
              after:absolute after:left-0 after:-bottom-1 after:h-[2px]
              after:w-0 after:bg-blue-600 after:transition-all
              hover:after:w-full"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}

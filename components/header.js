import Link from 'next/link'

export default function Header() {
  return (
    <header className="site-container py-6 dark:text-white">
      <nav className="space-x-4 dark:text-gray-400">
        <Link href="/">
          <a>About</a>
        </Link>
        <Link href="/blog">
          <a>Blog</a>
        </Link>
        <Link href="/contact">
          <a>Contact</a>
        </Link>
      </nav>
    </header>
  )
}

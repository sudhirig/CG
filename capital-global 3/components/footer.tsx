import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-lg font-bold">Capital Global</span>
          </Link>
          <p className="text-center text-sm leading-loose md:text-left">
            &copy; 2023 Capital Global. All rights reserved.
          </p>
        </div>
        <nav className="flex items-center space-x-4 text-sm">
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </footer>
  )
}


import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { generateObjectId } from "@/lib/utils";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100 dark:bg-gray-900">
      <header className="w-full max-w-4xl mx-auto flex justify-between items-center py-4">
        <Image
          src="/logo.png"
          alt="App Logo"
          width={50}
          height={50}
          className="dark:invert"
        />
        <nav className="flex gap-4">
          <Link href="/auth/login">
            <Button variant="outline">Login</Button>
          </Link>
          <Link href={`/chat/${generateObjectId()}`}>
            <Button variant="outline">Playground</Button>
          </Link>
        </nav>
      </header>
      <main className="flex flex-col items-center justify-center flex-1 text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to Our App</h1>
        <p className="text-lg mb-8">
          Experience the best AI-powered tools and features.
        </p>
        <div className="flex gap-4">
          <Link href="/auth/login">
            <Button>Get Started</Button>
          </Link>
          <Link href={`/chat/${generateObjectId()}`}>
            <Button variant="outline">Try the Playground</Button>
          </Link>
        </div>
      </main>
      <footer className="w-full max-w-4xl mx-auto flex justify-between items-center py-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          &copy; Our App. All rights reserved.
        </p>
        <nav className="flex gap-4">
          {/* <Link href="/privacy">
            <a className="text-sm text-gray-600 dark:text-gray-400 hover:underline">Privacy Policy</a>
          </Link>
          <Link href="/terms">
            <a className="text-sm text-gray-600 dark:text-gray-400 hover:underline">Terms of Service</a>
          </Link> */}
        </nav>
      </footer>
    </div>
  );
}

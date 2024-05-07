import Link from 'next/link';


export default function NotFound() {
    return (
        <div className="container flex-grow pt-20 pb-44 flex justify-center items-center">
            <main className="flex gap-8">
                <h1 className="text-8xl font-medium text-secondary">404</h1>
                <div className="pt-1.5">
                    <h2 className="text-secondary text-2xl font-semibold uppercase mb-1.5">Page not found.</h2>
                    <p>Return to <Link href="/" className="text-theme-blue hover:underline">home</Link>?</p>
                </div>
            </main>
        </div>
    )
}

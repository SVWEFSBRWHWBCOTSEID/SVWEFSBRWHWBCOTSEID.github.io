import Link from 'next/link';

export default function Header() {
    return (
        <header className="px-8 py-4 text-lg flex gap-4 items-center">
            <Link href="/" className="text-xl">[game website]</Link>
            <Link href="/offline" className="uppercase">Offline</Link>
            <Link href="/rules" className="uppercase">Rules</Link>
        </header>
    )
}

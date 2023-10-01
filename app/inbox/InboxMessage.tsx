import Link from 'next/link';

export default function InboxMessage() {
    return (
        <div className="px-6 py-3 flex gap-4">
            {false ? (
                // TODO
                <img
                    src="/pfp.png"
                    className="w-14 h-14 rounded-full object-cover object-center"
                    alt="qpwoeirut"
                />
            ) : (
                <div className="w-14 h-14 rounded-full flex-none bg-background flex items-center justify-center text-secondary/50 text-3xl font-medium">
                    Q
                </div>
            )}
            <div>
                <h5 className="flex justify-between items-center font-medium mb-1.5">
                    <Link href="/profile/qpwoeirut">qpwoeirut</Link>
                    <span className="text-xs font-normal text-secondary">Today at 12:45 PM</span>
                </h5>
                <p className="text-sm text-primary">
                    A cantilever is a rigid structural element that extends horizontally and is supported at only one end.
                    Typically it extends from a flat vertical surface such as a wall, to which it must be firmly attached.
                    Like other structural elements, a cantilever can be formed as a beam, plate, truss, or slab.
                </p>
            </div>
        </div>
    )
}

export default function Chat() {
    return (
        <div className="flex-none text-sm rounded flex flex-col overflow-clip shadow-lg">
            <div className="px-3 py-2 bg-content h-[30rem] x flex-col gap-2">
                <ChatMessage username="lol" text="lmao" />
                <ChatMessage username="lol" text="lmao" />
                <ChatMessage username="lol" text="lmao" />
                <ChatMessage username="lol" text="lmao" />
            </div>
            <input
                placeholder="pls be nice in chat :pleading:"
                className="px-2 py-1 bg-content border-t border-tertiary focus:outline-none focus:border-blue-500 placeholder:text-secondary"
            />
        </div>
    )
}

function ChatMessage(props: {username: string, text: string}) {
    return (
        <div className="flex gap-2">
            <strong className="font-medium text-secondary">{props.username}:</strong>
            {props.text}
        </div>
    )
}

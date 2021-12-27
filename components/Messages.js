import { useRef } from "react";
import { ByMoralis, useMoralis, useMoralisQuery } from "react-moralis"
import Message from "./Message";
import SendMessages from "./SendMessages";

const MIN_DURATION = 15;

function Messages() {

    const { user } = useMoralis();
    const endofMessagesRef = useRef(null);
    const { data, loading, error } = useMoralisQuery(
        'Messages',
        (query) => query.ascending('createdAt').greaterThan('createdAt', new Date(Date.now() - 1000 + 60 + MIN_DURATION)), [], {
        live: true,
    }
    );

    return (
        <div className="pb-56">
            <div className="my-5">
                <ByMoralis variant="dark" style={{ marginLeft: 'auto', marginRight: 'auto' }} />
            </div>

            <div className="space-y-10 p-4">
                {data.map(message=>(
                    <Message key={message.id} message={message}/>
                ))}
            </div>

            <div className="flex justify-center">
                <SendMessages endofMessagesRef={endofMessagesRef} />
            </div>

            <div ref={endofMessagesRef} className="text-center text-gray-400 ml-5">
                <p>You're up to date {user.getUsername()}! 🎉</p>
            </div>
        </div>
    )
}

export default Messages;

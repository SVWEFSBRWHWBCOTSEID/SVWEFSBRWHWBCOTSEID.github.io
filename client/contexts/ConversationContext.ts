import { createContext, Dispatch, SetStateAction } from 'react';
import type { Conversation } from '../app/inbox/InboxSidebarItem';


type ConversationContext = {
    conversations: Conversation[],
    setConversations: Dispatch<SetStateAction<Conversation[]>>
};
const ConversationContext = createContext<ConversationContext>({
    conversations: [],
    setConversations: () => {}
});
export default ConversationContext;

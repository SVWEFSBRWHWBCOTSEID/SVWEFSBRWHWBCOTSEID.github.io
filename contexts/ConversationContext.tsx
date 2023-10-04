import {createContext} from 'react';
import type {Conversation} from '../app/inbox/InboxSidebarItem';


type ConversationContext = {
    conversations: Conversation[],
    setConversations: (user: Conversation[]) => void
};
const ConversationContext = createContext<ConversationContext>({
    conversations: [],
    setConversations: () => {}
});
export default ConversationContext;

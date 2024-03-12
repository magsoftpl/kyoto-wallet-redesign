import { ChatSvg } from '@/components/icons/ChatSvg'

export const ChatLink = () => (
  <a href="#" className="rounded-md bg-primary p-2" title="Ask away" target="_blank" rel="noopener">
    <div className="text-white w-5 h-5 flex items-center">
      <ChatSvg />
    </div>
  </a>
)

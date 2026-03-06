import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Message } from '@/types/chat';
import { CopyIcon } from '@/assets/svg';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';


interface MessageBubbleProps {
    message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
    const isUser = message.role === 'user';
    const [isCopied, copy] = useCopyToClipboard();

    const handleCopy = () => copy(message.content);


    return (
        <div className={`flex items-end gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
            <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
          ${isUser
                        ? 'bg-gradient-to-br from-violet-500 to-purple-600 text-white'
                        : 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white'
                    }`}
            >
                {isUser ? 'You' : 'AI'}
            </div>

            <div
                className={`relative group max-w-[85%] sm:max-w-[70%] px-4 py-3 rounded-2xl text-sm leading-relaxed
          ${isUser
                        ? 'bg-gradient-to-br from-violet-600 to-purple-700 text-white rounded-br-sm shadow-lg shadow-violet-900/10'
                        : 'bg-gray-800 text-gray-100 border border-gray-700 rounded-bl-sm shadow-sm'
                    }`}
            >

                <div className="prose prose-sm prose-invert max-w-none break-words overflow-x-auto">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {message.content}
                    </ReactMarkdown>
                </div>
                {!isUser && (
                    <button
                        onClick={handleCopy}
                        className={`absolute top-2 right-2 p-1.5 rounded-lg bg-gray-700/50 hover:bg-gray-600/80
              transition-all duration-200 text-[10px] font-medium opacity-0 group-hover:opacity-100 border border-gray-600/50
              ${isCopied ? 'text-emerald-400 border-emerald-500/30' : 'text-gray-400 hover:text-white'}`}
                        title="Copy message"
                    >
                        {isCopied ? '✓ Copied' : (
                            <CopyIcon />
                        )}
                    </button>
                )}
            </div>
        </div>
    );
}

import { Loader2 } from "lucide-react";

function ChatLoader() {
  return (
    <div className="h-screen flex flex-col items-center justify-center p-4 bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Spinning loader with linear ring */}
        <div className="relative mb-8">
          <div className="absolute inset-0 rounded-full bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-20 blur-xl animate-pulse"></div>
          <div className="relative bg-white rounded-full p-6 shadow-2xl">
            <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" strokeWidth={2.5} />
          </div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-indigo-500 animate-spin" style={{animationDuration: '1.5s'}}></div>
        </div>

        {/* Text */}
        <h3 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent mb-2">
          Connecting to chat
        </h3>
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
    </div>
  );
}

export default ChatLoader;
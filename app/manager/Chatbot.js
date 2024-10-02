export default function Chatbot() {
    return (
      <div className="flex flex-col justify-center items-center h-full p-4">
        <div className="bg-white w-full h-[80%] shadow-lg rounded-lg">
          {/* Placeholder for the chatbot UI */}
          <div className="p-4">Chatbot Placeholder</div>
        </div>
        <input 
          type="text" 
          className="mt-4 w-full p-2 rounded-lg border"
          placeholder="Type your message..."
        />
      </div>
    );
  }
  
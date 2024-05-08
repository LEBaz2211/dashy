export default function ConversationList() {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-bold mb-2">Today</h3>
      <ul className="space-y-2">
        <li className="text-gray-600">Conversation Name</li>
        <li className="text-gray-600">Conversation Name</li>
      </ul>
      <h3 className="text-lg font-bold mt-4 mb-2">Yesterday</h3>
      <ul className="space-y-2">
        <li className="text-gray-600">Conversation Name</li>
        <li className="text-gray-600">Conversation Name</li>
      </ul>
      <h3 className="text-lg font-bold mt-4 mb-2">Previous 7 Days</h3>
      <ul className="space-y-2">
        <li className="text-gray-600">Conversation Name</li>
        <li className="text-gray-600">Conversation Name</li>
      </ul>
    </div>
  );
}

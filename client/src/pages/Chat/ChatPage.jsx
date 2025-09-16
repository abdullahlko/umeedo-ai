import Sidebar from "../../components/Sidebar/Sidebar";
import Main from "../../components/ChatWindow/ChatWindow";
import "./ChatPage.css";
export default function ChatPage() {
  return (
    <div className="chat-layout">
      <Sidebar />
      <Main />
    </div>
  );
}

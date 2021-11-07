import { useState } from "react";
import ChatPanel from "../components/ChatPanel";
import SidePanel from "../components/SidePanel";
import { MainContext } from "../MainContext";

const Chat = () => {
  const [value, setValue] = useState(MainContext);

  return (
    <MainContext.Provider value={{ value, setValue }}>
      <div className="grid grid-cols-3 h-screen">
        <div className="border-r-4 border-[#D1D5DB] relative">
          <SidePanel />
        </div>
        <div className="col-span-2 relative">
          <ChatPanel />
        </div>
      </div>
    </MainContext.Provider>
  );
};

export default Chat;

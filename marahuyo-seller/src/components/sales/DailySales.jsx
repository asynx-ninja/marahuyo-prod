import SmallSidebar from "../global/SmallSidebar"
import LargeSidebar from "../global/LargeSidebar"
import DailySalesContent from "../salescomponent/DailySalesContent";
import Header from "../global/Header"
import { useState } from "react";

const DailySales = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [largeSidebar, setlargeSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  //large screen sidebar
  const large = () => {
    setlargeSidebar(!largeSidebar);
  };

  return (
    <div className="flex h-screen ">
    <LargeSidebar showSidebar={showSidebar} largeSidebar={largeSidebar} />

    {/* //*nabar */}
    <div className="flex-1">
      <Header
        showSidebar={showSidebar}
        toggleSidebar={toggleSidebar}
        large={large}
      />
      {/* sidebar small */}
      <SmallSidebar />

      {/* INSERT CODE */}
      <DailySalesContent />
    </div>
  </div>
  )
}

export default DailySales
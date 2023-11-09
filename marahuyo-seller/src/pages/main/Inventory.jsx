import { useState } from "react";
import LargeSidebar from "../../components/global/LargeSidebar";
import Header from "../../components/global/Header";
import SmallSidebar from "../../components/global/SmallSidebar";
import InventoryContent from "../../components/main/InventoryContent";

const Inventory = () => {
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
      <InventoryContent />
    </div>
  </div>
  )
}

export default Inventory
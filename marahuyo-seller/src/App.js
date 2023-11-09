import { RouterProvider } from "react-router-dom";
import Route from "./routers/Route";

function App() {
  return (
    <>
      <RouterProvider router={Route} />
    </>
  );
}

export default App;
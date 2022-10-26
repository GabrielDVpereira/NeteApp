import { ToastContainer } from "react-toastify";
import { AppRoutes } from "_/routes";

function App() {
  return (
    <>
      <AppRoutes />
      <ToastContainer theme="colored" />
    </>
  );
}

export default App;

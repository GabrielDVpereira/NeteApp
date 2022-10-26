import { ToastContainer } from "react-toastify";
import { AppRoutes } from "_/routes";
import { AuthContextProvider } from "./contexts";
import { AlertHelper } from "./helpers/alert";
import { AuthService } from "./services";

function App() {
  const alertHelper = new AlertHelper()
  const authService = new AuthService(alertHelper)

  return (
    <AuthContextProvider authService={authService}>
      <AppRoutes />
      <ToastContainer theme="colored" />
    </AuthContextProvider>
  );
}

export default App;

import { ToastContainer } from "react-toastify";
import { AppRoutes } from "_/routes";
import { AuthContextProvider, BookingContextProvider } from "./contexts";
import { AlertHelper } from "./helpers/alert";
import { AuthService } from "./services";

function App() {
  const alertHelper = new AlertHelper()
  const authService = new AuthService(alertHelper)

  return (
    <AuthContextProvider authService={authService}>
      <BookingContextProvider>
        <AppRoutes />
        <ToastContainer theme="colored" />
      </BookingContextProvider>
    </AuthContextProvider>
  );
}

export default App;

import { ToastContainer } from "react-toastify";
import { AppRoutes } from "_/routes";
import { AuthContextProvider, BookingContextProvider } from "./contexts";
import { AlertHelper } from "./helpers/alert";
import { FirebaseDatabaseRepository } from "./repositories";
import { AuthService, BookingService } from "./services";

function App() {

  const alertHelper = new AlertHelper()
  const authService = new AuthService(alertHelper)

  const bookinRepository = new FirebaseDatabaseRepository('booking')
  const bookingService = new BookingService(bookinRepository, alertHelper)

  return (
    <AuthContextProvider authService={authService}>
      <BookingContextProvider bookingService={bookingService}>
        <AppRoutes />
        <ToastContainer theme="colored" />
      </BookingContextProvider>
    </AuthContextProvider>
  );
}

export default App;

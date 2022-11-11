import { ToastContainer } from "react-toastify";
import { AppRoutes } from "_/routes";
import { AuthContextProvider, BookingContextProvider, CheckinContextProvider } from "./contexts";
import { AlertHelper } from "./helpers/alert";
import { FirebaseDatabaseRepository } from "./repositories";
import { AuthService, BookingService, CheckinService, UserService } from "./services";

function App() {

  const alertHelper = new AlertHelper()

  const userRepository = new FirebaseDatabaseRepository('user')
  const userService = new UserService(userRepository, alertHelper)

  const authService = new AuthService(alertHelper, userService)

  const bookingRepository = new FirebaseDatabaseRepository('booking')
  const bookingService = new BookingService(bookingRepository, alertHelper)

  const checkinRepository = new FirebaseDatabaseRepository('checkin')
  const checkinService = new CheckinService(checkinRepository, alertHelper)


  return (
    <AuthContextProvider authService={authService}>
      <BookingContextProvider bookingService={bookingService}>
        <CheckinContextProvider  checkinService={checkinService}>
          <AppRoutes />
          <ToastContainer theme="colored" />
        </CheckinContextProvider>
      </BookingContextProvider>
    </AuthContextProvider>
  );
}

export default App;

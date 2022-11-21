
import  AppRouter  from "./router/AppRouter";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import store from "./app/store";
import { Provider } from "react-redux";


function App() {
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <AppRouter />
        </Provider>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;

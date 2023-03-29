import { Route, Routes } from "react-router-dom";
import LayoutHome from "./layouts/LayoutHome";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/home/Home";
import SignInPage from "./pages/login/SignIn";
import SignUpPage from "./pages/login/SignUp";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LayoutHome />}>
        <Route index element={<HomePage />} />
      </Route>
      <Route path="/login">
        <Route path="signIn" element={<SignInPage />} />
        <Route path="signUp" element={<SignUpPage />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;

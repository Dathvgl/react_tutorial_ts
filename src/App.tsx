import { Route, Routes } from "react-router-dom";
import LayoutHome from "./layouts/LayoutHome";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/home/Home";
import SignInPage from "./pages/login/SignIn";
import SignUpPage from "./pages/login/SignUp";
import ZingChartPage from "./pages/zingchart/ZingChart";
import Top100Page from "./pages/top100/Top100";

export const server: string = import.meta.env.VITE_SERVER;

function App() {
  return (
    <Routes>
      <Route path="/" element={<LayoutHome />}>
        <Route index element={<HomePage />} />
        <Route path="/zingChart" element={<ZingChartPage />} />
        <Route path="/top100" element={<Top100Page />} />
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

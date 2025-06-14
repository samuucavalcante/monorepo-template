import { BrowserRouter, Route, Routes as RoutesRouter } from "react-router";
import LoginPage from "./pages/auth/LoginPage";

export default function Routes() {
  return (
    <BrowserRouter>
      <RoutesRouter>
        <Route path="/login" element={<LoginPage />} />
      </RoutesRouter>
    </BrowserRouter>
  );
}

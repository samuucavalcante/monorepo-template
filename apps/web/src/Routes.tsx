import LoginPage from "@/modules/auth/components/LoginPage";
import { BrowserRouter, Route, Routes as RoutesRouter } from "react-router";

export default function Routes() {
  return (
    <BrowserRouter>
      <RoutesRouter>
        <Route path="/login" element={<LoginPage />} />
      </RoutesRouter>
    </BrowserRouter>
  );
}

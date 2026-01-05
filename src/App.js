import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";        // adjust paths
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { isAuthed } from "./lib/auth";

function ProtectedRoute({ children }) {
  if (!isAuthed()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* optional extra pages:
        <Route
          path="/providers"
          element={
            <ProtectedRoute>
              <Providers />
            </ProtectedRoute>
          }
        />
        */}

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

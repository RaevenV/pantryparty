import { Routes, Route } from "react-router-dom";
import { Home } from "./Home";
import { FoodDetails } from "./FoodDetails";
import Cooking from "./Cooking";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "@/lib/protectedRoute";
import Profile from "./Profile";

function App() {
  return (
    <div className="relative bg-slate-800 min-h-screen flex justify-center items-center">
      <div className="relative mobile-view w-full max-w-[505px] min-h-screen overflow-y-auto overflow-x-hidden scroll-smooth">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/foodDetails"
            element={
              <ProtectedRoute>
                <FoodDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cooking"
            element={
              <ProtectedRoute>
                <Cooking />
              </ProtectedRoute>
            }
          />

          {/* Fallback Route for Unmatched Paths */}
          <Route path="*" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

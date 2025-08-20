import { Routes, Route } from "react-router-dom";

// Import your new layout and route components
import MainLayout from "./components/mainLayout";
import ProtectedRoute from "./components/ProtectedRoute";

// Import your page components
import Home from "./pages/Home";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/SignUp";

// Dummy components for other pages until you build them
const Search = () => (
  <h1 style={{ color: "white", marginLeft: "260px" }}>Search Page</h1>
);
const Library = () => (
  <h1 style={{ color: "white", marginLeft: "260px" }}>Library Page</h1>
);

function App() {
  return (
    <Routes>
      {/* --- Public Routes --- */}
      {/* These routes are accessible to everyone, even if not logged in. */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* --- Protected Routes --- */}
      {/* The user must be authenticated to see these pages. */}
      {/* If not, they will be redirected to "/login". */}
      <Route element={<ProtectedRoute />}>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/search"
          element={
            <MainLayout>
              <Search />
            </MainLayout>
          }
        />
        <Route
          path="/library"
          element={
            <MainLayout>
              <Library />
            </MainLayout>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Home from "./pages/Home.jsx";
import Login from "./components/Auth/Login.jsx";
import Signup from "./components/Auth/Signup.jsx";
import Library from "./pages/Library.jsx";
import Premium from "./pages/Premium.jsx";
import ArtistPage from "./pages/ArtistPage.jsx";
import AlbumPage from "./pages/AlbumPage.jsx";
import ChartsPage from "./pages/ChartsPage.jsx";
import AccountPage from "./pages/AccountPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<ProtectedRoute />}>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        {/* <Route
          path="/search"
          element={
            <MainLayout>
              <Search />
            </MainLayout>
          }
        /> */}
        <Route
          path="/charts"
          element={
            <MainLayout>
              <ChartsPage />
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
        <Route
          path="/premium"
          element={
            <MainLayout>
              <Premium />
            </MainLayout>
          }
        />
        <Route
          path="/account"
          element={
            <MainLayout>
              <AccountPage />
            </MainLayout>
          }
        />
        <Route
          path="/artist/:artistId"
          element={
            <MainLayout>
              <ArtistPage />
            </MainLayout>
          }
        />
        <Route
          path="/album/:albumId"
          element={
            <MainLayout>
              <AlbumPage />
            </MainLayout>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;

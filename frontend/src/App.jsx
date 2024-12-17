import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Footer } from "./commonPaths";
import Notfound from "./pages/notfound/notfound";
import Rating from "./pages/detail/rateMovieFunct";
import { Toaster } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import Watching from "./pages/watching/watching";
import Detail from "./pages/detail/detail";
import AdminDashboard from "./pages/home/AdminDashboard";
import Search from "./pages/search/search";
import ProfileEdit from "./pages/profile/Profile";

library.add(fas, fab);

import "./App.css";
import HomeScreenCheck from "./pages/home/HomeScreenCheck";
import Logitech from "./pages/auth/login/logitech";
import { Loader } from "lucide-react";
import { useAuth } from "./Context/authContext";
import DetailMain from "./pages/detail/DetailMain";

function App() {
  const { user, isCheckingAuth, authCheck } = useAuth();

  useEffect(() => {
    authCheck(); // Check authentication state on load
  }, []);

  if (isCheckingAuth) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <div>
          <Loader className="animate-spin text-red-600 size-10"></Loader>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* App Content */}
      <Routes>
        {/* Always Render HomeScreenCheck */}
        <Route path="/" element={<HomeScreenCheck />} />

        {/* Conditional Routes */}
        <Route
          path="/admin"
          element={
            user?.role === "admin" ? <AdminDashboard /> : <Navigate to="/" />
          }
        />
        <Route
          path="/login"
          element={!user ? <Logitech /> : <Navigate to="/" />}
        />
        <Route
          path="/watching/:id/:type"
          element={ <Watching />}
        />
        <Route
          path="/movie/:id/rate"
          element={ <Rating /> }
        />
        <Route
          path="/detail/:id"
          element={ <DetailMain /> }
        />
        <Route
          path="/search"
          element={ <Search /> }
        />
        <Route
          path="/edit-profile"
          element={ <ProfileEdit /> }
        />
        <Route path="*" element={<Notfound />} />
      </Routes>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;

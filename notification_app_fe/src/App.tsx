import { Routes, Route } from "react-router-dom";

import AllNotifications from "./pages/AllNotifications";
import PriorityNotifications from "./pages/PriorityNotifications";
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<AllNotifications />} />
        <Route path="priority" element={<PriorityNotifications />} />
      </Route>
    </Routes>
  );
}

export default App;
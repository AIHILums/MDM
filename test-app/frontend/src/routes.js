import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import PlanAndOrder from './pages/planandorder';
import ProblemAndAssessment from './pages/problemandassessment';



const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/planandorder" element={<PlanAndOrder />} />
        <Route path="/problemandassessment" element={<ProblemAndAssessment />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;



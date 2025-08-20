import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/ThemeProvider';
import Home from '@/pages/Home';
import TaskDetails from '@/pages/TaskDetails';
import Settings from '@/pages/Settings';
import NotFound from '@/pages/NotFound';
import { Blog } from '@/pages/Blog';
import { TaskProvider } from '@/context/TaskContext';

function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/task/:id" element={<TaskDetails />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </TaskProvider>
    </ThemeProvider>
  );
}

export default App;
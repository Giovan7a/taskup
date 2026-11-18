import { BrowserRouter } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import { AppRoutes } from './routes/AppRoutes';
import './styles/dashboard.css';

function App() {
  return (
    <BrowserRouter>
      <TaskProvider>
        <AppRoutes />
      </TaskProvider>
    </BrowserRouter>
  );
}

export default App;

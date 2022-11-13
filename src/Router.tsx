import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import { useUsedProject } from './providers/ProjectProvider';

import { Projects, Requests } from './screens';
import { CreateProject } from './screens/CreateProject';

export default function Router () {
  const project = useUsedProject();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          {project
            ? (
            <Route path="" element={<Requests />} />
              )
            : (
            <Route path="" element={<Projects />} />
              )}
        </Route>
        <Route path="/create" element={<CreateProject />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

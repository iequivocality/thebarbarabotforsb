import { useEffect } from 'react';
import { useErrorBoundary } from "use-error-boundary";
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Main from './components/main/Main';

function App() {
  useEffect(() => {
    // firebase.initializeApp(FirebaseConfig);
    // NotificationService.getInstance().connect();

    return () => {
      
    }
  }, []);

  const { ErrorBoundary } = useErrorBoundary({
    onDidCatch: (error, errorInfo) => {
      console.log("App error", error);
      console.log("App errorInfo", errorInfo);
    }
  })
  
  return (
    <div className="App">
      <ErrorBoundary>
        <Router>
          <Main></Main>
        </Router>
      </ErrorBoundary>
    </div>
  );
}

export default App;

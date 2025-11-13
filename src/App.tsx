import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import Router from "./pages/router";
import AuthProvider from "./providers/AuthProvider";
import AppProvider from "./contexts/AppContext";
import ErrorBoundary from "./components/ErrorBoundary";
import { Toaster } from "./components/ui/toaster";
import { queryClient } from "./lib/react-query";

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <AuthProvider>
            <BrowserRouter>
              <Router />
            </BrowserRouter>
          </AuthProvider>
        </AppProvider>
        <Toaster />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;

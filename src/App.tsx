// src/App.tsx
import { AccountContextProvider } from "./Components/LoginSignUpPage/AccountContext";
import { Amplify } from 'aws-amplify';
import outputs from './amplify_outputs.json';
import Login from "./Components/LoginSignUpPage/Login";

Amplify.configure(outputs);

const App: React.FC = () => {
  return (
        <AccountContextProvider>
            <Login />
        </AccountContextProvider>
  );
};


export default App;

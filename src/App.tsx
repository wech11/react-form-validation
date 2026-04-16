import { useState } from "react";
import Product from "./components/ui/Product";
// import Login from "./components/ui/Login";
import LoginUsingZod from "./components/ui/LoginZod";
import RegisterForm from "./components/ui/RegisterForm";

function App() {
  const [session, setSession] = useState<string | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <main className="flex flex-col items-center w-full min-h-screen gap-4 px-10">
      {session ? (
        <Product setSession={setSession} />
      ) : isRegistering ? (
        <LoginUsingZod setSession={setSession} setIsRegistering={setIsRegistering} />
      ) : (
        <RegisterForm setIsRegistering={setIsRegistering} />
      )}
    </main>
  );
}

export default App;

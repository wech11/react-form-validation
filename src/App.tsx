import { useState } from "react";
import Product from "./components/ui/Product";
// import Login from "./components/ui/Login";
import LoginUsingZod from "./components/ui/LoginZod";

function App() {
  const [session, setSession] = useState<boolean>(false);
  return (
    <main className="flex flex-col items-center w-full min-h-screen gap-4 px-10">
      {session ? (
        <Product setSession={setSession} />
      ) : (
        <LoginUsingZod />
      )}
    </main>
  );
}

export default App;

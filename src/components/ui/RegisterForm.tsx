import { useMutation } from "@tanstack/react-query";
import { type SubmitHandler } from "react-hook-form";
import * as z from "zod";
import Form from "./Form";

const registerSchema = z.object({
  username: z
    .string("username harus diisi")
    .min(5, "username minimal 5 karakter")
    .regex(
      /^[a-z0-9_]+$/,
      "username hanya boleh mengandung huruf kecil, angka, dan underscore",
    ),
  email: z.string("email harus diisi").email("email tidak valid"),
  password: z
    .string("password harus diisi")
    .min(6, "password minimal 6 karakter"),
});

type RegisterType = z.infer<typeof registerSchema>;

const RegisterForm = ({
  setIsRegistering,
}: {
  setIsRegistering: (isRegistering: boolean) => void;
}) => {
  const registerFields = [
    {
      name: "username",
      label: "Username",
      type: "text",
      placeholder: "insert your username",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "insert your email",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "insert your password",
    },
  ];
  const { mutate, isPending } = useMutation({
    mutationKey: ["register"],
    mutationFn: async (data: RegisterType) => {
      const res = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return res.json();
    },
    onSuccess: (data) => {
      // alert("Registration successful! You can now log in.");
      console.log("Registration successful:", data);
    },
  });

  const onRegister: SubmitHandler<RegisterType> = (data) => {
    mutate(data);
    setIsRegistering(true);
  };

  return (
    <main className="flex flex-col items-center justify-center w-screen min-h-screen gap-4 bg-teal-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-2xl">
        <div className="text-2xl font-semibold text-center text-teal-700">
          <h2>Sign up to your account</h2>
        </div>
        <Form
          schema={registerSchema}
          onSubmit={onRegister}
          fields={registerFields}
          defaultValues={{ username: "", email: "", password: "" }}
          // isLoading={isPending}
        />
        <button
          className="w-full px-4 py-2 font-semibold text-white bg-teal-500 rounded-md hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Signing up..." : "Sign Up"}
        </button>
        <button
          onClick={() => setIsRegistering(true)}
          className="w-full text-sm text-center text-teal-500"
        >
          Already have an account? <span className="hover:underline">Sign in here.</span>
        </button>
      </div>
    </main>
  );
};

export default RegisterForm;

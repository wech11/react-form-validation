import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { type Dispatch, type SetStateAction } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import * as z from "zod";

const loginSchema = z.object({
  username: z
    .string("username harus diisi")
    .min(5, "username minimal 5 karakter")
    .regex(
      /^[a-z0-9_]+$/,
      "username hanya boleh mengandung huruf kecil, angka, dan underscore",
    ),
  password: z
    .string("password harus diisi")
    .min(6, "password minimal 6 karakter"),
  // email: z.string('email harus diisi').email("email tidak valid"),
});

type LoginType = z.infer<typeof loginSchema>;

const LoginUsingZod = ({
  setSession,
  setIsRegistering,
}: {
  setSession: Dispatch<SetStateAction<string | null>>;
  setIsRegistering: Dispatch<SetStateAction<boolean>>;
}) => {
  // const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: LoginType) => {
      const res = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => res.json());
      return res;
    },
    onSuccess: (data) => {
      setSession(data.token);
    },
    onError: () => {
      // setErrorMessage("Login failed. Please check your credentials.");
      alert("Login failed. Username and password does'nt match.");
    },
  });

  const onLogin: SubmitHandler<LoginType> = (data) => {
    mutate(data);
  };

  return (
    <main className="flex flex-col items-center justify-center w-screen min-h-screen gap-4 bg-teal-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-2xl">
        <div className="text-2xl font-semibold text-center text-teal-700">
          <h2>Sign in to your account</h2>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(onLogin)}>
          <div className="space-y-1">
            <label
              className="block mb-2 text-sm font-medium text-gray-600"
              htmlFor="username"
            >
              Username
            </label>
            <input
              {...register("username")}
              type="text"
              className={`bg-gray-50 rounded-md focus:outline-2 focus:border-offset-2 focus:outline-teal-500 w-full p-2.5 mb-0 placeholder:text-stone-300 ${errors.username && " border-2 border-red-500"}`}
              id="username"
              placeholder="insert your username"
              autoComplete="off"
            />
            <span className="text-sm text-red-500">
              {errors.username?.message}
            </span>
          </div>
          <div className="space-y-1">
            <label
              className="block mb-2 text-sm font-medium text-gray-600"
              htmlFor="password"
            >
              Password
            </label>

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    type="password"
                    className={`bg-gray-50 rounded-md focus:outline-2 focus:border-offset-2 focus:outline-teal-500 w-full p-2.5 placeholder:text-stone-300 mb-0 ${errors.password && " border-2 border-red-500"}`}
                    id="password"
                    placeholder="insert your password"
                    autoComplete="off"
                    aria-invalid={errors.password ? "true" : "false"}
                  />
                  <span className="text-sm text-red-500">
                    {errors.password?.message}
                  </span>
                </>
              )}
            />
          </div>
          <button
            className="w-full px-4 py-2 font-semibold text-white bg-teal-500 rounded-md hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Logging in..." : "Sign In"}
          </button>
        </form>
        <button
          onClick={() => setIsRegistering(false)}
          className="w-full text-sm text-center text-teal-500"
        > Don't have an account? <span className="hover:underline">Register here.</span>
        </button>
      </div>
    </main>
  );
};

export default LoginUsingZod;

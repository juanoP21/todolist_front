"use client";
import { useForm } from "react-hook-form";
import { signIn } from "@/apis/users.api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { setCookie } from "nookies"; // Importar nookies para manejar cookies

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await signIn({
        email: data.email,
        password: data.password,
      });

      const token = res.access_token;
      if (token) {
        localStorage.setItem("token", token);
        dispatchEvent(new Event("storage"));
      }

      setCookie(null, "authToken", token, {
        maxAge: 60 * 60 * 24 * 7, // 1 semana
        path: "/",
      });

      if (res.statusCode === 409 || res.statusCode === 500) {
        console.log("error");
      } else {
        router.push("/todo");
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        alert("Invalid credentials");
      }
    }
  });

  return (
    <div className="flex items-center justify-center mt-12">
      <div className="w-full max-w-md">
        <div className="flex justify-center lg:w-auto w-full lg:border-b-0 pl-6 pr-2 border-solid border-b-2 border-gray-300 pb-5 lg:pb-0">
          <div className="w-full flex items-center flex-shrink-0 text-gray-800 mr-16">
            <span className="font-semibold text-xl text-black tracking-tight flex justify-center items-center gap-2">
              {/* <Image src={Logo} className="h-12 w-14" alt="Logo" /> Todo App */}
            </span>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4">
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-normal mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                })}
                placeholder="Email"
                autoComplete="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-normal mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                })}
                placeholder="Password"
                autoComplete="current-password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700"
              >
                Login
              </button>
              <Link
                href="/signUp"
                className="cursor-pointer inline-block align-baseline font-normal text-sm text-blue-500 hover:text-blue-800"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

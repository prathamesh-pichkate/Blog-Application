import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../apis/Authentication";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      console.log("Signed in successfully");
      navigate("/");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || error.message || "Login failed";
      console.error("Login failed:", error);
      alert(errorMessage);
    },
  });

  const onSubmit = (formData) => {
    mutation.mutate(formData);
  };

  return (
    <div className="h-[80vh] flex items-center justify-center border">
      {/* Left Section: Image */}
      <div className="hidden lg:block md:w-1/2 h-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1488751045188-3c55bbf9a3fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D"
          alt="Desk with laptop and accessories"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Section: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="rounded-lg bg-white shadow-lg p-8 md:p-12 w-full max-w-lg">
          <h2 className="text-2xl font-semibold text-orange-600 text-center mb-6">
            Sign In
          </h2>

          <form
            className="flex flex-col gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="text-sm font-semibold text-gray-600"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                aria-label="Email"
                className="border border-gray-300 rounded-md w-full py-2 px-4 focus:ring-1 focus:ring-orange-600 focus:outline-none"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="text-sm font-semibold text-gray-600"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                aria-label="Password"
                className="border border-gray-300 rounded-md w-full py-2 px-4 focus:ring-1 focus:ring-orange-600 focus:outline-none"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-all text-xl font-semibold ${
                mutation.isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? "Signing In..." : "Sign In"}
            </button>

            {/* Sign Up Redirect */}
            <p className="text-center text-sm text-gray-500 mt-4">
              Dont have an account?{" "}
              <Link
                to="/register-user"
                className="text-blue-600 hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

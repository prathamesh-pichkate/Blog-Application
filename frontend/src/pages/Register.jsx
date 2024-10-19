import { useForm } from "react-hook-form";
import { registerUser } from "../apis/Authentication";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation(registerUser, {
    onSuccess: (data) => {
      console.log("User registered:", data);
      queryClient.invalidateQueries("user");
      navigate("/login");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || error.message || "Registration failed";
      console.error("Registration failed:", error);
      alert(errorMessage);
    },
  });

  const onSubmit = (formData) => {
    const { imageUrl, ...otherData } = formData;
    const formDataToSend = new FormData();

    if (imageUrl && imageUrl.length > 0) {
      formDataToSend.append("imageUrl", imageUrl[0]);
    }

    Object.keys(otherData).forEach((key) => {
      formDataToSend.append(key, otherData[key]);
    });

    mutation.mutate(formDataToSend);
  };

  return (
    <div className="h-[85vh] flex flex-wrap items-center border border-gray-300">
      {/* Left Section: Image */}
      <div className="hidden lg:block md:w-1/2 h-[85vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1488751045188-3c55bbf9a3fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D"
          alt="Desk with laptop and accessories"
          className="w-full h-full object-fit"
        />
      </div>

      {/* Right Section: Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="rounded-lg p-8 md:p-12 w-full max-w-lg">
          <h2 className="text-2xl font-semibold text-orange-600 text-center mb-6">
            Create an Account
          </h2>

          <form
            className="flex flex-col gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* First Name & Last Name */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <label
                  htmlFor="firstName"
                  className="text-sm font-medium text-gray-600"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  className="border border-gray-300 rounded-md w-full py-1 px-4 focus:ring-1 focus:ring-orange-600 focus:outline-none"
                  {...register("firstname", {
                    required: "First Name is required",
                  })}
                />
                {errors.firstname && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstname.message}
                  </p>
                )}
              </div>

              <div className="flex-1">
                <label
                  htmlFor="lastName"
                  className="text-sm font-medium text-gray-600"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  className="border border-gray-300 rounded-md w-full py-1 px-4 focus:ring-1 focus:ring-orange-600 focus:outline-none"
                  {...register("lastname", {
                    required: "Last Name is required",
                  })}
                />
                {errors.lastname && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.lastname.message}
                  </p>
                )}
              </div>
            </div>

            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="text-sm font-semibold text-gray-600"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Choose a username"
                className="border border-gray-300 rounded-md w-full py-1 px-4 focus:ring-1 focus:ring-orange-600 focus:outline-none"
                {...register("username", { required: "Username is required" })}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

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
                className="border border-gray-300 rounded-md w-full py-1 px-4 focus:ring-1 focus:ring-orange-600 focus:outline-none"
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
                placeholder="Create a password"
                className="border border-gray-300 rounded-md w-full py-1 px-4 focus:ring-1 focus:ring-orange-600 focus:outline-none"
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

            {/* Image Upload */}
            <div>
              <label
                htmlFor="imageUrl"
                className="text-sm font-semibold text-gray-600"
              >
                Upload Profile Image (Optional)
              </label>
              <input
                id="imageUrl"
                type="file"
                className="border border-gray-300 rounded-lg w-full py-2 px-4 focus:outline-none"
                {...register("imageUrl")}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-all text-xl font-semibold"
            >
              Create Account
            </button>

            {/* Sign In Redirect */}
            <p className="text-center text-sm text-gray-500 mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

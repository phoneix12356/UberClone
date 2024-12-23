import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";

const SignUp = () => {
  const userSchema = z.object({
    firstName: z.string().min(1, "These field is required"),
    lastName: z.string().min(1, "These field is required"),
    email: z.string().email("Invalid Email"),
    password: z
      .string()
      .min(8, "aleast 8 character are required")
      .refine(
        (password) => {
          const pattern = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
          if (pattern.test(password)) return true;
          return false;
        },
        {
          message: "Password must contain at least one letter and one digit",
        }
      ),
  });

  type FormValues = z.infer<typeof userSchema>;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["post"],
    queryFn: () => {
      return axios.get("https://fakestoreapi.com/products");
    },
  });

  console.log(data?.data);

  const form = useForm<FormValues>({
    resolver: zodResolver(userSchema),
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const HandleSubmit = (data: FormValues) => {
    console.log(data);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;

  return (
    <>
      <form
        onSubmit={handleSubmit(HandleSubmit)}
        className="max-w-lg mx-auto p-6 bg-gradient-to-r from-blue-50 via-white to-blue-50 rounded-lg shadow-lg"
        noValidate
      >
        <h2 className="text-xl font-bold text-gray-800 text-center mb-6">
          Create Your Account
        </h2>
        <div className="space-y-4">
          {/* First Name */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              placeholder="Enter your first name"
              {...register("firstName")}
              className="block w-full p-3 mt-1 text-sm text-gray-700 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              placeholder="Enter your last name"
              {...register("lastName")}
              className="block w-full p-3 mt-1 text-sm text-gray-700 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Email@gmail.com"
              {...register("email")}
              className="block w-full p-3 mt-1 text-sm text-gray-700 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
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
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              className="block w-full p-3 mt-1 text-sm text-gray-700 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 mt-6 text-white text-lg font-medium bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Create Account
        </button>
      </form>

      <DevTool control={control} />
    </>
  );
};

export default SignUp;

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DevTool } from "@hookform/devtools";

const userLoginSchema = z.object({
  email: z.string().min(1, "This field is required").email("Invalid Email"),
  password: z.string().min(1, "This field is required"),
});

const Login = () => {
  type formValues = z.infer<typeof userLoginSchema>;
  const form = useForm<formValues>({
    resolver: zodResolver(userLoginSchema),
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;
  const onSubmit = (data: formValues) => {
    console.log(data);
  };
  return (
    <>
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            What's your email
          </label>
          <input
            type="text"
            {...register("email")}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Enter Password
          </label>
          <input
            type="password"
            {...register("password")}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>
      </form>
      <DevTool control={control} />
    </>
  );
};

export default Login;

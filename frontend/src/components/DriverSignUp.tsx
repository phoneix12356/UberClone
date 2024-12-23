import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";

const DriverSchema = z.object({
  firstName: z.string().min(1, "These field is Required"),
  lastName: z.string().min(1, "These field is Required"),
  email: z.string().email("Invalid Email"),
  vehicleColor: z.string().min(1, "These is required"),
  vehiclePlate: z
    .string()
    .min(1, "These field is required")
    .refine(
      (number) => {
        const pattern = /^[A-Z]{2}-\d{2}-[A-Z]{1,2}-\d{4}$/;
        return pattern.test(number);
      },
      {
        message: "Invalid Vehicle Number",
      }
    ),
  vehicleCapacity: z.number().min(1, "This Vehicle is not valid"),
  VehicleType: z.enum(["Auto", "Car", "Moto"]),
});

const DriverSignUp = () => {
  type formValues = z.infer<typeof DriverSchema>;
  const form = useForm<formValues>({
    resolver: zodResolver(DriverSchema),
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const formFields = [
    {
      title: "What's our Captain's name",
      fields: [
        {
          name: "firstName",
          type: "text",
          placeholder: "First Name",
        },
        { name: "lastName", type: "text", placeholder: "Last Name" },
      ],
    },
    {
      title: "What's our Captain's email",
      fields: [
        {
          name: "email",
          type: "text",
          placeholder: "Email",
        },
      ],
    },
    {
      title: "Vehicle Information",
      fields: [
        {
          name: "vehicleColor",
          type: "text",
          placeholder: "Vehicle Color",
        },
        {
          name: "vehiclePlate",
          type: "text",
          placeholder: "Vehicle Plate",
        },
        {
          name: "vehicleCapacity",
          type: "number",
          placeholder: "Vehicle Capacity",
        },
        {
          name: "VehicleType",
          type: "select",
          placeholder: "Select Vehicle Type",
        },
      ],
    },
  ];
  const onSubmit = (data: formValues) => {
    console.log(data);
  };
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        {formFields.map((section, index) => (
          <div key={index} className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">
              {section.title}
            </h2>
            <div className="space-y-2">
              {section.fields.map((field, idx) =>
                field.type === "select" ? (
                  <div key={idx}>
                    <label
                      htmlFor={field.name}
                      className="block text-sm font-medium text-gray-600"
                    >
                      {field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                    </label>
                    <select
                      id={field.name}
                      {...register(field.name as keyof formValues)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="" disabled selected>
                        {field.placeholder}
                      </option>
                      <option value="Auto">Auto</option>
                      <option value="Car">Car</option>
                      <option value="Moto">Moto</option>
                    </select>
                  </div>
                ) : (
                  <div key={idx}>
                    <label
                      htmlFor={field.name}
                      className="block text-sm font-medium text-gray-600"
                    >
                      {field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                    </label>
                    <input
                      type={field.type}
                      id={field.name}
                      placeholder={field.placeholder}
                      {...register(field.name as keyof formValues)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors[field.name as keyof formValues]?.message}
                  </div>
                )
              )}
            </div>
          </div>
        ))}
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
        >
          Submit
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default DriverSignUp;

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";

const Form = ({
  schema,
  onSubmit,
  fields,
  // isLoading,
  defaultValues
}: {
  schema: any;
  onSubmit: SubmitHandler<any>;
  fields: {
    name: string;
    label: string;
    type: string;
    placeholder: string;
  }[];
  // isLoading: boolean;
  defaultValues: any;
}) => {
  
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm({resolver: zodResolver(schema), defaultValues});

    return (
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {fields.map((item) => (
          <div className="space-y-1">
            <label
              className="block mb-2 text-sm font-medium text-gray-600"
              htmlFor={item.name}
            >
              {item.label}
            </label>

            <Controller
              name={item.name}
              control={control}
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    type={item.type || "text"}
                    className={`bg-gray-50 rounded-md focus:outline-2 focus:border-offset-2 focus:outline-teal-500 w-full p-2.5 placeholder:text-stone-300 mb-0 ${errors[item.name] && " border-2 border-red-500"}`}
                    id={item.name}
                    placeholder={item.placeholder || 'insert your ' + item.name}
                    autoComplete="off"
                    aria-invalid={errors[item.name] ? "true" : "false"}
                  />
                  { errors[item.name] && (
                  <span className="text-sm text-red-500">
                    {/* {`${errors[item.name]?.message}`} solusi yang tidak direkomendasikan tetapi masih works */}
                    {errors[item.name]?.message as string}
                  </span>
                  )}
                </>
              )}
            />
          </div>
        ))}
      </form>
    )
};

export default Form;

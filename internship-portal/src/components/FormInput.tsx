interface FormInputProps {
  label: string;
  name: string;
  register: any;
  type?: string;
  error?: string;
}

export default function FormInput({
  label,
  name,
  register,
  type = "text",
  error,
}: FormInputProps) {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium">{label}</label>
      <input
        type={type}
        {...register(name)}
        aria-invalid={!!error}
        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

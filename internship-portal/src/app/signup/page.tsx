"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/FormInput";

// 1️⃣ Zod Schema
const signupSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// 2️⃣ Type Inference
type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupFormData) => {
    console.log("Signup Data:", data);
    alert(`Welcome ${data.name}`);
  };

  return (
    <main className="p-6 flex justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-96 bg-white p-6 rounded-lg shadow"
      >
        <h1 className="text-xl font-bold mb-4">Signup</h1>

        <FormInput
          label="Name"
          name="name"
          register={register}
          error={errors.name?.message}
        />

        <FormInput
          label="Email"
          name="email"
          type="email"
          register={register}
          error={errors.email?.message}
        />

        <FormInput
          label="Password"
          name="password"
          type="password"
          register={register}
          error={errors.password?.message}
        />

        <button
          disabled={isSubmitting}
          className="bg-blue-600 text-white w-full py-2 rounded mt-2 hover:bg-blue-700"
        >
          {isSubmitting ? "Submitting..." : "Sign Up"}
        </button>
      </form>
    </main>
  );
}

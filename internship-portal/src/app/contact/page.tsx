"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/FormInput";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormData) => {
    console.log("Contact Data:", data);
    alert("Message Sent!");
  };

  return (
    <main className="p-6 flex justify-center">
      <form className="w-96 bg-white p-6 rounded-lg shadow" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-xl font-bold mb-4">Contact Us</h1>

        <FormInput label="Name" name="name" register={register} error={errors.name?.message} />
        <FormInput label="Email" name="email" type="email" register={register} error={errors.email?.message} />
        <FormInput label="Message" name="message" register={register} error={errors.message?.message} />

        <button className="bg-green-600 text-white w-full py-2 rounded mt-2 hover:bg-green-700">
          Submit
        </button>
      </form>
    </main>
  );
}

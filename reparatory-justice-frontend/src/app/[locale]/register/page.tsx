import RegistrationForm from "@/components/RegistrationForm";

export default function RegisterRoute() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Delegate Registration
        </h1>
        <p className="mt-4 text-lg text-gray-500">
          Global Reparatory Justice Programme
        </p>
      </div>
      
      <RegistrationForm />
    </main>
  );
}

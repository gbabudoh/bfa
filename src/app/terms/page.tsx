export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>
      <p className="mt-4 text-gray-600">Please read our terms of service before using our platform.</p>
    </div>
  );
}

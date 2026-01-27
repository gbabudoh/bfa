export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>
      <p className="mt-4 text-gray-600">Our privacy policy details how we handle your data.</p>
    </div>
  );
}

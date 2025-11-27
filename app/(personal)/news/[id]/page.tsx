export default function NewsDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="w-full py-12 text-center">
      <h1 className="text-3xl font-bold">News Detail</h1>
      <p className="mt-4 text-gray-600">News content for ID: {params.id}</p>
    </div>
  );
}

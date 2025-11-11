'use client';

export default function RichTextEditor({ value, onChange, placeholder = 'Enter content here...' }) {
  return (
    <div className="border border-gray-300 rounded-lg">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full min-h-[200px] p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>
  );
}
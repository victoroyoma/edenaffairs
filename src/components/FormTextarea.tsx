import React from 'react';
interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}
export function FormTextarea({
  label,
  error,
  id,
  className,
  ...props
}: FormTextareaProps) {
  return <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-200 mb-1">
        {label}
      </label>
      <textarea id={id} className={`w-full bg-slate-800 border ${error ? 'border-rose-500' : 'border-slate-700'} rounded-md px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400 ${className}`} {...props} />
      {error && <p className="mt-1 text-sm text-rose-500">{error}</p>}
    </div>;
}
import React from 'react';

interface Props {
  error?: string;
  label?: string;
  children: React.ReactNode;
}
export default function UiField({ error, label, children }: Props) {
  return (
    <div className="text-left">
      <label className="text-sm">{label}</label>
      {children}
      <div data-testid="error-text" className=" text-danger text-xs">
        {error}
      </div>
      <div className="text-sm font-bold text-gray"></div>
    </div>
  );
}

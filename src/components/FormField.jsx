import React from 'react';

const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}) => (
  <div className="relative">
  <div className="flex items-center gap-2 mb-2">
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-900"
    >
      {labelName}
    </label>
    {isSurpriseMe && (
      <button
        type="button"
        onClick={handleSurpriseMe}
        className="font-semibold text-xs bg-[#EcECF1] py-1 px-2 rounded-[5px] text-black"
      >
        Surprise me
      </button>
    )}
  </div>
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <svg
        className="h-5 w-5 text-gray-400"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          className="heroicon-ui"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM1 10a9 9 0 0117.95-2.95A7 7 0 0118 10a9 9 0 11-17.95 2.95A7 7 0 011 10z"
        />
      </svg>
    </div>
    <input
      type={type}
      id={name}
      name={name}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3 pl-10"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      required
    />
  </div>
</div>

);

export default FormField;
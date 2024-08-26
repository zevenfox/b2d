import React from 'react';
import Select from 'react-select';

type SearchProps = {
  placeholder: string;
  onSearch: (query: string) => void;
};

export default function Search({ placeholder, onSearch }: SearchProps) {
  // Dummy options for the select dropdown
  const serviceOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  return (
    <div>
      <Select
        options={serviceOptions}
        className="w-full"
        placeholder="Search for start ups..."
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: 'transparent',
            borderColor: state.isFocused ? 'white' : 'gray',
          }),
          singleValue: (baseStyles) => ({
            ...baseStyles,
            color: 'white',
          }),
          option: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: state.isFocused ? '#2684FF' : 'transparent',
            color: state.isFocused ? 'white' : 'black',
          }),
        }}
      />
    </div>
  );
}
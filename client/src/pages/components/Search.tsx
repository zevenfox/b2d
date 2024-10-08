// import React from 'react';
// import Select from 'react-select';

// type SearchProps = {
//   placeholder: string;
//   onSearch: (query: string) => void;
// };

// export default function Search({ placeholder, onSearch }: SearchProps) {
//   // Dummy options for the select dropdown
//   const serviceOptions = [
//     { value: 'option1', label: 'Option 1' },
//     { value: 'option2', label: 'Option 2' },
//     { value: 'option3', label: 'Option 3' },
//   ];

//   return (
//     <div>
//       <Select
//         options={serviceOptions}
//         className="w-full"
//         placeholder="Search for start ups..."
//         styles={{
//           control: (baseStyles, state) => ({
//             ...baseStyles,
//             backgroundColor: 'transparent',
//             borderColor: state.isFocused ? 'white' : 'gray',
//           }),
//           singleValue: (baseStyles) => ({
//             ...baseStyles,
//             color: 'white',
//           }),
//           option: (baseStyles, state) => ({
//             ...baseStyles,
//             backgroundColor: state.isFocused ? '#2684FF' : 'transparent',
//             color: state.isFocused ? 'white' : 'black',
//           }),
//         }}
//       />
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

type SearchProps = {
  placeholder: string;
  onSearch: (query: string) => void;
};

type StartupOption = {
  value: number;
  label: string;
};

export default function Search({ placeholder, onSearch }: SearchProps) {
  const [startupOptions, setStartupOptions] = useState<StartupOption[]>([]);

  useEffect(() => {
    // Fetch startup names from the backend using axios
    const fetchStartups = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/startups');
        const data = response.data;
        // Map the response data to options format for react-select
        const options = data.map((startup: { id: number; company_name: string }) => ({
          value: startup.id,
          label: startup.company_name,
        }));
        setStartupOptions(options);
      } catch (error) {
        console.error('Error fetching startups:', error);
      }
    };

    fetchStartups();
  }, []);

  const handleSelectChange = (selectedOption: StartupOption | null) => {
    if (selectedOption) {
      console.log(`Selected startup ID: ${selectedOption.value}`);
      onSearch(selectedOption.label); // TODO: handle redirection or other actions here
    }
  };

  return (
    <div>
      <Select
        options={startupOptions}
        className="w-full"
        placeholder={placeholder}
        onChange={handleSelectChange}
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
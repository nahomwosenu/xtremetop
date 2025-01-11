import React, { useState, useRef, useEffect } from 'react';

interface Option {
    label: string;
    value: string;
}

interface SelectProps {
    options: Option[];
    label: string;
    multiple?: boolean;
    placeholder?: string;
    searchable?: boolean;
    onChange: (value: string | string[]) => void;
    value: string | string[] | undefined;
    error?: string;
    required?: boolean;
    darkMode?: boolean;
}

const Select: React.FC<SelectProps> = ({
    options,
    label,
    multiple = false,
    placeholder = 'Select...',
    searchable = false,
    onChange,
    value,
    error,
    required = false,
    darkMode = false
}) => {
    const [search, setSearch] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleOptionClick = (optionValue: string) => {
        if (multiple) {
            let newValue: string[] = Array.isArray(value) ? [...value] : [];
            if (newValue.includes(optionValue)) {
                newValue = newValue.filter(v => v !== optionValue);
            } else {
                newValue.push(optionValue);
            }
            onChange(newValue);
        } else {
            onChange(optionValue);
            setIsOpen(false); // Close dropdown after selection
        }
    };

    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(search.toLowerCase())
    );

    const displayValue = () => {
        if (!value || (Array.isArray(value) && value.length === 0)) {
            return placeholder;
        }
        if (multiple && Array.isArray(value)) {
            const selectedOptions = options.filter(option => value.includes(option.value));
            return selectedOptions.map(option => option.label).join(', ');
        } else {
            const selectedOption = options.find(option => option.value === value);
            return selectedOption ? selectedOption.label : placeholder;
        }
    };

    return (
        <div className="relative" ref={selectRef}>
            <label className={`block text-sm ${darkMode ? 'text-yellow-300' : 'text-gray-700'}`}>
                {label}{required && <span className="text-red-500">*</span>}
            </label>
            <div
                className={`w-full p-3 rounded-lg focus:outline-none focus:ring-2 cursor-pointer ${darkMode
                    ? 'bg-gray-700 border border-yellow-400 text-white placeholder-gray-400 focus:ring-yellow-500'
                    : 'bg-gray-200 border border-yellow-300 text-black placeholder-gray-500 focus:ring-yellow-500'
                    }`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {displayValue()}
            </div>
            {isOpen && (
                <div className={`absolute z-10 mt-1 w-full rounded-md shadow-lg max-h-60 overflow-auto ${darkMode ? 'bg-gray-800 border border-gray-600' : 'bg-white border border-gray-300'}`}>
                    {searchable && (
                        <div className="p-2">
                            <input
                                type="text"
                                value={search}
                                onChange={handleSearch}
                                className={`w-full p-2 rounded-lg border focus:ring-2 ${darkMode
                                    ? 'bg-gray-700 text-white border-gray-600 focus:ring-yellow-400 placeholder-gray-400'
                                    : 'bg-gray-100 text-black border-gray-300 focus:ring-yellow-500 placeholder-gray-500'
                                    }`}
                                placeholder="Search..."
                            />
                        </div>
                    )}
                    <ul>
                        {filteredOptions.map(option => (
                            <li
                                key={option.value}
                                className={`cursor-pointer px-4 py-2 ${darkMode
                                    ? 'hover:bg-gray-600 text-gray-300'
                                    : 'hover:bg-gray-100 text-gray-700'
                                    } ${multiple && Array.isArray(value) && value.includes(option.value) ||
                                        (!multiple && value === option.value)
                                        ? (darkMode ? 'bg-gray-600' : 'bg-gray-200')
                                        : ''
                                    }`}
                                onClick={() => handleOptionClick(option.value)}
                            >
                                {multiple && (
                                    <input
                                        type="checkbox"
                                        checked={Array.isArray(value) && value.includes(option.value)}
                                        readOnly
                                        className="mr-2"
                                    />
                                )}
                                {option.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {error && <p className={`mt-1 text-sm ${darkMode ? 'text-red-400' : 'text-red-600'}`}>{error}</p>}
        </div>
    );
};

export default Select;

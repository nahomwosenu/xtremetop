// PartialDateInput.tsx
import React, { useState, useRef, useEffect } from 'react';

interface PartialDateInputProps {
    yearRange?: { start: number; end: number };
}

const PartialDateInput: React.FC<PartialDateInputProps> = ({
    yearRange = { start: 1900, end: new Date().getFullYear() }
}) => {
    const [value, setValue] = useState('');

    const onChange = (val: any) => setValue(val);

    const [displayValue, setDisplayValue] = useState('YYYY/MM/DD');
    const [showDropdown, setShowDropdown] = useState(false);
    const [activeSection, setActiveSection] = useState<'year' | 'month' | 'day' | null>(null);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
    const [filterText, setFilterText] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const years = Array.from(
        { length: yearRange.end - yearRange.start + 1 },
        (_, i) => yearRange.end - i
    );

    useEffect(() => {
        const formatted = formatPartialDate(value);
        setDisplayValue(formatted);
    }, [value]);

    const formatPartialDate = (dateStr: string) => {
        if (!dateStr) return 'YYYY/MM/DD';
        const parts = dateStr.split('/');
        const year = parts[0] || 'YYYY';
        const month = parts[1] || 'MM';
        const day = parts[2] || 'DD';
        return `${year}/${month}/${day}`;
    };

    const getCursorPosition = (input: HTMLInputElement) => {
        const cursorPosition = input.selectionStart || 0;
        if (cursorPosition <= 4) return 'year';
        if (cursorPosition <= 7) return 'month';
        return 'day';
    };

    const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
        const input = e.currentTarget;
        const section = getCursorPosition(input);
        openDropdownForSection(section, input);
    };

    const openDropdownForSection = (section: 'year' | 'month' | 'day', input: HTMLInputElement) => {
        setActiveSection(section);
        setShowDropdown(true);
        setFilterText('');

        const rect = input.getBoundingClientRect();
        const totalWidth = input.offsetWidth;
        let left = rect.left;
        let width = section === 'month' ? 160 : 120;

        if (section === 'year') {
            left = rect.left;
        } else if (section === 'month') {
            left = rect.left + (totalWidth * 0.33);
        } else if (section === 'day') {
            left = rect.left + (totalWidth * 0.66);
        }

        setDropdownPosition({
            top: rect.bottom + window.scrollY,
            left,
            width
        });
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') {
            setShowDropdown(false);
            setActiveSection(null);
            return;
        }

        if (e.key === 'Tab' || e.key === '/') {
            e.preventDefault();
            const input = e.currentTarget;
            const currentSection = getCursorPosition(input);
            const nextSection = currentSection === 'year' ? 'month' :
                currentSection === 'month' ? 'day' : 'year';
            openDropdownForSection(nextSection, input);
            return;
        }

        if (/^[0-9a-zA-Z]$/.test(e.key)) {
            e.preventDefault();
            setFilterText(prev => {
                const newFilter = prev + e.key;
                filterAndSelectOption(newFilter);
                return newFilter;
            });
        }
    };

    const filterAndSelectOption = (filter: string) => {
        const options = getDropdownOptions(filter);
        if (options.length === 1) {
            handleOptionSelect(options[0]);
            setFilterText('');
        }
    };

    const handleOptionSelect = (selected: string) => {
        const parts = value.split('/') || ['', '', ''];

        if (activeSection === 'year') {
            parts[0] = selected.padStart(4, '0');
        } else if (activeSection === 'month') {
            const monthIndex = months.findIndex(m => m.toLowerCase().startsWith(selected.toLowerCase())) + 1;
            if (monthIndex > 0) {
                parts[1] = String(monthIndex).padStart(2, '0');
            }
        } else if (activeSection === 'day') {
            parts[2] = selected.padStart(2, '0');
        }

        const newValue = parts.join('/');
        onChange(newValue);

        // Move to next section
        if (inputRef.current) {
            const nextSection = activeSection === 'year' ? 'month' :
                activeSection === 'month' ? 'day' : null;
            if (nextSection) {
                openDropdownForSection(nextSection, inputRef.current);
            } else {
                setShowDropdown(false);
                setActiveSection(null);
            }
        }
    };

    const handleClickOutside = (e: MouseEvent) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(e.target as Node) &&
            inputRef.current &&
            !inputRef.current.contains(e.target as Node)
        ) {
            setShowDropdown(false);
            setActiveSection(null);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const getDropdownOptions = (filter: string = filterText) => {
        if (activeSection === 'year') {
            return years
                .filter(year => year.toString().startsWith(filter))
                .map(year => year.toString());
        } else if (activeSection === 'month') {
            return months.filter(month =>
                month.toLowerCase().startsWith(filter.toLowerCase())
            );
        } else if (activeSection === 'day') {
            return Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'))
                .filter(day => day.startsWith(filter));
        }
        return [];
    };

    return (
        <div className="relative">
            <input
                ref={inputRef}
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text font-mono"
                value={displayValue}
                onClick={handleInputClick}
                onKeyDown={handleKeyDown}
                readOnly
            />
            {showDropdown && (
                <div
                    ref={dropdownRef}
                    className="absolute z-50 mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto"
                    style={{
                        top: dropdownPosition.top,
                        left: dropdownPosition.left,
                        width: dropdownPosition.width
                    }}
                >
                    {getDropdownOptions().map((option, index) => (
                        <div
                            key={index}
                            className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${option.toLowerCase().startsWith(filterText.toLowerCase()) ? 'font-bold' : ''
                                }`}
                            onClick={() => handleOptionSelect(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PartialDateInput;
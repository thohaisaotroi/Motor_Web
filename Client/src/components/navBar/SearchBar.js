import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as SearchBtn } from '../../Assets/images/search.svg';
import { StyledSearchBar } from './NavStyledComponents';
import { useSearch } from '../../contexts/SearchContext';

export default function SearchBar({ initialActive }) {
    const searchInput = useRef();
    const [searchActive, setSearchActive] = useState(initialActive || false);
    const [inputValue, setInputValue] = useState('');
    const { setSearchQuery } = useSearch();
    const navigate = useNavigate();

    const handleSearchClick = () => {
        setSearchActive(true);
        searchInput.current.focus();
    };

    const handleInputBlur = () => {
        setSearchActive(false);
    };

    const handleSubmit = (e) => {
        if (e.key === 'Enter' && inputValue.trim()) {
            setSearchQuery(inputValue.trim()); // Update the context with the search query
            navigate(`/groupproject/searchpage?search=${encodeURIComponent(inputValue.trim())}`);
            setInputValue(''); // Clear the input field after submission
            searchInput.current.blur(); // Optionally, blur the input field
        }
    };

    const handleSearchChange = (query) => {
        setInputValue(query);
    };

    return (
        <StyledSearchBar active={searchActive}>
            <input
                type="text"
                ref={searchInput}
                onBlur={handleInputBlur}
                value={inputValue}
                onChange={(e) => handleSearchChange(e.target.value)}
                onKeyUp={(e) => handleSubmit(e)}
            />
            <button onClick={handleSearchClick}>
                <SearchBtn />
            </button>
        </StyledSearchBar>
    );
}

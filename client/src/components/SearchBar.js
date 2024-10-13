import React from 'react';
import styled from 'styled-components';
import { SearchOutlined } from '@mui/icons-material';

const SearchBarContainer = styled.div`
    max-width:550px;
    display:flex;
    width:90%;
    border:1px solid #9747FF;
    border-raidus:8px;
    padding:12px 16px;
    cursor:pointer;
    gap:6px;
    align-items:center
`;
export const SearchBar = () => {
    return (
        <SearchBarContainer>
            <SearchOutlined />
            <input placeholder='Search with prompt or name . . .' style={{
                border: "none",
                outline: "none",
                width: "100%",
                color: "inherit",
                fontSize: "16px",
                background: "transparent"
            }} />
        </SearchBarContainer>
    )
}

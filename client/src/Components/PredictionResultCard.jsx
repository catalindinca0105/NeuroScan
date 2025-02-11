import React from 'react'
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

const Container = styled.div`
    display:flex;
    flex-direction: column;
    justify-content:center;
    align-item: center;
    border: 2px solid  #02c952;
    border-radius: 12px;
    color: ${({ theme }) => theme.soft};
    padding: 4px;
    color: ${({ theme }) => theme.soft};
`;

const Image = styled.img`
    width: 224px;
    height: 224px;
    object-fit: cover;
    border-radius: 12px;
`;

const ImageText = styled.div`
    text-align: center;
    padding: 4px;
    font-weight: 500;
`;

const PredictionResultCard = ({ image }) => {
    return (
        <Container>
            <Image src={image.base64_file} />
            <ImageText>{image.file_name}</ImageText>
        </Container>
    )
}

export default PredictionResultCard
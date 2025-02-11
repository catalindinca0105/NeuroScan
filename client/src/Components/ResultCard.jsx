import { prepareCssVars } from '@mui/system';
// import React from 'react'
import styled from 'styled-components';
import { useTheme } from 'styled-components';
import { createPortal } from 'react-dom';
import React, { useState } from 'react';

const Container = styled.div`
    height: 150px;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 12px;
    display: flex;
    gap: 14px;
    flex-direction: row;
    transition: all 0.3s ease-in-out;
    cursor: pointer;

    &:hover {
        transform: scale(1.02);
    }

    @media (max-width: 430px) {
        flex-direction: column;
        height: fit-content;
    }
`;

const Image = styled.img`
    height: 100%;
    width: auto;
    object-fit: cover;
    border-radius: 12px;
    border: 2px solid ${({ prediction }) => (prediction ? '#28a745' : '#dc3545')};
    cursor: pointer;
`;

const Body = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
`;

const Title = styled.div`
    font-size: 18px;
    font-weight: 500;
    color: ${({ prediction }) => (prediction ? '#28a745' : '#dc3545')};
`;

const Description = styled.div`
    font-size: 14px;
    font-weight: 400;
    color: ${({ prediction }) => (prediction ? '#28a745aa' : '#dc3545aa')};
`;

const File = styled.div`
    font-size: 15px;
    font-weight: 400;
    color: #333;
`;

const Probability = styled.div`
    font-size: 14px;
    font-weight: 600;
    margin-top: 6px;
    color: ${({ prediction }) => (prediction ? '#28a745' : '#dc3545')};
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 10px;
    max-width: 80%;
    max-height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ModalImage = styled.img`
    max-width: 100%;
    max-height: 80vh;
    border-radius: 10px;
`;

const CloseButton = styled.button`
    margin-top: 10px;
    padding: 8px 16px;
    background: #dc3545;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background: #c82333;
    }
`;

const ResultCard = ({ image, prediction }) => {
    const [isModalOpen, setModalOpen] = useState(false);

    let probability = prediction * 100;
    if (probability > 50) {
        prediction = 1;
    } else {
        prediction = 0;
        probability = 100 - probability;
    }

    return (
        <>
            <Container>
                <Image
                    prediction={!prediction}
                    src={image.base64_file}
                    alt="image"
                    onClick={() => setModalOpen(true)}
                />
                <Body>
                    <Title prediction={!prediction}>
                        {!prediction ? "No tumor detected" : "Tumor detected"}
                    </Title>
                    <Description prediction={!prediction}>
                        {!prediction
                            ? "Based on our ML model's prediction, no tumor was detected."
                            : "Based on our ML model's prediction, a tumor might be present."}
                    </Description>
                    <File>File: {image.file_name}</File>
                    <Probability prediction={!prediction}>
                        Precision: {Math.round(probability * 100) / 100}%
                    </Probability>
                </Body>
            </Container>
            {isModalOpen &&
                createPortal(
                    <ModalOverlay onClick={() => setModalOpen(false)}>
                        <ModalContent onClick={(e) => e.stopPropagation()}>
                            <ModalImage src={image.base64_file} alt="image preview" />
                            <CloseButton onClick={() => setModalOpen(false)}>Close</CloseButton>
                        </ModalContent>
                    </ModalOverlay>,
                    document.body
                )}
        </>
    );
};

export default ResultCard;
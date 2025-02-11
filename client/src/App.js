
import { ThemeProvider } from "styled-components";
import { useState } from "react";
import { lightTheme, } from "./utils/themes";
import styled from 'styled-components';
import ImageUpload from "./Components/UploadImageForm";
import ImagesCard from "./Components/ImagesCard";
import Loader from "./Components/Loader";
import ResultCard from "./Components/ResultCard";
import axios from 'axios';
import { Images } from "./data";
import { useEffect } from "react";
import { jsPDF } from "jspdf";

const Body = styled.div`
display: flex; 
align-items: center;
flex-direction: column;
width: 100vw;
min-height: 100vh;
background-color: ${({ theme }) => theme.bg};
overflow-y: scroll;
font-family: 'Poppins', sans-serif;
`;

const Heading = styled.div`
  font-size: 42px;
  @media (max-width: 530px) {
    font-size: 30px
  }
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin: 2% 0px;
`;

const Container = styled.div`
  max-width: 100%;
  display: flex; 
  justify-content: center;
  flex-direction: row;
  @media (max-width: 1100px) {
    flex-direction: column;
  }
  gap: 40px;
  padding: 2% 0% 6% 0%;
`;

const Centered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FlexItem = styled.div`
  width: 500px;
  @media (max-width: 530px) {
    width: 400px
  }
  @media (max-width: 430px) {
    width: 300px
  }
  display: flex;
  flex-direction: column;
  gap: 40px;
  flex: 1;
`;

const TextCenter = styled.div`
  font-size: 22px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  text-align: center;
`;

const Button = styled.div`
  min-height: 48px;
  border-radius: 25px;;
  color: ${({ theme }) => theme.soft2};
    font-weight: 600;
    font-size: 16px;
    background: ${({ theme }) => theme.primary};
    color: white;
  margin: 3px 20px;
  font-weight: 600;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 14px;
`;

const Typo = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  
`;

const SelectedImages = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  @media (max-width: 530px) {
    grid-template-columns: auto auto;
  }
  justify-content: center;
  gap: 10px;
  align-items: center;
`;


const ResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Description = styled.div`
  font-size: 18px;
  line-height: 1.6;
  color: ${({ theme }) => theme.textSoft};
  text-align: center;
  margin: 20px 0;
  width:50%;
  @media (max-width: 530px) {
    font-size: 16px;
    text-align: justify;
  }
`;


function App() {
  const [images, setImages] = useState(null);
  const [predictedImage, setPredictedImage] = useState(null);
  const [predictions, setPredictions] = useState();
  const [loading, setLoading] = useState(false);
  const [showPrediction, setShowPrediction] = useState(false);

  const generatePrediction = async () => {
    setLoading(true);
    const imageData = []
    for (let i = 0; i < images.length; i++) {
      imageData.push(images[i].base64_file)
    }
    const data = { image: imageData }
    const res = await axios.post('http://localhost:5000', data).catch((err) => {
      console.log(err);
    });
    setPredictedImage(images)
    setPredictions({ image: imageData, result: res.data.result })
    setShowPrediction(true);
    setLoading(false);
  }

  const generateNewImages = () => {
    const newImages = [];
    for (let i = 0; i < 2; i++) {
      const randomIndex = Math.floor(Math.random() * Images.length);
      newImages.push({
        base64_file: Images[randomIndex],
        file_name: `Example Image ${i + 1}`,
      });
    }
    setImages(newImages);
  };

  useEffect(() => {
    generateNewImages();
  }, []);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Brain Tumor Classification Report", 10, 10);
    predictedImage.forEach((img, index) => {
      doc.text(`Image ${index + 1}: ${predictions.result[index]}`, 10, 20 + index * 10);
    });
    doc.save("Prediction_Report.pdf");
  };


  return (
    <ThemeProvider theme={lightTheme}>
      <Body>
        <Heading>Brain Tumor Classification</Heading>
        <Description>
        This application uses an advanced artificial intelligence model, VGG-16, to analyze medical images and detect the presence of brain tumors. Upload your images or use examples to start the analysis.
</Description>
        {loading ?
          <Centered>
            <Loader />
          </Centered>
          :
          <Container>
            <FlexItem>
              <ImageUpload images={images} setImages={setImages} />
              <TextCenter>Try analyzing example images</TextCenter>
              <SelectedImages>
                {images && images.map((image, index) => {
                  return (
                    <ImagesCard
                      key={index}
                      image={image}
                    />
                  );
                })}
              </SelectedImages>
              <Button onClick={() => generateNewImages()}>Get New Examples</Button>
              {images &&
                <Button onClick={() => { generatePrediction() }}>Start Analysis</Button>}
                {showPrediction && <Button onClick={downloadPDF}>Download Report</Button>}
            </FlexItem>
            {showPrediction &&
              <FlexItem style={{ gap: '22px' }}>
                <Typo>Prediction Results</Typo>
                <ResultWrapper>
                  {predictedImage.map((image, index) => {
                    return (
                      <ResultCard
                        key={index}
                        image={image}
                        prediction={predictions.result[index]}
                      />
                    );
                  })}
                </ResultWrapper>
              </FlexItem>
            }
          </Container>
        }
      </Body>
    </ThemeProvider>
  );
}

export default App;

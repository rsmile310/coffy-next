import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Webcam from "react-webcam";
import jsQR from "jsqr";
import styled from 'styled-components';
import axios from 'axios';
const logo = '/assets/Logo-black.PNG';
const logo2 = '/assets/logo.PNG';
const scannerImage = '/assets/Scan.svg';
const scannerImage2 = '/assets/Scan-green.svg';
const scannerImage3 = '/assets/Scan-red.svg';


const videoConstraints = {
  facingMode: { exact: "environment" }
};

const ScannerToken = ({ scannerToken }) => {
  const webcamRef = useRef(null);
  const [qrCode, setQRCode] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [popupMessage, setPopupMessage] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!showCamera) return;

    const interval = setInterval(() => {
      scanQRCode();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [showCamera]);

  const scanQRCode = () => {
    const imageSrc = webcamRef?.current?.getScreenshot();

    if (imageSrc) {
      const image = new Image();
      image.src = imageSrc;


      image.onload = () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0, image.width, image.height);
        const imageData = context.getImageData(0, 0, image.width, image.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code) {
          setQRCode(code.data);
        }
      };
    }
  };

  const handleReset = () => {
    setQRCode(null);
    setPopupMessage(null);
  };

  const handleAccessRegistration = async () => {
    if (!qrCode) {
      setPopupMessage(false);
      console.log("QR data not available!");
      return;
    }

    try {
      const qrData = JSON.parse(qrCode);
      console.log(qrData);

      if (qrData && qrData.ticketId) {
        const response = await axios.post('/api/tickets/validate', { ticketId: qrData.ticketId });
        console.log(response);

        if (response.data.valid) {
          setPopupMessage(true);
        } else {
          setPopupMessage(false);
        }
      }
    } catch (error) {
      console.log(error);
      setPopupMessage(false);
    }
  };

  return (
    <Container>
      <Logo src={logo} />
      <WebcamContainer>
        {!showCamera && (
          <Button onClick={() => setShowCamera(true)}>
            <ScannerImage src={scannerImage} />
            <ScanText>Scan Your Ticket</ScanText>
          </Button>
        )}
        {showCamera && (
          <>
            <Webcam
              audio={false}
              height={300}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={300}
              videoConstraints={videoConstraints}
            />
            <ScannerImage2 src={scannerImage2} />
            <CancelButton onClick={() => setShowCamera(false)}>Cancel</CancelButton>
            {qrCode && (
              <>
                <TicketInfo>{qrCode}</TicketInfo>
                <Button onClick={handleAccessRegistration}>Access Registration</Button>
                <Button onClick={handleReset}>Reset</Button>
              </>
            )}
          </>
        )}
      </WebcamContainer>
      {popupMessage !== null && (
        <PopupContainer success={popupMessage}>
          <PopupImage src={popupMessage ? scannerImage2 : scannerImage3} />
          <PopupText>{popupMessage ? 'Valid Ticket' : 'Invalid Ticket'}</PopupText>
          <CloseButton onClick={() => setPopupMessage(null)}>Close</CloseButton>
        </PopupContainer>
      )}
    </Container>
  );
};

ScannerToken.getInitialProps = async ({ query }) => {
  return { scannerToken: query.scannerToken };
};

export default ScannerToken;

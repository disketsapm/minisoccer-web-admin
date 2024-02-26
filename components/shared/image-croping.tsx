import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from './cropimage';
import { Button } from '../ui/button';

type ImageCropperProps = {
  imageSrc: string;
  setCroppedImageFor: (croppedImageUrl: string) => void;
  aspect?: number;
};

type CroppedArea = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type CroppedAreaPixels = CroppedArea;

const ImageCropper: React.FC<ImageCropperProps> = ({ imageSrc, setCroppedImageFor, aspect }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [loading, setLoading] = useState(false);
  // Assuming croppedAreaPixels should have properties like width and height
  const [croppedAreaPixels, setCroppedAreaPixels] = useState({ width: 0, height: 0, x: 0, y: 0 });

  const onCropComplete = useCallback((croppedArea: CroppedArea, croppedAreaPixels: CroppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const onCrop = async () => {
    try {
      setLoading(true);
      const croppedImageUrl = await getCroppedImg(imageSrc, croppedAreaPixels);
      setCroppedImageFor(croppedImageUrl);
    } catch (error) {
      console.error('Error cropping the image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div style={{ position: 'relative', width: '100%', height: 400 }}>
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <Button
        disabled={loading}
        onClick={onCrop}
      >
        Crop
      </Button>
    </>
  );
};

export default ImageCropper;

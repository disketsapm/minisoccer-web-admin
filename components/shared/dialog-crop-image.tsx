'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import ImageCropper from './image-croping';

type DialogCropImageProps = {
  imageUrl: string | null;
  setCropComplete: (cropImage: any) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  typeImage: string;
};

export function DialogCropImage({ imageUrl, setCropComplete, open, onOpenChange, typeImage }: DialogCropImageProps) {
  const handleClose = () => {
    onOpenChange(false);
  };

  const setCroppedImage = (image: any) => {
    setCropComplete((prevState: any) => ({
      ...prevState,
      [typeImage]: image,
    }));
    onOpenChange(false);
  };
  return (
    <Dialog
      open={open}
      onOpenChange={handleClose}
    >
      <DialogContent className="sm:max-w-[825px]">
        <DialogHeader>
          <DialogTitle>Crop Image</DialogTitle>
        </DialogHeader>
        <ImageCropper
          imageSrc={imageUrl || ''}
          setCroppedImageFor={setCroppedImage}
          aspect={typeImage === 'desktop' ? 18 / 9 : 4 / 5}
        />
      </DialogContent>
    </Dialog>
  );
}

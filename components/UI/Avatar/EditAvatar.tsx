import { useCallback, useEffect, useState, ChangeEvent, useRef } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import LoadingLottie from '../Loaders/Dots';
import { useAuth } from '@/context/authContext';
import ProfileAvatar from './ProfileAvatar';
import { db, storage } from 'firebase/firebaseClient';
import Modal from '../Modal/Modal';
import FixedButton from '../Buttons/FixedButton';
import TextButton from '../Buttons/TextButton';

type Props = {
  photoURL?: string;
};
const EditAvatar = ({ photoURL }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [src, setSrc] = useState<any>('');
  const imgRef = useRef<any>(null);
  const previewCanvasRef = useRef<any>(null);
  const [crop, setCrop] = useState<any>({
    unit: '%',
    width: 30,
    aspect: 1 / 1,
  });
  const [completedCrop, setCompletedCrop] = useState<any>(null);
  const { userData } = useAuth();
  const [loading, setLoading] = useState(false);

  const { setUserData } = useAuth();

  const onSelectFile = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setSrc(reader.result));
      reader.readAsDataURL(target.files[0]);
      setIsModalOpen(true);
    }
  };

  const uploadPicture = (file: Blob) => {
    try {
      storage
        .ref(`/users/${userData.uid}`)
        .put(file)
        .then(() => {
          storage
            .ref(`/users/${userData.uid}`)
            .getDownloadURL()
            .then((url) => {
              setUserData({ ...userData, photoURL: url });
              db.collection('users').doc(userData.uid).update({
                photoURL: url,
              });
              setLoading(false);
            });
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleUploadClick = () => {
    if (!previewCanvasRef.current || !completedCrop) {
      return;
    }
    setLoading(true);
    let file = null;
    previewCanvasRef.current.toBlob((blob: any) => {
      file = new File([blob], 'fileName.jpg', { type: 'image/jpeg' });
      uploadPicture(file);
    }, 'image/png');
    closeModal();
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
  }, [completedCrop]);

  return (
    <div className="flex flex-col items-center">
      <div>
        <ProfileAvatar photoURL={photoURL} />
        <div className="fixed mt-[-5.6rem] ml-8">
          {loading ? <LoadingLottie height={40} width={80} /> : null}
        </div>
      </div>
      <div className="flex flex-col justify-cente bg-indigo-600 rounded-lg my-4 active:opacity-40 cursor-pointer">
        <button className="bg-blue hover:bg-blue-light text-white font-bold py-2 px-4 w-full inline-flex items-center  cursor-pointer">
          <span className="font-sans font-semibold cursor-pointer">
            Update Picture
          </span>
        </button>
        <input
          className="cursor-pointer absolute block py-2 px-4 w-full opacity-0 pin-r pin-t "
          type="file"
          name="documents[]"
          accept="image/*"
          onChange={onSelectFile}
        />
      </div>

      <Modal isOpen={isModalOpen}>
        <div className="flex flex-col items-center px-4 md:px-16 mt-4">
          <div className="flex w-full justify-between items-center">
            <TextButton type="normal" name="Cancel" onClick={closeModal} />
            <FixedButton name="Upload" onClick={handleUploadClick} />
          </div>
          <ReactCrop
            src={src}
            onImageLoaded={onLoad}
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
          />
          <span className="font-sans font-semibold text-center text-xl text-gray-300 my-8">
            Preview
          </span>
          <div className="flex justify-center">
            <canvas
              ref={previewCanvasRef}
              style={{
                width: Math.round(completedCrop?.width ?? 0),
                height: Math.round(completedCrop?.height ?? 0),
              }}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EditAvatar;

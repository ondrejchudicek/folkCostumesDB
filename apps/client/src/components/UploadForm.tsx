import { useRef, useState } from 'react';
import CloseButton from './CloseButton';

function FormButtons({
  resetForm,
  openGuide,
}: {
  resetForm: () => void;
  openGuide: () => void;
}) {
  return (
    <div className="w-full h-full flex justify-around">
      <button
        className="bg-(--bg) pl-(--global-padding) pr-(--global-padding) rounded-(--corner-radius) font-(family-name:--default-font) text-xl text-red-600 text-center"
        onClick={resetForm}
      >
        Zrušit
      </button>
      <button
        className="bg-(--bg) pl-(--global-padding) pr-(--global-padding) rounded-(--corner-radius) font-(family-name:--default-font) text-xl text-(--font-col) text-center"
        onClick={openGuide}
      >
        Návod
      </button>
      <button className="bg-(--bg) pl-(--global-padding) pr-(--global-padding) rounded-(--corner-radius) font-(family-name:--default-font) text-xl text-(--font-col) text-center">
        Náhled
      </button>
      <button className="bg-(--bg) pl-(--global-padding) pr-(--global-padding) rounded-(--corner-radius) font-(family-name:--default-font) text-xl text-green-600 text-center">
        Nahrát
      </button>
    </div>
  );
}

function UploadedModels({ uploadedModels }: { uploadedModels: File[] }) {
  return uploadedModels.map((model) => (
    <input
      type="text"
      className="w-full h-10 bg-(--bg) rounded-(--corner-radius) p-(--global-padding) font-(family-name:--default-font) text-xl text-(--font-col)"
      name="name"
      placeholder={model.name}
      autoComplete="off"
      required
    />
  ));
}

function UploadedImages({ uploadedImages }: { uploadedImages: File[] }) {
  return (
    <div className="w-full h-fit grid grid-cols-2 gap-(--global-padding)">
      {uploadedImages.map((image) => (
        <div className="w-full h-fit flex flex-col gap-y-(--global-padding) p-(--global-padding) bg-(--bg) rounded-(--corner-radius)">
          <img src={URL.createObjectURL(image)} alt="Image Missing" />
          <input
            type="text"
            className="w-full h-10 bg-(--bg) p-(--global-padding) font-(family-name:--default-font) text-xl text-(--font-col)"
            name="name"
            placeholder={image.name}
            autoComplete="off"
            required
          />
        </div>
      ))}
    </div>
  );
}

export default function UploadForm({
  isOpen,
  closeUploadForm,
  isMobileLayout,
  openGuide,
}: {
  isOpen: boolean;
  closeUploadForm: () => void;
  isMobileLayout: boolean;
  openGuide: () => void;
}) {
  const visibility = isOpen
    ? 'opacity-100 pointer-events-auto'
    : 'opacity-0 pointer-events-none';

  const layout = isMobileLayout
    ? 'col-start-1 row-start-1 fixed bg-green-900'
    : 'col-start-2 row-start-1 max-w-150 rounded-(--corner-radius) bg-(--bg)';

  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const uploadModelsRef = useRef<HTMLInputElement>(null);
  const uploadImagesRef = useRef<HTMLInputElement>(null);

  function handleUploadModelsClick() {
    uploadModelsRef.current?.click();
  }
  function handleUploadImagesClick() {
    uploadImagesRef.current?.click();
  }

  const [uploadedModels, setUploadedModels] = useState<File[]>([]);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);

  function handleModelsUploaded(event: React.ChangeEvent<HTMLInputElement>) {
    setUploadedModels(Array.from(event.target.files ?? []));
  }
  function handleImagesUploaded(event: React.ChangeEvent<HTMLInputElement>) {
    setUploadedImages(Array.from(event.target.files ?? []));
  }

  return (
    <form
      className={`z-23 h-full w-full p-(--global-padding) grid grid-rows-[1fr_3rem] gap-y-(--global-padding) self-center justify-self-center ${layout} ${visibility}`}
      autoComplete="off"
      method="POST"
      encType="multipart/form-data"
    >
      <div className="w-full h-full overflow-y-auto scrollbar-none">
        <div className="relative w-full h-fit h-min-0 flex flex-col gap-y-(--global-padding)">
          <div className="font-(family-name:--default-font) text-3xl text-(--font-col) text-center">
            Nový kroj
          </div>
          <CloseButton
            tailwind={'z-22 absolute right-0 top-0'}
            handleClick={closeUploadForm}
          />
          <input
            ref={nameRef}
            type="text"
            className="w-full h-10 bg-(--bg) p-(--global-padding) rounded-(--corner-radius) font-(family-name:--default-font) text-xl text-(--font-col)"
            name="name"
            placeholder="Název kroje"
            autoComplete="off"
            required
          />
          <input
            ref={descriptionRef}
            type="text"
            className="w-full h-10 bg-(--bg) p-(--global-padding) rounded-(--corner-radius) font-(family-name:--default-font) text-xl text-(--font-col)"
            name="description"
            placeholder="Popis kroje"
            autoComplete="off"
            required
          />
          <div className="h-10 w-full flex flex-row justify-around">
            <input
              ref={uploadModelsRef}
              onChange={handleModelsUploaded}
              type="file"
              className="hidden"
              name="partFiles"
              multiple
              accept=".glb"
              required
            />
            <button
              type="button"
              className="h-full w-fit bg-(--bg) pl-(--global-padding) pr-(--global-padding) rounded-(--corner-radius) font-(family-name:--default-font) text-xl text-(--font-col) text-center"
              onClick={handleUploadModelsClick}
            >
              Nahrát modely
            </button>
            <input
              ref={uploadImagesRef}
              onChange={handleImagesUploaded}
              type="file"
              className="hidden"
              name="Images"
              multiple
              accept=".jpg, .png, .jpeg"
            />
            <button
              type="button"
              className="h-full w-fit bg-(--bg) pl-(--global-padding) pr-(--global-padding) rounded-(--corner-radius) font-(family-name:--default-font) text-xl text-(--font-col) text-center"
              onClick={handleUploadImagesClick}
            >
              Nahrát obrázky
            </button>
          </div>
          <UploadedModels uploadedModels={uploadedModels}></UploadedModels>
          <UploadedImages uploadedImages={uploadedImages}></UploadedImages>
        </div>
      </div>
      <FormButtons
        resetForm={() => {
          setUploadedModels([]);
          setUploadedImages([]);
          if (uploadModelsRef.current) uploadModelsRef.current.value = '';
          if (uploadImagesRef.current) uploadImagesRef.current.value = '';
          if (nameRef.current) nameRef.current.value = '';
          if (descriptionRef.current) descriptionRef.current.value = '';
        }}
        openGuide={openGuide}
      />
    </form>
  );
}

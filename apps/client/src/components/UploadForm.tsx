import { useRef, useState, type Dispatch, type SetStateAction } from 'react';
import CloseButton from './CloseButton';
import {
  useActiveCostume,
  usePreviewContext,
  type PreviewContextType,
  useSetIsLoadingContext,
} from '../Contexts';
import type {
  ActiveCostume,
  CostumeFormElement,
  Part,
  PartToggle,
  StatusState,
} from '../types';

const TOTAL_FILE_LIMIT = 150;
const API = 'http://localhost:3000/api';

function FormButtons({
  resetForm,
  openGuide,
  previewCostume,
}: {
  resetForm: () => void;
  openGuide: () => void;
  previewCostume: () => void;
}) {
  return (
    <div className="w-full h-full flex justify-around">
      <button
        className="bg-(--bg) pl-(--global-padding) pr-(--global-padding) rounded-(--corner-radius) font-(family-name:--default-font) text-xl text-red-600 text-center"
        onClick={resetForm}
        type="button"
      >
        Zrušit
      </button>
      <button
        className="bg-(--bg) pl-(--global-padding) pr-(--global-padding) rounded-(--corner-radius) font-(family-name:--default-font) text-xl text-(--font-col) text-center"
        onClick={openGuide}
        type="button"
      >
        Návod
      </button>
      <button
        className="bg-(--bg) pl-(--global-padding) pr-(--global-padding) rounded-(--corner-radius) font-(family-name:--default-font) text-xl text-(--font-col) text-center"
        onClick={previewCostume}
        type="button"
      >
        Náhled
      </button>
      <button
        className="bg-(--bg) pl-(--global-padding) pr-(--global-padding) rounded-(--corner-radius) font-(family-name:--default-font) text-xl text-green-600 text-center"
        type="submit"
      >
        Nahrát
      </button>
    </div>
  );
}

function UploadedModels({ uploadedModels }: { uploadedModels: File[] }) {
  const models = [];

  for (let i = 0; i < uploadedModels.length; i++) {
    models.push(
      <input
        type="text"
        className="w-full h-10 bg-(--bg) rounded-(--corner-radius) p-(--global-padding) font-(family-name:--default-font) text-xl text-(--font-col)"
        name="partNames"
        placeholder={uploadedModels[0].name}
        autoComplete="off"
        required
        key={i}
      />,
    );
  }

  return models.map((model) => model);
}

function UploadedImages({ uploadedImages }: { uploadedImages: File[] }) {
  const images = [];
  for (let i = 0; i < uploadedImages.length; i++) {
    images.push(
      <div
        className="w-full h-fit flex flex-col gap-y-(--global-padding) p-(--global-padding) bg-(--bg) rounded-(--corner-radius)"
        key={i}
      >
        <img src={URL.createObjectURL(uploadedImages[i])} alt="Image Missing" />
        <input
          type="text"
          className="w-full h-10 bg-(--bg) p-(--global-padding) font-(family-name:--default-font) text-xl text-(--font-col)"
          name="imageNames"
          placeholder={uploadedImages[i].name}
          autoComplete="off"
          required
        />
      </div>,
    );
  }

  return (
    <div className="w-full h-fit grid grid-cols-2 gap-(--global-padding)">
      {images.map((image) => image)}
    </div>
  );
}

function checkSubmitSize(form: CostumeFormElement) {
  const partFiles = form.elements.partFiles.files;
  const images = form.elements.images.files;
  let fileSize = 0;

  if (partFiles) {
    for (let i = 0; i < partFiles.length; i++) {
      fileSize += partFiles[i].size / 1024 / 1024;
    }
  }

  if (images) {
    for (let i = 0; i < images.length; i++) {
      fileSize += images[i].size / 1024 / 1024;
    }
  }

  return fileSize;
}

async function submitForm(
  form: React.SubmitEvent<CostumeFormElement>,
  closeUploadForm: () => void,
  openStatus: () => void,
  closeStatus: () => void,
  resetForm: () => void,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setStatus: Dispatch<SetStateAction<StatusState>>,
) {
  form.preventDefault();
  const formTarget = form.currentTarget as CostumeFormElement;
  closeUploadForm();
  setIsLoading(true);

  const fileSize = checkSubmitSize(formTarget);

  if (fileSize > TOTAL_FILE_LIMIT) {
    setIsLoading(false);
    setStatus({ tailwind: 'text-red-600', text: 'File size limit exceeded' });
    openStatus();

    setTimeout(() => {
      closeStatus();
    }, 4000);

    return -1;
  }

  const formData = new FormData(formTarget);
  const response = await fetch(`${API}/newCostume`, {
    method: 'POST',
    body: formData,
  });

  const responseData = await response.json();

  setIsLoading(false);

  // multer error
  if (!response.ok) {
    setStatus({ tailwind: 'text-red-600', text: 'File size limit exceeded' });
    openStatus();

    setTimeout(() => {
      closeStatus();
    }, 4000);

    return -1;
  }

  // success
  if (typeof responseData !== 'undefined') {
    setStatus({ tailwind: 'text-green-600', text: 'Uploaded successfully' });
    openStatus();

    setTimeout(() => {
      resetForm();
      closeStatus();
    }, 2000);
  }

  return 1;
}

function previewCostume(
  partFiles: FileList | null | undefined,
  previewContext: PreviewContextType,
  setActiveCostume: Dispatch<SetStateAction<ActiveCostume>>,
) {
  if (!partFiles || partFiles.length === 0) return;
  const partToggles: PartToggle[] = [];
  const partElements: Part[] = [];

  for (let i = 0; i < partFiles.length; i++) {
    partToggles.push({ partID: i, isActive: true });
    partElements.push({ partID: i, name: '' + i });
  }

  const costumePreview: ActiveCostume = {
    partToggles,
    images: [],
    costume: {
      costumeID: -1,
      name: 'Preview',
      description: 'Preview',
      thumbnailImageID: null,
    },
    parts: partElements,
  };

  previewContext.setPreview({
    previewParts: partFiles,
    reloadPreview: true,
    paths: [],
  });
  setActiveCostume(costumePreview);
}

export default function UploadForm({
  isOpen,
  closeUploadForm,
  isMobileLayout,
  openGuide,
  openStatus,
  closeStatus,
  setStatus,
}: {
  isOpen: boolean;
  closeUploadForm: () => void;
  isMobileLayout: boolean;
  openGuide: () => void;
  openStatus: () => void;
  closeStatus: () => void;
  setStatus: Dispatch<SetStateAction<StatusState>>;
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
  const setIsLoading = useSetIsLoadingContext();
  const setActiveCostume = useActiveCostume().setActiveCostume;
  const previewContext = usePreviewContext();

  function handleModelsUploaded(event: React.ChangeEvent<HTMLInputElement>) {
    setUploadedModels(Array.from(event.target.files ?? []));
  }
  function handleImagesUploaded(event: React.ChangeEvent<HTMLInputElement>) {
    setUploadedImages(Array.from(event.target.files ?? []));
  }

  function resetForm() {
    setUploadedModels([]);
    setUploadedImages([]);
    if (uploadModelsRef.current) uploadModelsRef.current.value = '';
    if (uploadImagesRef.current) uploadImagesRef.current.value = '';
    if (nameRef.current) nameRef.current.value = '';
    if (descriptionRef.current) descriptionRef.current.value = '';
  }

  return (
    <form
      className={`z-23 h-full w-full p-(--global-padding) grid grid-rows-[1fr_3rem] gap-y-(--global-padding) self-center justify-self-center ${layout} ${visibility}`}
      autoComplete="off"
      method="POST"
      encType="multipart/form-data"
      onSubmit={async (e: React.SubmitEvent<CostumeFormElement>) => {
        submitForm(
          e,
          closeUploadForm,
          openStatus,
          closeStatus,
          resetForm,
          setIsLoading,
          setStatus,
        );
      }}
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
              name="images"
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
        resetForm={() => resetForm()}
        openGuide={openGuide}
        previewCostume={() =>
          previewCostume(
            uploadModelsRef.current?.files,
            previewContext,
            setActiveCostume,
          )
        }
      />
    </form>
  );
}

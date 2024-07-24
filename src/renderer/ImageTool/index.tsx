import React, { useCallback, useEffect } from 'react';
import { useAtom } from 'jotai';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableCard from './DraggableCard';
import { SaveableFile, ViewMode } from '../types';
import ViewSwitcher from './ViewSwitcher';
import ClearAllIcon from '../icons/ClearAllIcon';
import IconButton from './IconButton';
import FileDropzone from './FileDropzone';
import { currentImagesAtom, settingsAtom } from '../atoms';
import { Channels } from '../../channels';

export default function ImageTool() {
  const [images, setImages] = useAtom(currentImagesAtom);

  const [settings, setSettings] = useAtom(settingsAtom);

  useEffect(() => {
    // Create initial image slots
    const initialImages = Array.from(
      { length: settings.numImageSlots },
      (_, i) => ({
        id: i,
        file: null,
      }),
    );
    setImages(initialImages);
  }, [setImages, settings.numImageSlots]);

  const handleDrop = (files: File[]) => {
    const newImages = [...images];

    files.forEach((file) => {
      const newFile: SaveableFile = file as SaveableFile;
      newFile.url = URL.createObjectURL(file);
      const newIndex = newImages.findIndex((image) => !image.file);
      const copy = { ...newImages[newIndex] };
      copy.file = newFile;
      newImages[newIndex] = copy;
    });

    setImages(newImages);
  };

  const moveImage = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = images[dragIndex];
      const hoverCard = images[hoverIndex];
      const newImages = [...images];
      newImages[dragIndex] = hoverCard;
      newImages[hoverIndex] = dragCard;
      setImages(newImages);
    },
    [images, setImages],
  );

  const handleViewModeChange = (mode: ViewMode) => {
    setSettings({ ...settings, viewMode: mode });
  };

  const handleClearAll = () => {
    const newImages = images.map((image) => ({ ...image, file: null }));
    setImages(newImages);
  };

  const ftpTest = () => {
    console.log(images);
    const filePaths = images.map((image) => image.file?.url).filter(Boolean);
    console.log(filePaths);
    window.electron.ipcRenderer.sendMessage(Channels.UPLOAD_FTP, filePaths);
  };

  return (
    <div
      className="group container mx-auto p-4"
      data-view-mode={settings.viewMode}
    >
      <div className="flex">
        <ViewSwitcher
          viewMode={settings.viewMode}
          onViewChange={handleViewModeChange}
        />
        <IconButton
          name="clear-all"
          onClick={handleClearAll}
          className="text-gray-500 hover:text-black ml-auto"
        >
          <ClearAllIcon />
        </IconButton>
      </div>
      <button type="button" onClick={ftpTest}>
        FTP
      </button>
      <form>
        <FileDropzone onDrop={handleDrop} />
        <DndProvider backend={HTML5Backend}>
          <div
            className="
                grid grid-cols-3 grid-rows-auto
                group-data-[view-mode=list]:grid-cols-1
              "
          >
            {images.map((image, index) => (
              <DraggableCard
                key={image.id}
                image={image}
                index={index}
                id={image.id}
                onMove={moveImage}
              />
            ))}
          </div>
        </DndProvider>
      </form>
    </div>
  );
}

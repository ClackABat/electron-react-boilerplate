import React, { useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import FileDropzone from './FileDropzone';
import DraggableCard from './DraggableCard';
import { Image, SaveableFile, ViewMode } from '../types';
import ViewSwitcher from './ViewSwitcher';
import ClearAllIcon from '../icons/ClearAllIcon';
import IconButton from './IconButton';

const DEFAULT_NUMBER_PLACEMENTS = 15;
const IMAGE_PLACEMENTS = Array.from(Array(DEFAULT_NUMBER_PLACEMENTS).keys());

export default function ImageTool() {
  const [images, setImages] = React.useState<Image[]>(
    IMAGE_PLACEMENTS.map((id) => ({ file: null, id })),
  );

  const [viewMode, setViewMode] = React.useState<ViewMode>(ViewMode.Grid);

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
    [images],
  );

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
  };

  const handleClearAll = () => {
    const newImages = images.map((image) => ({ ...image, file: null }));
    setImages(newImages);
  };

  return (
    <div className="group container mx-auto p-4" data-view-mode={viewMode}>
      <div className="flex">
        <ViewSwitcher viewMode={viewMode} onViewChange={handleViewModeChange} />
        <IconButton
          name="clear-all"
          onClick={handleClearAll}
          className="text-gray-500 hover:text-black ml-auto"
        >
          <ClearAllIcon />
        </IconButton>
      </div>
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

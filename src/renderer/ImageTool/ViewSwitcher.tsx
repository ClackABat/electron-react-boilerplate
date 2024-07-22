import React from 'react';
import { ViewMode } from '../types';
import GridViewIcon from '../icons/GridViewIcon';
import ListViewIcon from '../icons/ListViewIcon';
import IconButton from './IconButton';

export type ViewSwitcherProps = {
  viewMode: ViewMode;
  onViewChange: (view: ViewMode) => void;
};

export default function ViewSwitcher(props: ViewSwitcherProps) {
  const { viewMode, onViewChange } = props;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const view = event.currentTarget.name as ViewMode;
    onViewChange(view);
  };

  return (
    <div>
      <IconButton
        onClick={handleClick}
        name={ViewMode.Grid}
        className="text-gray-500 hover:text-black group-data-[view-mode=grid]:text-black"
      >
        <GridViewIcon />
      </IconButton>
      <IconButton
        onClick={handleClick}
        name={ViewMode.List}
        className="text-gray-500 hover:text-black group-data-[view-mode=list]:text-black"
      >
        <ListViewIcon />
      </IconButton>
      {/* <button
        className="text-gray-500 hover:text-black group-data-[view-mode=grid]:text-black"
        type="button"
        onClick={handleClick}
        name={ViewMode.Grid}
      >
        <span className="hidden">Grid</span>
        <GridViewIcon />
      </button> */}
      {/* <button
        className="text-gray-500 hover:text-black group-data-[view-mode=list]:text-black"
        type="button"
        onClick={handleClick}
        name={ViewMode.List}
      >
        <span className="hidden">List</span>
        <ListViewIcon />
      </button> */}
    </div>
  );
}

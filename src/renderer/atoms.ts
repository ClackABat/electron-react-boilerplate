import { atom } from 'jotai';
import { AppSettings, Image, ViewMode } from './types';

export const settingsAtom = atom<AppSettings>({
  viewMode: ViewMode.Grid,
  numImageSlots: 15,
});

export const currentImagesAtom = atom<Image[]>([]);

export type SaveableFile = File & { url: string | null };
export type Image = {
  id: number;
  file: SaveableFile | null;
};

export enum ViewMode {
  Grid = 'grid',
  List = 'list',
}

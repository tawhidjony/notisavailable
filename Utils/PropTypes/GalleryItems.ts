export type MediaListType = {
  url: string;
  name: string;
  media_type: string;
}

export default interface IGalleryItem {
  getSelectedItem: (item: MediaListType) => void;
}
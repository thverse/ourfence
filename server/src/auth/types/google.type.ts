interface GoogleProfile {
  displayName: string;
  emails: { value: string }[];
  photos: { value: string }[];
  id: string;
  provider: string;
}

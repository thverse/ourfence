interface GoogleProfile {
  displayName: string;
  name: {
    givenName: string;
    familyName: string;
  };
  emails: { value: string }[];
  photos: { value: string }[];
  id: string;
  provider: string;
}

export type { GoogleProfile };

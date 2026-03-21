export interface MapPresetOverlay {
  url: string;
  attribution: string;
}

export interface MapPreset {
  id: string;
  name: string;
  desc: string;
  url: string;
  attribution: string;
  overlay?: MapPresetOverlay;
}

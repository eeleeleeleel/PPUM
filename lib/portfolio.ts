const PHOTO_COUNT = 24;

export const portfolioPhotos = Array.from({ length: PHOTO_COUNT }, (_, i) => ({
  src: `/portfolio/${String(i + 1).padStart(2, "0")}.jpg`,
  alt: `temps. portfolio ${i + 1}`,
  width: 1280,
  height: 1600,
}));

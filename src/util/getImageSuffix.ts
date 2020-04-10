function getImageSuffix() {
  const dataURL = document.createElement('canvas').toDataURL('image/webp', 0.5);

  return ~dataURL.indexOf('image/webp') ? '@480w_300h.webp' : '';
}

export { getImageSuffix };

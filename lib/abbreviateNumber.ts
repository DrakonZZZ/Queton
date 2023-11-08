export const abbreviateNumber = (data: number): string => {
  if (data < 1000) {
    return data.toString();
  } else if (data < 1000000) {
    return (data / 1000).toFixed(1) + 'K';
  } else {
    return (data / 1000000).toFixed(1) + 'M';
  }
};

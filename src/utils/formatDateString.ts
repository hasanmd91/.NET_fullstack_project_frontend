export const formatDateString = (dateString: string): string => {
  const originalDate = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };

  return new Intl.DateTimeFormat('en-US', options).format(originalDate);
};

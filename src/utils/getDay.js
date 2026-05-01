export const getDayName = (dateStr) => {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('fr-FR', { weekday: 'long' }).format(date);
};

export const getFormattedDay = (dateStr) => {
  if (!dateStr) return '';
  const dayName = getDayName(dateStr);
  return dayName.charAt(0).toUpperCase() + dayName.slice(1);
};
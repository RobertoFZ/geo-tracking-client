import staticColors from 'shared/constants/staticColors';

export function getUserToken() {
  throw new Error('Implement logic');
}

export function getRandomColor(usedColors: string[] = []): string {
  const randomNumber = Math.floor(Math.random() * staticColors.length - 1);
  let color = staticColors[randomNumber];
  if (usedColors.find((usedColor: string) => color === usedColor)) {
    return getRandomColor(usedColors);
  }
  return color;
}

export function getGoogleMapMarkerWithColor(color: string) {
  return `https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=•|${color.replace('#', '')}`
}

import Item from '../types/item';

export default function sortItemsByViews(
  { views: a }: Item,
  { views: b }: Item,
): -1 | 0 | 1 {
  if (a < b) {
    return 1;
  }
  if (a > b) {
    return -1;
  }
  return 0;
}

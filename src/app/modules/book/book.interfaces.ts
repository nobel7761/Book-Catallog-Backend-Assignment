export type IBookFilterRequest = {
  search?: string | undefined;
  author?: string | undefined;
  genre?: string | undefined;
  category?: string | undefined;
  minPrice?: string | undefined;
  maxPrice?: string | undefined;
};

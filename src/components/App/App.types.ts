export interface Image {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
}

export interface ApiResponse {
  results: Image[];
  total: number;
  total_pages: number;
}

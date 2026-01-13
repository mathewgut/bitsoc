export interface BluditResponse {
  status: string;
  message: string;
  data: CategoryData;
}

export interface BluditScheduledResponse {
    status:string;
    message:string;
    numberOfITems: number;
    data:BluditPage[]
}

export interface CategoryData {
  key: string;
  name: string;
  description: string;
  permalink: string;
  pages: BluditPage[];
}

export interface BluditPage {
  key: string;
  title: string;
  content: string;
  contentRaw: string;
  description: string;
  type: "published" | "draft" | "static" | "sticky"; 
  slug: string;
  date: string;
  dateRaw: string;
  tags: string | string[];
  username: string;
  category: string;
  uuid: string;
  dateUTC: string;
  permalink: string;
  coverImage: string | boolean;
  coverImageFilename: string | boolean;
}
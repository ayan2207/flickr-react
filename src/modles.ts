export interface Media {
  m: string;
}

export interface Item {
  title: string;
  link: string;
  media: Media;
  date_taken: string;
  description: string;
  published: string;
  author: string;
  author_id: string;
  tags: string;
}

export interface Feed {
  title: string;
  link: string;
  description: string;
  modified: string;
  generator: string;
  items: Item[];
}

export interface FeedRootObject {
  feed: Feed;
}

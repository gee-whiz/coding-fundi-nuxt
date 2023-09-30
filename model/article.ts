import Author from "./author";

export default class Article {
    id: string;
    title: string;
    subtitle: string;
    author: Author;
    datePublished: string;
    content: any;
    imageURL: string;
  
    constructor(
      id: string,
      title: string,
      subtitle: string,
      author: Author,
      datePublished: string,
      content: any,
      imageURL: string
    ) {
      this.id = id;
      this.title = title;
      this.subtitle = subtitle;
      this.author = author;
      this.datePublished = datePublished;
      this.content = content;
      this.imageURL = imageURL;
    }
  }

  

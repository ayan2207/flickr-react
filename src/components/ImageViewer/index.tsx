import * as React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faTags } from "@fortawesome/fontawesome-free-solid";
import { Item } from "../../modles";
const styles = require("./style.scss");

export enum ImageViewerModes {
  image = "image",
  detail = "detail"
}

interface ImageViewerProps {
  title: string;
  images: Item[];
  mode: ImageViewerModes;
}

interface ImageViewerState {}
/**
 * Image feed viewer
 * @class ImageViewer
 * @extends {React.Component<ImageViewerProps, ImageViewerProps>}
 */
class ImageViewer extends React.Component<ImageViewerProps, ImageViewerProps> {
  public render(): JSX.Element {
    function createMarkup(markup: string) {
      return { __html: markup };
    }

    // TODO: Move to seperate component
    // Renders each image item while formatting titles and usernames for better viewing
    // purposes.
    let renderImages = this.props.images.map((image: Item, index: number) => {
      var imageAuthor: any[] | null = image.author.match(/"[^"]*"/);
      let imageAuthorFormatted = imageAuthor ? (imageAuthor[0].length > 13 ? `${image.title.substring(0, 13)}...` : imageAuthor[0]) : null;
      const imageTitleFormatted = image.title.length > 13 ? `${image.title.substring(0, 13)}...` : image.title;
      const hasTitle = image.title.trim().length > 0;
      let tags: string[] = image.tags.split(" ");
      tags = tags.filter(i => i.length > 0);
      const itemImage: React.CSSProperties = {
        backgroundImage: `url(${image.media.m})`
      };
      const renderTags = tags.map((tag: string, tagIndex: number) => {
        if (tagIndex < 4) {
          return <div key={tagIndex}>{tag}</div>;
        } else if (tagIndex === 4) {
          return <div key={tagIndex}>{tags.length - 4} more...</div>;
        } else {
          return null;
        }
      });
      return (
        <div key={index} style={{ paddingBottom: this.props.mode === ImageViewerModes.image ? "0px" : null }} className={styles.item}>
          <div style={{ ...itemImage }} className={styles.image} />

          {this.props.mode === ImageViewerModes.detail
            ? [
                <div key={1} className={styles.details}>
                  <div className={styles.title}>
                    <a title={image.title} href={image.link} target="blank" className={styles.authorName}>
                      {hasTitle ? imageTitleFormatted : "No Title"}
                    </a>
                    <span>by</span>
                    <a title={imageAuthorFormatted} href={`https://www.flickr.com/people/${image.author_id}`} target="blank" className={styles.authorName}>
                      {imageAuthorFormatted}
                    </a>
                  </div>
                  <div className={styles.description} dangerouslySetInnerHTML={createMarkup(image.description)} />
                </div>,
                tags.length > 0 ? (
                  <div key={2} className={styles.meta}>
                    <div className={styles.metaIcon}>
                      <FontAwesomeIcon icon={faTags} />
                    </div>
                    <div className={styles.tags}>{renderTags}</div>
                  </div>
                ) : null
              ]
            : null}
        </div>
      );
    });

    return (
      <div className={styles.imageViewerWrapper}>
        <div className={styles.imageViewerHeader}>{this.props.title}</div>
        {this.props.images.length === 0 ? <div className={styles.alertBox}>No images to display...</div> : <div className={styles.imageViewer}>{renderImages}</div>}
      </div>
    );
  }
}

export default ImageViewer;

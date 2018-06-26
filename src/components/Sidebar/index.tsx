import * as React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faImage, faInfoCircle } from "@fortawesome/fontawesome-free-solid";
import { ImageViewerModes } from "../ImageViewer";
const styles = require("./style.scss");

interface SidebarProps {
  items: any[];
  setMode(mode: ImageViewerModes): void;
}

interface SidebarState {}
/**
 * Sidebar component
 * @class Sidebar
 * @extends {React.Component<SidebarProps, SidebarState>}
 */
class Sidebar extends React.Component<SidebarProps, SidebarState> {
  public render(): JSX.Element {
    return (
      <div className={styles.sidebarItems}>
        <div className={styles.appIcon}>
          <img src={"/assets/images/fickr-icon.svg"} alt="" />
        </div>
        <div className={styles.icon} onClick={() => this.props.setMode(ImageViewerModes.image)}>
          <FontAwesomeIcon icon={faImage} />
        </div>
        <div className={styles.icon} onClick={() => this.props.setMode(ImageViewerModes.detail)}>
          <FontAwesomeIcon icon={faInfoCircle} />
        </div>
      </div>
    );
  }
}

export default Sidebar;

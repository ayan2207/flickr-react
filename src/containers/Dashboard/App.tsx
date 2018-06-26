import * as React from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";

const styles = require("./App.scss");

import "bootstrap/dist/css/bootstrap.css";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faSpinner, faTags, faFont, faImage, faInfoCircle } from "@fortawesome/fontawesome-free-solid";
import { GetFeed } from "./actions";
import ImageViewer, { ImageViewerModes } from "../../components/ImageViewer";
import { Feed, Item } from "../../modles";
import Sidebar from "../../components/Sidebar";
require("!style-loader!css-loader!bootstrap/dist/css/bootstrap.css");

interface AppProps {
  isLoading: boolean;
  GetFeed(): Promise<any>;
}

interface AppState {
  isLoading: boolean;
  lastFetchTime: any;
  images: Item[];
  filterResult: Item[];
  tagFilter?: string[];
  userFilter?: string[];
  searchFilter?: string;
  mode?: ImageViewerModes;
}
/**
 * Main app component which renders all child components and
 * holds the state of the application
 * @class App
 * @extends {React.Component<AppProps, AppState>}
 */
class App extends React.Component<AppProps, AppState> {
  state: AppState = {
    isLoading: true,
    lastFetchTime: null,
    images: [],
    filterResult: [],
    searchFilter: "",
    mode: ImageViewerModes.detail
  };

  componentDidMount() {
    this.props.GetFeed().then((response: Feed) => {
      if (response) {
        this.populatePage(response.items);
      }
    });
    document.addEventListener("scroll", this.trackScrolling);
  }
  /**
   * Used to populate a collection of feed items in the state
   * @param {Item[]} data
   * @param {boolean} isNextPage
   */
  populatePage = (data: Item[], isNextPage?: boolean) => {
    if (data) {
      this.props.GetFeed().then((response: Feed) => {
        this.setState({ images: isNextPage ? this.state.images.concat(data) : response.items, isLoading: false });
      });
    }
  };
  /**
   * Function to handle user search input. Filters feed by matching title of image.
   * @param {string} searchfilter
   */
  handleSearch = (searchfilter: string): void => {
    const { searchFilter } = this.state;
    if (searchFilter && searchFilter.length > 0) {
      let filterdImages = this.state.images.filter(i => i.title.toLowerCase().includes(searchfilter.toLowerCase()));
      this.setState({ filterResult: filterdImages });
    }
  };

  componentWillUnmount() {
    document.removeEventListener("scroll", this.trackScrolling);
  }

  componentDidUpdate(nextProps: AppProps, nextState: AppState) {
    // Update the component everytime the searchFilter state changes in the state
    if (nextState.searchFilter && nextState.searchFilter !== this.state.searchFilter) {
      this.handleSearch(nextState.searchFilter);
    }
  }
  /**
   * Function to check if user has scrolled to an end of a given element
   * @param {*} element
   * @returns {Element}
   * @memberof App
   */
  isBottom(element: any) {
    return element.getBoundingClientRect().bottom <= window.innerHeight + 100;
  }
  /**
   * Method to set the viewing mode of the feed
   * @param {ImageViewerModes} mode
   */
  setMode = (mode: ImageViewerModes) => {
    this.setState({ mode: mode });
  };
  /**
   * Method which is called everytime a user scrolls.
   * @memberof App
   */
  trackScrolling = () => {
    const wrappedElement = document.getElementById("app-wrapper");
    let body = document.querySelector("body");
    if (this.isBottom(wrappedElement)) {
      this.props.GetFeed().then((response: Feed) => {
        this.populatePage(response.items, true);
      });
    }
  };

  render() {
    const { searchFilter } = this.state;
    return (
      <div id="app-wrapper" className={styles.App}>
        <div className={styles.headerWrapper}>
          <div className={styles.headerLeft}>
            <h1>Flickr Feed</h1>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.inputWrapper}>
              <input
                value={searchFilter}
                className={styles.input}
                type="search"
                id="feed-search"
                name="search-bar"
                placeholder="Search Feed"
                onChange={event => this.setState({ searchFilter: event.target.value })}
              />
              <div className={styles.searchIcon} onClick={() => this.setMode(ImageViewerModes.image)}>
                <FontAwesomeIcon icon={faImage} />
              </div>
              <div className={styles.searchIcon} onClick={() => this.setMode(ImageViewerModes.detail)}>
                <FontAwesomeIcon icon={faInfoCircle} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.appContainer}>
          <div className={styles.navWrapper}>
            <Sidebar items={[]} setMode={this.setMode} />
          </div>
          <div className={styles.contentWrapper}>
            {this.state.isLoading ? (
              <div className={styles.spinner}>
                <FontAwesomeIcon icon={faSpinner} spin={true} size="5x" />
              </div>
            ) : this.state.images && this.state.images.length > 0 ? (
              <ImageViewer
                title={`Public Feed`}
                images={!this.state.searchFilter || this.state.searchFilter.length === 0 ? this.state.images : this.state.filterResult}
                mode={this.state.mode ? this.state.mode : ImageViewerModes.detail}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
/**
 * Maps redux state to the props of this component
 * @param {*} state
 */
function mapStateToProps(state: any) {
  return {
    isLoading: state.globalState.isLoading,
    feed: state.globalState.feed
  };
}

export default connect(
  mapStateToProps,
  { GetFeed }
)(App);

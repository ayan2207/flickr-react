import axios, { AxiosResponse, AxiosError } from "axios";
import { GET_FEED_START, GET_FEED_DONE } from "./constants";
const fetchJsonp = require("fetch-jsonp");

const FEED_URL = "http://www.flickr.com/services/feeds/photos_public.gne?format=json";
/**
 * Redux action to create JSONP fetch request.
 * @export
 * @param {(string | string[])} [id]
 * @param {string[]} [tags]
 * @param {string} [lang]
 * @returns
 */
export function GetFeed(id?: string | string[], tags?: string[], lang?: string) {
  return function(dispatch: any, getState: any) {
    dispatch({ type: GET_FEED_START });
    return fetchJsonp(FEED_URL, {
      jsonpCallback: "jsoncallback",
      timeout: 3000
    })
      .then(function(response: any) {
        dispatch({ type: GET_FEED_DONE, payload: response.json() });
        return response.json();
      })
      .catch((err: any) => {
        console.log("error");
      });
  };
}

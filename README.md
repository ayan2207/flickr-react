***Ayan Hedayati***

**Get Started**

Run the following commands in the project directory

`npm install`

`npm start`

Open in browser:

`http://localhost:8080`

****

This project was bootstrapped with Facebook's [Create React App](https://github.com/facebook/create-react-app) project. It was cloned and "ejected" in-order to further customise and add the following features:

*  Typescript compiling
*  Redux state management
*  React Router - for navigation

The skeleton project is available on my [GitHub Page](https://github.com/ayan2207/webapp_template)


**Test Notes**

As time was a constraint doing this exercise there are many enhancements and functionalities that I could have added to make this a more complete application. The initial idea for this App was to develop a note taking tool for "shortlisted" properties.


**Problems i came across:**

I was trying to make API calls to the Purple Bricks API from within a browser and was hit with a CORS error. I used different libraries such as `axios` and `fetch` and tried to spoof the Origin host name but could not get through. 

Enabling Cross Origin Request on chrome got me a reply from the server with a 200OK but response body is always empty. All request were successful when made using Postman. To carry on with the test I copied over the response into a JSON object and used it as a fake API.



**Code structure**

In terms of code structure I would have liked to further separate DOM elements into their own components for better encapsulation of logic. For example the Gallery in what I called the Insight panel should be separated in its own component to take advantage of lifecycle methods and states.

**Styling**

The SCSS styling could be further improved further by handling different screen sizes for the listing items. Currently each item does not adjust to smaller screen sizes.


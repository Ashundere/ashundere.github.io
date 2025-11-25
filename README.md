# Url Shortening Landing Page

This page will shorten given urls using Bitly API.

### Description

Using Bitly API, this page will take a given input URL and shorten it to a Bitly url. It will also display both the original and the shortened url underneath the form. There you can copy the shortened url by pressing the copy button next to it. Even when refreshing the page, the previous urls can be accessed via sessionStorage.

## Getting Started

### Dependencies
node.js: https://nodejs.org/en

### Authors

Devon Jones
Github: [@Ashundere](https://github.com/Ashundere)

## Version History

0.1
-Initial Release


## Acknowledgments

JS MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript

W3Schools: https://www.w3schools.com/

Frontend Mentor: https://www.frontendmentor.io/challenges/url-shortening-api-landing-page-2ce3ob-G

Bitly Developer: https://dev.bitly.com/docs/getting-started/introduction/

## Reflection

I started out by doing the html and css portion first to make sure that it was looking like it should. I did this because I struggle more with the front-end than the back-end and wanted to ensure that I had time to finish. Once the front-end looked good, I started working on the back-end. The first thing that I did was make sure that I could grab what I needed from the API. I went to the Bitly Dev Docs and read what I needed to do to get the information I needed. Then I wrote up the function to grab from the API. Afterwards, I wrote the function to create the div that displays the url under the form. The only real trouble I had was some div placements and getting the url divs to show up. I realized belately that I had made the list display div display none in html file, but was able to fix that fairly easily. And for copying to clipboard, I realized I couldn't grab the innerText of the closes div to the copy button as I originally had planned, because the long form url was part of the innerText as well. So I ended up having to grab it from the original object via object id instead. As far as I can tell this is working, but I ran out of monthly links and have no idea if it is copying 100% correctly. 
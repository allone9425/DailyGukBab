# 데일리국밥

## Description

전국의 국밥 맛집을 검색하고, 지역이나 평점에 따라 필터링하고 해당 국밥집에 대한 댓글을 남길 수 있는 서비스를 제공하는 웹 앱 입니다.

### Features

- Client State management using RTK
- Server State management using Tanstack React-Query
- Asynchronous networking with server using redux thunk
- Fetch restaurants' information from firebase/firestore
- Draw a map with markers of fetched restaurants on it
- Create a card list of restaurants with fetched information
- Filter Restaurants in current card list under two conditions
  - location
  - Reputation
- Perform searching operations based on
  - location
  - menu name(soup's name in particular)
  - restaurant's name
- Perform CRUD operations on comments of a certain restaurant's detail page

### Dependencies

- React
  - `react`
  - `react-dom`
- Routing
  - `react-router-dom`
- State Management
  - `@tanstack/react-query`
  - `@tanstack/react-query-devtools`
  - `redux`
  - `react-redux`
  - `@reduxjs/toolkit`
- Firebase
  - `firebase`
  - `@firebase/firestore`
- Kakao Map API
  - `react-kakao-maps-sdk`
- Data Scraping
  - `puppeteer`
  - `express`
- Miscellaneous
  - `styled-components`
  - `dayjs`
  - `react-icons`
  - `uuid`

### File tree

```
📦src
 ┣ 📂api
 ┃ ┣ 📜comments.js
 ┃ ┗ 📜places.js
 ┣ 📂assets
 ┣ 📂components
 ┃ ┣ 📜Card.jsx
 ┃ ┣ 📜CardFilter.jsx
 ┃ ┣ 📜CardList.jsx
 ┃ ┣ 📜Comment.jsx
 ┃ ┣ 📜CommentForm.jsx
 ┃ ┣ 📜CommentsList.jsx
 ┃ ┣ 📜FilteredCardList.jsx
 ┃ ┣ 📜Header.jsx
 ┃ ┣ 📜MapWrapper.jsx
 ┃ ┗ 📜SearchBar.jsx
 ┣ 📂data
 ┃ ┗ 📜filterArrays.js
 ┣ 📂hooks
 ┃ ┣ 📜useComments.js
 ┃ ┣ 📜useFilterMarkers.js
 ┃ ┣ 📜useMarker.js
 ┃ ┣ 📜useMarkerFromFirebase.jsx
 ┃ ┗ 📜useMarkerFromKakao.jsx
 ┣ 📂layout
 ┃ ┗ 📜Layout.jsx
 ┣ 📂pages
 ┃ ┣ 📜Detail.jsx
 ┃ ┣ 📜Home.jsx
 ┃ ┗ 📜Router.jsx
 ┣ 📂redux
 ┃ ┣ 📂config
 ┃ ┃ ┗ 📜configStore.js
 ┃ ┗ 📂modules
 ┃ ┃ ┣ 📜filterSlice.js
 ┃ ┃ ┣ 📜markerSlice.js
 ┃ ┃ ┣ 📜searchSlice.js
 ┃ ┃ ┗ 📜templateSlice.js
 ┣ 📂styled
 ┃ ┗ 📜GlobalStyle.js
 ┣ 📜App.jsx
 ┣ 📜App.test.js
 ┣ 📜db.json
 ┣ 📜firebase.js
 ┣ 📜index.css
 ┣ 📜index.js
 ┣ 📜logo.svg
 ┣ 📜reportWebVitals.js
 ┣ 📜setupProxy.js
 ┗ 📜setupTests.js
```

### Usage

1. `git clone` : clone repository
3. `npm install`, `yarn install` : install dependencies modules from `package.json`
2. create `.env.local` and populate it: bundle API keys and other information
4. `npm run start`, `yarn start` : open page in development server(localHost)

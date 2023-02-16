# News listing project

This is a task given by Profico company for a frontend developer role.

## Built with

- Semantic HTML5 markup
- SASS/SCSS
- Flexbox, Grid
- React
- Axios

### Design decisions

- I have used NewsAPI for fetching articles, mainly because it seemed more simple to use, I only needed to manually add category in every article.

- Every category except Favorites makes API call to other endpoint, Favorites are stored in local storage, and I also added Search category.

- Latest news widget has infinite scroll funcionality, it fetches 10 more articles when the last item enters the screen. I used react-intersection-observer package to trigger async call.

- Search form triggers API call only on submit event, when Search button is pressed. That's why I added Search button on mobile screen and on PhoneModal component.

- Selecting and article leads to original news page.

### Things to improve

- Implementing SingleArticle component instead of redirecting to external link.

- Fetching data on "change" event instead of "submit" event in search form. It would be good to use deBounce function in that case, to unnecessary API calls.

- Adding loading spinner and error messages.

- Getting rid of API call when new bookmark is added. In this version adding bookmark triggers useEffect hook, which makes a new API call that isn't necessary.

- Using React Router instead of app state.

- Adding animations on Route changes.

- See all news button doesn't do anything at the moment. It should fetch all of the latest news.

- Making a version with Material UI library and TypeScript.



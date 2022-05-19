# FsWD 64 - Final exam

## Student
#### Student ID: 
#### Name (TH): 

## Demo
- [Twitter clone](https://fswd64.devnss.com)
- [GraphQL playground](https://api.fswd64.devnss.com/graphql)

## Requirements
- Login page (/login)
  - Login with username and password
  - Show error message if user not found or incorrect password
- Register page (/register)
  - Register with fullname, username and password
  - Show error message if duplicate username
- Feed page (/feed)
  - Create new tweet
  - Display tweet feed
  - Tweet display text, retweets count, likes count and user info
  - Tweet actions retweet and like
- Profile page (/:username)
  - Display user detail, tweets count, following count, followers count and tweets
  - Follow button if user not follow this profile
  - Unfollow button if user followed this profile
  - Tweet display text, retweets count, likes count and user info
  - Tweet actions retweet and like

## Start development
- Pull code from this repo
- Create new branch with name `feat/YOUR_STUDENT_ID`
### web
- Create `.env` file from `.env.example`
- Install dependencies
- Start development server using command `yarn start`
- Web should run on port `3000`
- Implement all comment start with `WEB: Implement`
### api
- Create `.env` file from `.env.example`
- Install dependencies
- Start development server useing command `yarn dev`
- Initial database data using command `yarn seed`
- API should run on port `3001`
- Implement all comment start with `API: Implement`
### test
- Install dependencies
- Start testing using command `yarn test`
- After Cypress app running click `final-exam.spec.ts`
- Cypress will start Chrome fro testing all test case

## Test cases
- Login page
  - Input and state working correctly
  - Login button enabled/disabled working correctly
  - Login success redirect to Feed page correctly
  - Show error message when login failed correctly
  - Register button redirect to Register page correctly
- Register page
  - Input and state working correctly
  - Register button enabled/disabled working correctly
  - Register success redirect to Login page correctly
  - Show error message when register failed correctly
  - Login button redirect to Login page correctly
- Feed page
  - New tweet input, state and text length working correctly
  - Tweet button enabled/disabled working correctly
  - Tweet success display new tweet correctly
  - Feed display Tweets correctly
  - Tweet content, user info and actions display correctly
  - Retweet success display new tweet correctly
  - Like success display tweets correctly
  - Unlike success display tweets correctly
- Profile page
  - Profile info display correctly
  - Follow/Unfollow success display correctly
  - User tweets display correctly
  - Tweet content, user info and actions display correctly
  - Retweet success display new tweet correctly
  - Like success display tweets correctly
  - Unlike success display tweets correctly

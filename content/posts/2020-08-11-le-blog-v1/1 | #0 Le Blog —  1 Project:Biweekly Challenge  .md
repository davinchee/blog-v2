---
title: 0. Le Blog - 1 Project/Biweekly Challenge
author: Vincent Chee
date: 2020-08-11
hero: ./images/hero.jpg
excerpt: The first project.
---

tl;dr

the final products:

[Blog Front End](https://github.com/davinchee/blog-frontend)

[Blog Back End](https://github.com/davinchee/blog-backend)

Hey there! I know this article is a little late, but I just wanted to provide a quick update on some changes I am going to making to these series and the blog I planned on making two weeks ago. Firstly, I think I will be extending the time for these projects from one to two weeks. I want to be able to give myself enough time to learn, and also enough time to push something out there which I’m proud of. Secondly, the blog took a bit longer to finish than expected. But anyways, a quick run down on the high level steps which I went over to create this-I don’t want to get into too many specifics in this article so this is as language-agnostic as possible. I plan on writing articles in a way that if you read this article and Google how to do the “high-level” things I lay out, you will be able to create the same thing with minimal hand holding (the best way to learn is to struggle a bit).

**Note: this article assumes that you have some experience with coding and that you possess the ability to go out and search for things.**

### Planning

Before starting out on any project, you should definitely spend some time planning. The bigger and more complex a project, the more time you want to spend planning it out. This project was very simple and everything was fairly straightforward and simple. So I didn’t spend too much time planning this. Nonetheless, this is the a condensed version of the process I use roughly:

1. Figure out the main features/functionalities of the website.
2. Based on the features/functionalities you need to think of two things:

- The pages (UIs) which you need to build
- The data you need for these different pages and features (endpoints)

\3. Based on the features, your understanding of the UI and endpoints that need to be built out, you should have enough information to sketch out the models. **Note: this assumes that your project uses a relational DB.**

- Each model is a table in your database with various columns

It is also important to have an idea of the tech stack you want to use beforehand so that you can at least get started. This isn’t super important for this project.

Now that I have a general plan on how to attack this problem, I will go over some notable features and the high-level steps for the three main steps for deploying a full-stack web application: **the front end, the back end and deployment**.

### Front-End

The front end is comprised of your HTML (the structure of your UI), CSS (styling), JS (non-static interactions/client-side logic) and any other assets. It is the UI and handles the user’s direct interaction with your website.

For my project I decided to use TypeScript React, using React was not necessary for this type of application, but I wanted to deploy a SPA (single-page app) this time.

#### Notable features

1. Use of Google API client and Google Sheets API to get blog posts from different “series”

- So when content is edited in the sheets, you don’t have to change any code (Google Sheets acts as a Content Management System)
- Currently the whole article is copied into one single cell and this text is retrieved from the site. I originally intended to paste the article into a Google Doc so it would be a bit easier to edit, but their Docs API is messed up and I submitted a bug which is under review by their team.
- The articles are written in Markdown so I can use `react-markdown` to get the desired formatting.

#### High Level “Steps”

- Use `npx create-react-app my-app — template typescript` to create a starter project
- `git init` for version tracking!
- Use `.d.ts` files when using TypeScript so you can define interfaces in their own files (create a `types` folder in `src` and add `"types"` to the `"include"` array in your `tsconfig.json` for this to work).
- Create an `axios` instance and create GET and POST helper methods for interacting with API: this allows you to not have to keep rewriting the `API_URL` and also initialize the instance with options `withCredentials: true` for sending cookies to the server automatically
- Think about all the different pages you need, each of these are a component, so just build them out: `Home, Nav, About, Login, etc.`
- Set up the Google API on their site: requires [creating a new project](https://developers.google.com/sheets/api/quickstart/js) and whitelisting the domains that can use the API client, enable the Sheets API in your project, add their `api.js` file to `index.html` and also make sure the Sheets file you are using can be viewed by anyone in the public. **Note: it’s good practice to create a different project for each environment: dev, staging, prod, etc.**
- Create a `.env` file to handle the different API keys, credentials. **Note: you should never push any sensitive information to a public repository.**
- Add styling to each component as you move from component to component
- Use `npm install` to get any packages that may be useful for trying to help you accomplish a goal
- Use `react-router-dom` to setup client-side routing, my routes were fairly simple, the only things which were outside of the basic usage were: [params](https://reactrouter.com/web/example/url-params) and [redirect](https://reactrouter.com/web/example/auth-workflow).
- Once you’re done with your app or even as you’re coding along, you should look to make sure your code is readable, that you’re not repeating yourself a bunch. You want to review all your code to see if anything can be cleaned up.

### Back-End

The back-end is where the bulk of your business logic goes. This is where you write the code that will take care of what happens when a user decides to take an action on your site. It involves setting up a server which interacts with your DB and can handle requests from a web application (front-end).

For this project, I decided to use Go for writing the web service and PostgreSQL for the DB, and there weren’t any notable features as this was my first web service.

#### High Level “Steps”

- Use `go mod init github.com/{github-username}/repo` to initialize a Go module
- `git init` for version control!
- Create a `main.go` file and initialize your server in there and call `ListenAndServe` to handle incoming requests and send responses
- The server you initialize should contain a multiplexer (or mux or router) which handles the different endpoints you should be building
- (in my case) Install PostgreSQL on your computer then create a DB → `createdb [db-name]`, a user and password → `createuser -P -d [username]` the `-P` will prompt you for a password for `[username]`
- Create a `setup.sql` script which creates the necessary tables for your project and run it → `psql -U [username] -f setup.sql -d [db-name]`
- Create a `models` folder where you have a file for each table in your database, each `Model.go` file should include a struct where the properties are the columns of that table: it’s good to use backticks for defining the JSON
- For nullable struct values, include a pointer: `*uuid.UUID`
- Create a `Base.go` file or use `gorm.Base` for all your models, you can also define “hooks” where you can do stuff before different DB operations
- [Connect to your DB](https://github.com/davinchee/blog-backend/blob/master/api/models/db.go), you usually need some sort of connection URL where you pass in the information for the DB you just created
- Build out the endpoints from the **Planning** stage: start from `server.go` → `comment_routes.go` → `Comment.go` → `comment_routes.go` to see the different steps involved in building out an endpoint. This usually involves reading the request from the web application and validating the data passed in a request (if any) and storing it in memory, then going into the DB to create/read/update/delete based on the request and the data provided and then finally sending a response back to the client.
- Create [middleware](https://github.com/davinchee/blog-backend/blob/master/api/middleware/middleware.go) for handling CORS so that your React client can actually use the API `BLOG_URL` is the URL of your site (e.g. localhost in dev and mysite.com on prod).
- Create an auth middleware for endpoints which require an auth check, if they are not authenticated return a `401 Unauthorized`
- Create a types folder/package for differentiating the model structs from the objects being sent back to the client.
- Having some sort of logging system is good, so you can send useful messages to the client and debug

### Deployment

#### Back-end

I deployed my back-end using [Heroku](https://heroku.com). It was fairly straightforward, I just followed [this guide.](https://devcenter.heroku.com/articles/getting-started-with-go)

#### High Level “Steps”

- [Install heroku cli](https://devcenter.heroku.com/articles/getting-started-with-go#set-up)
- Create a `Procfile` which tells Heroku what command should be executed to start the app
- Define any `.env` variables which the app needs to work
- Add PostgreSQL support to Heroku → `heroku addons:create heroku-postgresql:{plan-name}` Use: `hobby-dev` for `{plan-name}` for a free plan.
- Launch the Heroku PSQL CLI → `heroku pg:psql`
- Copy and paste `setup.sql` to set up your DB (I am sure there is a better way!)
- Make sure that the DB connection string is the environment variable `DATABASE_URL` as Heroku will set this to the URL of the DB you create on Heroku
- Create a heroku app and deploy it (you should be able to use Postman or go to the site directly and test out non-authenticated endpoints)

#### Front-end

I deployed my front-end using [Netlify](https://netlify.com). Just go to their site and follow their steps to deploy. I also decided to setup an actual domain and I used [Google Domains](https://domains.google/). The process is very straightforward, but there are some gotchas.

#### High Level “Steps”

- Follow Netlify steps to deploy
- Buy a domain and follow Netlify steps to using your own domain
- **The Gotcha:** If your front-end is a SPA and you are handling routing on the client. You should include a `_redirects` file in your root, so put it in `/public` so when you `npm run build` it gets put into `/build.` The file should contain this one line: `/* /index.html 200` which tells Netlify to serve `index.html`, no matter the route.

### Specific Gotchas

1. Don’t forget to wrap all external API calls or anything that can fail in `try/catch` blocks, this prevents your app from blowing up
2. You can’t use a localhost address (on the client or server) with an IP address (on the client or server) → It’s best to use localhost for both (e.g. `localhost:3000` for the client and `localhost` for the API.
3. Make sure you set `SameSite` option to `“None”` and `Secure` to `true` when using `Gorilla Sessions` otherwise it won’t set/remove your cookies
4. An observation of automagic behavior: let’s say you have a comment struct and you want to get the username property from the users table in it. As long as the struct types both have the same property `Comment.**Username**` and `User.**Username**` **,** it will know to map `users.username` to `comments.name` .

- Comment Struct:

```
type Comment struct {
  ID          uuid.UUID  `json:"id"`
  CreatedAt   time.Time  `json:"created_at"`
  DeletedAt   *time.Time `json:"user_deleted_at"`
  Username    string     `json:"name"`
  CommentText string     `json:"comment_text"`
  UserID      uuid.UUID  `json:"user_id"`
  ParentID    *uuid.UUID `json:"parent_id"`
  PostID      string     `json:"post_id"`
}
```

- User Struct:

```
type User struct {
  ID       uuid.UUID `json:"id"`
  Username string    `json:"username"`
  Email    string    `json:"email"`
}
```

So this was my first full-stack project. I hope this made some sense and if you see anything which I’m doing which seems outdated or just plain out wrong, please let me know! Also check out the project [here](https://davinchee.dev).

The next project I plan on building is something similar to a YouTube clone.

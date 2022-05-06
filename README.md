# Freshbey

## https://freshbey.herokuapp.com/

[homepage-freshbey](https://user-images.githubusercontent.com/70762571/167148047-072b0ec8-be7d-471e-96c2-708276398692.png)

An online grocery store | e-commerce

## Project Purpose!


I am a huge enthusiast of open source. Contributing to open source is a fantastic way to learn and grow. Making open source contributions will require you to have been exposed to a few important concepts, practices, and transferable skills:

- Version control
- Working with tickets & issues
- Working with other developers
- Creating pull requests
- Experiencing a code review process
- Setting up a local development environment
- Contributing code to a pre-existing codebase

## General Idea

Freshbey is an e-commerce platform where you can order grocery items. This project is built for a client but he not paid the said amount. So, after that I make this project as open source.

## Current State

As of now, Freshbey is built using MERN stack. Additionally React Bootstrap is used for styling and React Redux is used for state management.

## Getting Started - Project setup on your local machine

The easiest and quickest way to get the default project up and running locally is to clone the repo:

```bash
git clone https://github.com/roopeshsn/freshbey.git
```

### ES Modules in Node

We use ECMAScript Modules in the backend in this project. Be sure to have at least Node v14.6+ or you will need to add the "--experimental-modules" flag.

Also, when importing a file (not a package), be sure to add .js at the end or you will get a "module not found" error

<!-- You can also install and setup Babel if you would like -->

### Env Variables

Create a .env file in then root and add the following

```
NODE_ENV = production
PORT = 5000
MONGODB_URI = mongodb+srv://admin:WLHWG8uKb5p5q2T7@cluster0.p2u97.mongodb.net/myFirstDatabase?retryWrites=true&w=majoritymyFirstDatabase?retryWrites=true&w=majority
JWT_SECRET = roopeshthemass123@
EMAIL_USERNAME = 2ebcd460696ef8
EMAIL_PASSWORD = cb7e54cd13fa8b
EMAIL_HOST = smtp.mailtrap.io
EMAIL_PORT = 2525
```

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

## Mail Service

[Mailtrap](https://www.example.com) (A Email Sandbox Service) is used as email inbox to reset password

## Build & Deploy

Project is deployed on Heroku

```
git push heroku master
```

The above command is used to deploy the project on heroku

## Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

## Contributing

Please check out [CONTRIBUTING.md](CONTRIBUTING.md) for more information regarding how to contribute.

## Our Contributors ✨

<a href="https://github.com/roopeshsn/freshbey/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=roopeshsn/freshbey" />
</a>

## License

MIT, see [LICENSE](LICENSE)

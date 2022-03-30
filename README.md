# Personal portfolio site for Karen C. Aragon

Site features personal work, writing, and experience. Site was built with

- React.js
- react-three-fiber
- Statically generated with Next.js
- Datastore with Strapi

## Build Setup
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn build-export

## Configuration

### Step 1. Set up Strapi locally

Use the provided [Strapi template Next example](https://github.com/strapi/strapi-template-next-example) to run a pre-configured Strapi project locally. See the [Strapi template docs](https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/installation/templates.html#templates) for more information

```bash
npx create-strapi-app my-project --template next-example --quickstart
# or: yarn create strapi-app my-project --template next-example --quickstart
npm run develop # or: yarn develop
```

This will open http://localhost:1337/ and prompt you to create an admin user.


### Step 3. Run Next.js in development mode

Make sure that the local Strapi server is still running at http://localhost:1337. Inside the Next.js app directory, run:

```bash
npm install
npm run dev

# or

yarn install
yarn dev
```

Your blog should be up and running on [http://localhost:3000](http://localhost:3000)!


### Step 6. Deploy on Vercel

You can deploy this app to the cloud with [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

#### Deploy Your Local Project

To deploy your local project to Vercel, push it to GitHub/GitLab/Bitbucket and [import to Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example).

**Important**: When you import your project on Vercel, make sure to click on **Environment Variables** and set them to match your `.env.local` file.

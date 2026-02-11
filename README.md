This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

This project uses [json-server](https://github.com/typicode/json-server/tree/v0.17.4) to mock a backend API.

Data in the json for the server is from [dummyjson.com](https://dummyjson.com/docs/products) but modified to fit the needs of this project. Most of the endpoints mirrors those in that documentation.

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

To start the full development environment (Next.js frontend + JSON Server backend), use:

```bash
npm run dev:full
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## JSON Server Setup

This project uses [json-server](https://github.com/typicode/json-server/tree/v0.17.4) to mock a backend API.

### Configuration

The server configuration files are located in the `server/` directory:

-   `server/products.json`: The database file containing the product data.
-   `server/routes.json`: Custom routes configuration.
-   `server/middleware.js`: Custom middleware for the server.

### Scripts

The following scripts are available in `package.json`:

-   `npm run mock-server`: Starts the json-server on port 4000.
-   `npm run dev:full`: Runs both the Next.js development server and the json-server concurrently.

## API Endpoints

The mock server (running on port 4000) provides the following endpoints:

### Resources
- `GET /products`: Get all products
- `GET /products/:id`: Get a single product by ID
- `GET /products/category/:category`: Get products by category
- `GET /categories`: Get all categories (if available)
- `GET /categories/:slug`: Get a category by slug

### Pagination & Sorting (json-server 0.17.4)
See [json-server documentation](https://github.com/typicode/json-server/tree/v0.17.4) for more information.

#### Pagination
Use `_page` and `_limit` to paginate data:
- `GET /products?_page=1&_limit=10` (First page, 10 items)
- `GET /products?_page=2&_limit=10` (Second page, 10 items)

The response will include the `Link` header with `first`, `prev`, `next`, and `last` links.
Our custom middleware also adds `X-Total-Count` header and wraps the response to include pagination metadata (total, limit, page, pages).

#### Sorting
Use `_sort` and `_order` to sort data:
- `GET /products?_sort=price&_order=asc` (Sort by price, ascending)
- `GET /products?_sort=price&_order=desc` (Sort by price, descending)
- `GET /products?_sort=price,title&_order=desc,asc` (Sort by multiple fields)

#### Filtering
- `GET /products?category=beauty` (Filter by category)
- `GET /products?price_gte=10&price_lte=50` (Price between 10 and 50)
- `GET /products?q=mascara` (Full-text search)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.


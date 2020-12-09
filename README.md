# Connor's SDC SERVICE

> A microservice for displaying related products

Action | Method | URL
-------|--------|-----
Create new product with related products | POST | /api/relatedProducts/
Get related products by product id | GET | /api/relatedProducts/:id
Update information for related products by id | PUT | /api/relatedProducts/:id
Delete a related products by id | DELETE | /api/relatedProducts/:id

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc


### Installing Dependencies

From within the root directory:

```sh
npm install
```

To start:

```sh
npm run build
npm start
```


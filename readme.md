# Front-end Project

![React](https://img.shields.io/badge/React-v.18-blue)
![Redux toolkit](https://img.shields.io/badge/RTK-v.1-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-v.4-green)
![SASS](https://img.shields.io/badge/SASS-v.1-hotpink)

# Introduction

Welcome to the ILH Store E-commerce Application, a online shopping platform, and a front-end project by Integify Assignment. Developed using React, Redux, and Material UI, our application offers user registration and login features,product checkout along with admin CRUD functionality and advanced product filtering .

## Table of content

1. [Backend](#backend)
2. [Technologies](#technologies)
3. [Deployment](#deployment)
4. [Docker](#docker)
5. [Features](#features)
6. [Api Reference](#api-reference)
7. [Folder Structure](#folder-structure)
8. [Screenshots](#screenshots)

## Backend

This backend of this project is build wtih ASP.NET Core, Entity Framework Core, and PostgreSQL and is deployed on Microsoft Azure. The backend provides endpoints for performing CRUD operations based on Authorization. The backend of the project is accessible in this repository at [https://github.com/hasanmd91/.NET_fullstack_project_backend](https://github.com/hasanmd91/.NET_fullstack_project_backend)

## Technologies

| **Category**                         | **Libraries and Tools**                                       |
| ------------------------------------ | ------------------------------------------------------------- |
| **Frontend Framework and Libraries** | TypeScript, React, React Router, React Slick, React Hook Form |
| **State Management**                 | Redux Toolkit, React-Redux, Redux-persist                     |
| **User Interface and Styling**       | Material UI, Material Icons                                   |
| **HTTP Requests**                    | Axios                                                         |
| **Form Validation**                  | Yup                                                           |
| **Testing**                          | Jest, MSW (Mock Service Worker)                               |

## Deployment

Live Link : [https://ilhshoestore.netlify.app/](https://ilhshoestore.netlify.app)

## Docker

To use the pre-built Docker image for this project, you can pull it from Docker Hub. Run the following command:

```
docker pull hasanmd91/ilhfrontend
```

Once the image is pulled, you can run the Docker container using the following command:

```
docker run -p 3000:3000 hasanmd91/ilhfrontend
```

## Features

### User Management:

- Users can register for an account and log in.
- Users can view all available products and individual product details.
- Users can post, delete and update products review.
- The ability to search and sort products is supported.
- Users can add products to their shopping cart.
- Cart management functionality is available.
- Users can order product by checkout no payment info is required
- users recive order confirmation email

### Admin Functionalities

- Admins have the ability to view and delete user accounts.
- Admins can view, edit, delete, and add new products.
- Admins can view all orders and update order status
- Admins can update a user to admin.

**Demo Admin User**

```
"email": "admin@gmail.com",
"password": "nokia6300"

```

**Demo Customer User**

```
"email": "vonkon@gmail.com",
"password": "nokia6300"

```

## Api Reference

This project backend is build wtih ASP.NET Core, Entity Framework Core, and PostgreSQL and is deployed on Microsoft Azure. The backend provides endpoints for performing CRUD operations based on Authorization.

The frontend of the project has been deployed and is accessible in the repository at [https://github.com/hasanmd91/fs16_CSharp-FullStack](https://github.com/hasanmd91/fs16_CSharp-FullStack)

## Usage

In the project directory, you can run:

### `npm install`

Install all the dependencies

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Folder Structure

```
├───public
│   ├───assets
│   └───projectImages
└───src
    ├───components
    │   ├───AdminDataCard
    │   ├───AdminSideBar
    │   ├───AuthGuards
    │   ├───Button
    │   ├───Card
    │   ├───CartIcon
    │   ├───CartItem
    │   ├───CenterContainer
    │   ├───ImageSlider
    │   ├───InputSearch
    │   ├───InputSelect
    │   ├───Link
    │   ├───LoginForm
    │   ├───Logo
    │   ├───MainCarousel
    │   ├───Modal
    │   ├───Navbar
    │   │   ├───HamburgerMenu
    │   │   ├───NavigationBar
    │   │   └───TooltipMenu
    │   ├───Pagination
    │   ├───ProductSideBar
    │   ├───Subscribe
    │   ├───TextField
    │   └───UserRegisterForm
    ├───hooks
    ├───pages
    │   ├───AdminPages
    │   └───UserPages
    ├───redux
    │   ├───reducers
    │   └───thunks
    ├───test
    │   ├───Data
    │   ├───Reducers
    │   └───server
    ├───types
    ├───utils
    └───validation
```

## Credits and Acknowledgements

- pIctures: https://www.pexels.com/

## Demo

[![Youtube Demo](https://img.youtube.com/vi/kPy1wzJwmSU/0.jpg)](https://www.youtube.com/watch?v=kPy1wzJwmSU)

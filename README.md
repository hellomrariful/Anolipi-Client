# Anolipi | A Online News Portal

## Description
Anolipi is a Full stack Online public demand news portal based in MERN(MongoDB, Express.js, React.js, Node.js) project. In this projects, User can publish his/her article. Also user can read premium content by subscribe. User can pay by stripe payment method. Anolipi has 3 role of user, 1.Admin, 2.Normal User, 3.Premium User. Anolipi is built in a way that has all the features of a standard online news site.
## Live Link

   [Anolipi Live](https://Anolipi.web.app/)

## Server Side

  [Anolipi Server Code](https://github.com/hellomrariful/Anolipi-Server)


## Anolipi Homepage

![Home Page of Anolipi](/public/3-devices-white.png)

## Key Features

- **Functionality**
  - User can submit his/her article.
  - User can buy subscription.
  - User can search by publisher, title.
  - Trending news in home page.
  - Implement react infinite scroll on news page
  - Advertising Banner in home page and many more.


- **User Role(Dashboard)**
  - Update profile information such as name, photo.
  - View article status, like pending, approve, premium and decline feedback etc.
  - Update decline articles and normal articles also.
  - Also delete article

- **Admin Role(Dashboard)**
   - Make article premium, decline, decline feedback, approve, delete etc.
   - Add publisher.
   - Add Admin.
   - See different kind of statics, like publisher publish article count chart, News count chart and user count chart.

- **Authentication:**
  - Gmail and Email/Password authentication system.
  - Implement JWT(Json Web Token) with private route.
  - As a full stack web also protected admin route.


- **Payment System:**
  - Seamless completion of purchases with the integrated Stripe payment system.
  - Confirm personal information and address details during the checkout process.

- **Responsive Design:**
  - Enjoy a seamless experience across various devices.

## Technologies Used

 - **Frontend:** JavaScript, React.js, Tailwind CSS and Material Tailwind.
 - **Backend:** Node.js, Express.js.
 - **Database:** MongoDB.
 - **Authentication:** Firebase Authentication with JWT.
- **Host:** Firebase.

## Admin Credentials
- **Username:** admin@anolipi.com
- **Password:** Ano##21

## Challenges
- One of the most hardest challenge in this project was to implement subscription method. which is if user's subscription duration transcend then premium user will be convert normal user.

## How to Run Locally
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Configure environment variables for MongoDB, Firebase, and Stripe.
4. Run the development server using `npm run dev`.
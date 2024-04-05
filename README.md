# Coding Assignment Claire English
Coding assignment for front and back

# Repo structure and system design
Front / back for each assignment

<img width="1084" alt="systemUML" src="https://github.com/tesshsu/coding_claire_assignement/assets/3927152/21ce7add-016c-4e0b-86ef-8c82de329c11">


### Install the dependences and start the server:
npm install
npm start

# Run client side
Run http://localhost:3000/index.html

Or go to vercel deploy path https://coding-claire-assignement-9orkh13xr-tess-hsus-projects.vercel.app/index.html

<img width="721" alt="Capture d’écran 2024-04-03 à 11 34 04" src="https://github.com/tesshsu/coding_claire_assignement/assets/3927152/46a0d754-e6b1-48f8-80f3-8245c8c92f89">

[testStates.webm](https://github.com/tesshsu/coding_claire_assignement/assets/3927152/394258a6-1e9e-494c-abc5-a3d5ab6a2cc2)



## Test api
Use postMan or Talend API Tester, you could import testApi.json in the root
You need to use Login api in order to get JWT token
Once you had token then add this in your header auth Bearer token in order to send post api email

<img width="1257" alt="Capture d’écran 2024-04-04 à 12 37 33" src="https://github.com/tesshsu/coding_claire_assignement/assets/3927152/9b07c9af-76f6-4755-a8a5-2beb10e75a6b">

<img width="1240" alt="Capture d’écran 2024-04-04 à 12 37 26" src="https://github.com/tesshsu/coding_claire_assignement/assets/3927152/bdaab3e5-cd74-4a5a-9f1c-160d8c195285">



## Note
I am using Mailjet as the mail server because it is easier to use and does not require the complex security setup that Google Gmail service does.

You can reference the Mailjet API documentation here: [Mailjet API documentation](https://github.com/mailjet/mailjet-apiv3-nodejs#send-email-example).



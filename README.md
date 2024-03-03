**Project title:**

Succession Planning

**Project Description:**

Welcome to Succession Planning Software Project. The project aims to develop Succession Planning software that aids managers in overseeing the performances of their employees and tracking promotions, streamlining decision-making for efficient talent development. The software, designed systematically, would help ward off hidden biases against employees by holistically looking at the relevant metrics, inculcating a culture of meritocracy. A timely and strategic decision would help fill up leadership gaps according to the employee's domain of expertise, minimizing disruptions and enhancing the organization's throughput. 

**Features that have been implemented:**

*User Registration

*User Login

*View Admin Dshboard

*View Employee Dashboard

*View Employee Information (Admin)

*About the portal

*Two factor Authorization

*Encryption

*User Authentication (first time users are verified accordingly)

*Feedback form for courses and workshops (Employee dashboard)

*Role Based Access Control

**Delighters:**

*Forgot Password

*Forgot Security Image

**How to run the files:**

*Clone the repository by copying the url code of the main branch, paste this in VsCode terminal and run the following command:
**git clone code**

*Once you have cloned the repository, you will see a folder named proj followed by two sub folders: client and server.

*Open two separate terminals, one for the client side and one for the server side.

*Run the command: **npm i** in both terminals. This will install all necessary node js modules for you.

***Important**: Run the command: **npm install bcrypt**. This will ensure that the encryption we have implemented works and you face no errors.

*Once you have installed the necessary dependancies, run **npm start** on server side to start the server. 

*Run **npm run dev** on client side to load the website.

*Once you open the website, you will be directed onto our login page. 

**How it works:**

The login page is there for already existing employees and admins. 

*Admins will be redirected to their dashboard once they login while employees will be redirected to their dashboard once they login. This is done to ensure role based access control and no one is granted priveleges more than what they are allowed.

*For new employees, admin will enter the following information while adding an employee to the database: name, employee and position id. 

*Once the employee information has been added, the employee can signup by entering their unique employee id which will fetch their name and they can add information about them while signing up.

*Rest of the readme file will be updated as we implement more of our project. 


**STAY TUNED!!!**

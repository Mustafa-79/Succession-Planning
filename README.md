# Succession Planning Software Project

Welcome to the **Succession Planning Software Project**, a systematic and innovative platform designed to aid managers in overseeing employee performance and tracking promotions. By integrating advanced machine learning algorithms, our software precisely computes weights for performance assessments and predicts potential outcomes such as promotions or terminations. This allows for streamlined decision-making and efficient talent development, ensuring that leadership gaps are filled strategically based on each employee's domain expertise.

The software is crafted to eliminate hidden biases and emphasize a culture of meritocracy by focusing on relevant performance metrics. This approach not only ensures a fair and transparent process but also minimizes disruptions and maximizes organizational throughput. With our system, managers are empowered to make timely and informed decisions, fostering an environment where talent is recognized and nurtured, ultimately enhancing the overall efficacy and growth of the organization.

## Features

Our software comes packed with a robust set of features to enhance user experience and management efficiency. Here are the key functionalities categorized by user roles:

### All Users

- **User Registration**: Allows users to register in the system by providing necessary information.
- **User Login**: Enables registered users to log into the system.
- **Logout**: Allows users to securely log out of the system.
- **About the Portal**: Information on the terms and conditions and the privacy policy.

### Employee

- **Sign-up Tutorial**: Acquaints first-time users with the basics of the app.
- **View Dashboard**: Provides statistics and information relevant to the employee's role.
- **View Open Positions**: Displays open positions for promotion within the department.
- **Promotion Position Skill Set Information**: Details the skills needed for promotion roles hierarchically.
- **Progress Bar**: Shows how close an employee is to achieving a promotion.
- **Course Suggestion**: Recommends courses based on the employee's skillset.
- **Training Program Recommendation**: Suggests training workshops based on employee interests.
- **Mentor-Mentee Matching**: Matches employees with mentors.
- **Personalized Tasks Completion Tracker**: Tracks performance and consistent growth/learning.
- **Attempt Assessment**: Allows employees to attempt the assessments released by admin.
- **Feedback Form**: Enables employees to fill out and submit feedback forms.
- **Complaint Form**: Allows employees to register any new complaints.
- **Update User Profile**: Enables users to update their profile information.

### Admin

- **View Dashboard**: Gives an overview of system analytics.
- **View Employee Development**: Tracks each employee's advancement and progression over time.
- **View Performance Indicators**: Displays performance levels based on various metrics.
- **Predict High Potential Employee**: Identifies employees likely to receive a promotion.
- **View Employees at Risk**: Assesses which employees might need intervention or are likely to leave.
- **Create Assessment**: Allows admin to create an assessment form for employees.
- **Employee Feedback**: Enables the creation of new feedback forms.
- **View Employee Information**: Provides all essential information of each employee.
- **Process Complaints**: Reviews and processes complaints submitted by employees.
- **Update Information**: Allows admin to update personal information such as passwords and profile pictures.

### System

- **Data Encryption**: Ensures data is kept safe and private, both when stored and transmitted over the internet.
- **Two-Factor Authentication**: Adds an extra layer of security ensuring only authorized access.
- **Role-Based Access Control**: Ensures that access to sensitive information is granted only to the right people.
- **User Authentication**: Verifies the identity of users effectively.

### Special Feature: Machine Learning-Driven Performance Score Prediction

- **ML-Powered Performance Assessment**: Our software integrates an advanced machine learning model that intelligently computes and adjusts weights for assessing employee performance. This feature not only evaluates current performance metrics but also predicts future potential, indicating the likelihood of promotions or terminations. By leveraging cutting-edge algorithms, the system ensures accurate, unbiased, and dynamic assessments, enabling managers to make informed decisions and strategically manage talent progression within the organization.


### Delighters

- **Forgot Password**: Recovery options for users who have forgotten their passwords.
- **Forgot Security Image**: Additional recovery option for enhanced security.

## Installation Guide

### Cloning the Repository

1. Open your terminal in VSCode.
2. Clone the repository with the following command: `git clone [repository URL]`

### Setting Up the Environment

After cloning the repository, you will find a folder named `proj` containing two subfolders: `client` and `server`.

1. Open two separate terminals: one for the client and one for the server.
2. In both terminals, run `npm i` to install all necessary Node.js modules.
3. **Important**: Run `npm install bcrypt` to ensure encryption functionalities are properly set up.

### Running the Software

1. On the server side, execute `npm start` to launch the server.
2. On the client side, run `npm run dev` to load the website.
3. Navigate to the website's login page to access the software.

## How It Works

- **For Existing Users**: The login page facilitates access for already registered employees and admins. Admins are redirected to their dashboard, while employees access their personalized dashboard upon login, maintaining strict role-based access control.
- **For New Employees**: Admins add new employees by entering their name, employee ID, and position. New employees can then sign up using their unique employee ID, which retrieves their name and allows them to complete their profile.

Stay tuned for further updates as we continue to enhance and expand our project!

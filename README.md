# Moveo coding task - Code Mentorship

This project aims to create an online coding web application that allows a mentor (Tom) to share a piece of JavaScript code with a student (Josh) in real-time.

## Pages:

### 1. Lobby Page

![Index](/pics/index.jpg)

The lobby page does not require authentication and will display the following elements:

- Title: "Choose code block"
- List of Code Blocks: At least 4 items representing code blocks (e.g., "Async case")
- Clicking on an item will take the user to the Code Block page with the details of the selected code block.
- Mentor should press the button to get a readonly page when moving to any code block

### 2. Code Block Page


![code-block](/pics/code-block.jpg)


Both the mentor and the student will access this page, each from their own device (2 different clients). The mentor will be the first user to access the page, and subsequent users will be considered students.

Features for each user:

- Mentor:
  - Can view the selected code block in read-only mode.

- Student:
  - Can view and edit the selected code block.
  - Code changes made by the student should be displayed in real-time using Web Sockets
  - The application should use Highlight.js or an equivalent library to provide syntax highlighting for the JavaScript code.

## Bonus Feature:

![feedback](/pics/feedback.jpg)

- When a student changes the code to match the "solution" property of the code block object, a big smiley face will show on the screen as a positive feedback indicator.

## Link to App:

[Link to App](https://codementor-production.up.railway.app)

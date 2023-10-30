Technical Requirements / Notes
Create a settings Context component that can define how our components should display elements to the User.

Implement the React context API for defining settings across the entire application.
Create React Context for managing application display settings and provide this at the application level.
Add the following defaults to the context provider’s state, they will not be changeable in this lab.
Display three items.
Hide completed items using a boolean.
Define “difficulty” as a default sort word to optionally use in the stretch goal.
Consume and utilize context values throughout your components.
Show a maximum of three items per screen by default in the <List /> component.
Use the Mantine <Pagination /> component to allow users to navigate a list of items.
Hide completed items in the list by default (the ability to show will be added in a later lab).
Pagination Notes:
Only display the first n items in the list, where n is the default number three from your settings context.
If you have more than n items in the list, the <Pagination /> component will add a button that, when clicked, will replace the list with the next n. items in the list.
the <Pagination /> component will manage the “previous” and “next” buttons upon correct implementation.


Proposed File Structure
In this proposal:

integration tests are placed in the __tests__ directory (testing more than one file).
├── .github
│   ├── workflows
│   │   └── node.yml
├── public
├── src
│   ├── __tests__
│   │   ├── App.test.jsx (integration test)
│   ├── Components
│   │   ├── Footer
│   │   │   └── index.jsx
│   │   ├── Header
│   │   │   └── index.jsx
│   │   ├── List
│   │   │   └── index.jsx
│   │   ├── Todo
│   │   │   ├── index.jsx
│   │   │   └── styles.scss  
│   ├── Context
│   │   ├── Settings
│   │   │   ├── index.jsx
│   │   │   └── Settings.test.jsx (unit test)
│   ├── hooks
│   │   ├── form.js
│   │   └── styles.js (optional)
│   ├── App.jsx
│   └── main.jsx
├── .gitignore
├── package-lock.json
├── package.json
└── README.md

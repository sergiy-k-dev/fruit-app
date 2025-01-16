Task Description
Create a basic application using React and TypeScript to display a list of fruits. The application should fetch data from an external API and display the fruits grouped by a specified field.

Requirements

Data Fetching
Use the Fruityvice API (https://www.fruityvice.com/doc/index.html#api-GET) to fetch the list of fruits.
Base API url - https://www.fruityvice.com

Layout
The page should be divided into two sections:
Left Section: Displays the list of fruits.
Right Section: Displays the jar with selected fruits.

Group By Functionality
Include a select input with the label “Group by” containing three options: [None, Family, Order, Genus]. The default selection should be "None".
None: Display a flat list of fruits.
Family, Order, Genus: Display a collapsible list, with the collapsible header derived from the selected group by field (e.g., if “Group by” is set to Family, the header for Strawberry would be "Rosaceae").

Fruit List
There should be two possible views: Table and List.
List view: each fruit entry should be displayed in the format: {fruit name} ({amount of calories}).
Table view: show the following columns - name, family, order, genus and amount of calories.
Include an "Add" button next to each fruit, allowing the user to add the fruit to a jar. Note that it should be possible to add the same fruit multiple times.
Include an "Add" button next to the group name, allowing the user to add all fruits from the group to a jar.

Jar Functionality
The jar should display a list of added fruits.
Calculate and display the total amount of calories for the fruits in the jar.
The Jar should have the possibility to show a pie chart of the added fruits, with their calories.

Additional Notes
You may use any additional libraries as needed to improve the feel and features of the app.
Consider best practices for data fetching and error handling to simulate real-world applications.
Ensure the application is user-friendly and visually appealing.
Commit your work to a public github repo and share the link with us
Also share the link to a live, deployed version of the application.

Evaluation Criteria
Correct implementation of the specified functionality.
Code quality, including readability, structure, and use of TypeScript.
Effective use of React components and state management.
Proper handling of data fetching, including loading states and error handling.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

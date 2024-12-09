# Contributing to Smelly Test

Thank you for considering contributing to **Smelly Test**! Your contributions make this project better for everyone. This guide will help you set up the project and contribute effectively.

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18 or higher)

### Setting Up the Project Locally

1. **Fork the Repository**  
   Click the "Fork" button at the top-right of the repository page to create a copy in your GitHub account.

2. **Clone Your Forked Repository**  

   ```bash
   git clone https://github.com/your-username/smelly-test.git
   cd smelly-test
   ```

3. **Install Dependencies**  
   Use npm to install the project dependencies:  

   ```bash
   npm install
   ```

4. **Run the Build**  
   Compile the project to ensure everything works as expected:  

   ```bash
   npm run build
   ```

5. **Run the Tests**  
   Verify the functionality by running the tests:  

   ```bash
   npm test
   ```

---

## Making Contributions

### Submitting Changes

1. **Create a New Branch**  
   Use a descriptive name for your branch:  

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**  
   Implement your feature or fix the bug.

3. **Run Tests and Linting**  
   Before committing, ensure all tests pass and the code adheres to the style guide:  

   ```bash
   npm test
   npm run lint
   ```

4. **Commit Your Changes**  
   Write clear and concise commit messages:  

   ```bash
   git commit -m "feat: add [description of feature or fix]"
   ```

5. **Push Your Branch**  
   Push your branch to your forked repository:  

   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request**  
   Submit a pull request to the main repository:
   - **Title**: Provide a concise summary of your changes.
   - **Description**: Include a detailed explanation of what your pull request does and why it’s needed.

---

## Code Style

Smelly Test uses a consistent coding style enforced by [ESLint](https://eslint.org/). Ensure your changes adhere to the defined rules.

### Running Linting

To check for code style issues, run:  

```bash
npm run lint
```

---

## Need Help?

If you encounter any issues or have questions about the project, feel free to:

- Open an [issue](https://github.com/marabesi/smelly-test/issues) in the repository.

---

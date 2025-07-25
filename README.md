# Avenga QA Task – Playwright Test Automation

This project contains a Playwright-based end-to-end test automation framework for testing [SauceDemo](https://www.saucedemo.com/) e-commerce functionality.

---

## 📦 Tech Stack

- [Playwright](https://playwright.dev/)
- TypeScript
- Page Object Model (POM)
- Bitbucket Pipelines (optional)
- Docker (for containerized test execution)

---

## 📁 Project Structure

```
AvengaQATask/
├── src/
│   ├── pages/               # Page Object Models
│   ├── data/                # Test data files
│   └── helpers/             # Utility functions (e.g. navigation)
├── tests/                   # Test specs
├── .dockerignore
├── Dockerfile
├── playwright.config.ts
├── package.json
└── README.md
```

## Setup

1. Clone the repo
   ```bash
   git clone <your-repo-url>
   cd <repo-folder>
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Install Playwright browsers
   ```bash
   npx playwright install
   ```

4. Create a `.env` file in the root (optional) to define the app URL:
   ```
   APP_BASE_URL=https://www.saucedemo.com/
   ```

---

## Running Tests

Run all tests:
```bash
npx playwright test
```

Run tests in headed mode (browser visible):
```bash
npx playwright test --headed
```

Run specific test file:
```bash
npx playwright test tests/products.spec.ts
```

---

## Test Coverage

- Authentication (valid/invalid users)
- Product listing (count, names, prices, images)
- Add to cart and remove from cart functionality
- Checkout process with form validations and order confirmation
- Burger menu navigation and functionality (About, Logout, Reset App State)

---

## Test Reporting

- HTML reports generated after test runs at `playwright-report/`
- Screenshots and videos are captured on test failures (configured in `playwright.config.ts`)
- View reports locally with:
  ```bash
  npx playwright show-report
  ```

---

## 🐳 Run Tests in Docker

### 1. Build Docker image
```bash
docker build -t playwright-tests .
```

### 2. Run tests in Docker container
```bash
docker run --rm playwright-tests
```

> 💡 Docker image uses `mcr.microsoft.com/playwright` as base and comes preinstalled with browsers.

---

### Page Object Model (POM)

This test automation framework follows the **Page Object Model (POM)** design pattern.

**What is POM?**  
The Page Object Model is a widely used design pattern in test automation that promotes maintainability and readability by encapsulating page-specific information and actions in separate classes representing each page or component.

**Implementation in this project:**
- Each significant page or component of the SauceDemo website is modeled as a class inside the `src/pages/` directory. For example:
    - `AuthenticationPage` handles login page actions and locators.
    - `ProductsPage` manages product listings and cart interactions.
    - `CheckoutPage` encapsulates checkout form actions and validation.
    - `BurgerMenuPage` handles burger menu navigation and controls.

- Locators for page elements are defined as class properties.
- User interactions like clicking buttons, filling forms, and navigation are implemented as class methods.
- Test scripts import these page classes and use their methods to perform actions and assertions.

---

## ⚙️ Optional: Bitbucket Pipelines

If you’re using **Bitbucket**, configure your pipeline in `bitbucket-pipelines.yml` like so:

```yaml
image: mcr.microsoft.com/playwright:v1.44.1

pipelines:
  default:
    - step:
        name: Run Playwright Tests
        caches:
          - node
        script:
          - npm install
          - npx playwright install --with-deps
          - npx playwright test
```

---

## 🧪 Test Patterns

The project uses the **Page Object Model (POM)** to promote test reusability, separation of concerns, and maintainability.

---

## ✅ Features Covered

- Login functionality
- Product listing
- Cart functionality (add/remove)
- Checkout flow
- Error validations
- Burger menu actions (About, Logout, Reset App State)

---

## CI/CD Integration

- Configured for Bitbucket Pipelines (see `bitbucket-pipelines.yml`)
- Runs tests automatically on push/PR
- Artifacts (HTML reports) are available for download in pipeline UI

---

## Assumptions & Limitations

- Tests are designed for the public SauceDemo demo site; behavior may vary on other environments.
- Login credentials are fixed and public (standard_user, locked_out_user, etc.).
- No database or API-level testing included.
- Visual regression testing is not implemented.

---

## 🙌 Author

Nikola Nikolikj  
Senior QA Automation Engineer  


# Guide to Running Scripts

This document provides instructions on how to execute various scripts defined in the package.json file.

## Prerequisites

Make sure you have Node.js installed.

Install dependencies by running:

```
npm install
```

## Scripts Overview

| Script Name   | Description                               | Command to Run       |
|---------------|-------------------------------------------|----------------------|
| local         | Runs all Playwright tests                 | `npm run local`       |
| api_test      | Runs Playwright tests for API testing     | `npm run api_test`    |
| ui_test       | Runs Playwright tests for UI testing      | `npm run ui_test`     |
| unit_tests    | Runs Jest unit tests                      | `npm run unit_tests`  |

## How to Run

1. **Run All Playwright Tests Locally**  
   Run the following command:
   ```
   npm run local
   ```

2. **Run API Tests**  
   Run the following command:
   ```
   npm run api_test
   ```

3. **Run UI Tests**  
   Run the following command:
   ```
   npm run ui_test
   ```

4. **Run Unit Tests**  
   Run the following command:
   ```
   npm run unit_tests
   ```

## Notes

- Ensure all test dependencies (like Playwright and Jest) are properly installed before running any scripts.
- Update the package.json file if new scripts are added or modified.

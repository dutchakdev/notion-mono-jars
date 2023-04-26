# Notion Donation

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

Notion Donation is a web application that allows you to donate to your favorite charities using Notion database.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Tests](#tests)
- [Contributing](#contributing)
- [License](#license)
- [Questions](#questions)

## Installation

To install the project locally, follow these steps:

1. Clone the repository
2. Install dependencies with `yarn install`
3. Create a Notion API key at [https://www.notion.com/my-integrations](https://www.notion.com/my-integrations)
4. Create a new Notion database with columns for donation name, charity organization, and donation amount.
5. Share the database with the Notion API integration.
6. Create a `.env` file in the root of the project and add the following values:

```
NOTION_API_KEY=<your-notion-api-key>
DATABASE_ID=<your-database-id>
```

7. Start the development server with `yarn start`

## Usage

To use Notion Donation, go to [https://notion-donation.herokuapp.com/](https://notion-donation.herokuapp.com/) and select a charity that you want to donate to. You can then enter the details of your donation and submit it. Your donation will be added to the Notion database and you'll receive a confirmation message.

## Tests

To run tests for Notion Donation, use the following command:

```
yarn test
```

## Contributing

If you'd like to contribute to Notion Donation, please fork the repository and make your changes in a new branch. When you're ready to submit your changes, create a pull request and describe your changes in detail.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Questions

If you have any questions or issues with Notion Donation, please open an issue on Github at [https://github.com/dutchakdev/notion-donation/issues](https://github.com/dutchakdev/notion-donation/issues). You can also find more of my work on [GitHub](https://github.com/dutchakdev).
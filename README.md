# The Prophet App

## Project Overview

The Prophet App is a decentralized platform that allows users to create and participate in prediction markets on various topics. In these markets, users can trade their predictions about the future events, with outcomes determined by smart contracts on the Ethereum blockchain. The app ensures trustless and transparent market operations, enhancing the reliability and fairness of the predictions made on the platform. Additionally, certain data is stored off-chain using IPFS to maintain decentralized storage and accessibility.

## Getting Started

### Prerequisites

 - Node.js (v18 or higher)
 - Yarn or npm
 - Docker (for containerized deployment)

### Installation

Clone the repository:

 ```bash
 git clone https://github.com/jaksm/eth-bgd-2023-prophet-app.git
 cd eth-bgd-2023-prophet-app
 ```

 Install dependencies:

 ```bash
 npm install
 ```

 Configure environment variables:

 Copy `.env.example` to `.env` and update the values as needed.

 ### Running the Application

 To start the development server, run:

 ```bash
 npm run dev
 ```

 This will start the Next.js development server, and you can access the app at `http://localhost:3000`.

 ### Deployment

 To deploy the application using Docker, run:

 ```bash
 docker-compose up --build
 ```

 This will build and start the application in a containerized environment.

 ### Smart Contract Deployment

 The `prophet.sol` contract can be deployed using tools like Hardhat or Truffle. Make sure to update the ABI and contract address in the application once deployed.

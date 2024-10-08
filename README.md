# Plan-Gazillionaire

Plan-Gazillionaire is a project designed to provide arbitrage opportunities for betting in politics, financial markets, and other events. This platform connects to a MySQL database to manage and analyze betting data, including arbitrage opportunities, bet details, and outcomes.

## Features

- **Bet Description Management**: Create, update, delete, and view details of bets.
- **Bet Choice Management**: Handle various options for a bet, such as potential outcomes and probabilities.
- **Arbitrage Opportunities**: Identify and manage arbitrage opportunities across different betting platforms.
- **Price Tracking**: Store and track the price of different bet outcomes over time.

## Technologies Used

- **Python**: Main programming language for backend logic.
- **MySQL**: Used for database management and storing bet-related data.
- **Python Libraries**:
  - `mysql-connector-python`: For connecting to and managing the MySQL database.
  - `python-dotenv`: For managing environment variables.
  
## Prerequisites

- Python 3.x
- MySQL
- pip

## Installation

1. **Clone the repository**:
 git clone https://github.com/phat-do-nyu/Plan-Gazillionaire.git

2. **Navigate to the project directory**:
 cd path/to/Plan-Gazillionaire

3. **Create a virtual environment (optional but recommended)**:
 python -m venv .venv

 **On Windows**:
 .venv\Scripts\activate

 **On Mac**:
 source .venv/bin/activate

4. **Install the required packages**:
 pip install -r requirements.txt

5. **Set up your .env file**:
 a. Create a new file in the project root directory and name it .env.
 b. Open the .env file in a text editor.
 c. Add your MySQL connection details in the following format: 
 DB_HOST=your_mysql_host
 DB_USER=your_mysql_username
 DB_PASS=your_mysql_password
 DB_NAME=your_database_name

6. **Note**: The .env file contains sensitive information. Make sure it's included in your .gitignore file.

7. **Run the application**:
python main.py

Features -------- 
* **Bet Description Management**: 
* Create, update, delete, and view details of bets in the system. This feature helps manage the lifecycle of betting events, including key information like bet names, expiration dates, and statuses. 
* **Bet Choice Management**: 
* Handle various options for each bet, such as possible outcomes, along with their respective probabilities. This feature supports creating and managing different choices within a betting event. 
* **Arbitrage Opportunities**: 
* Identify and manage arbitrage opportunities across different betting platforms. The system helps store and monitor arbitrage possibilities, ensuring you can track profitable differences between odds. 
* **Price Tracking**: 
* Store and track the prices of different bet outcomes over time. This feature enables historical price tracking for better decision-making and future projections.

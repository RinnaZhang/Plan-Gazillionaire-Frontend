import os
from dotenv import load_dotenv
import mysql.connector
from mysql.connector import Error

load_dotenv()

#establish connection
def create_connection():
    connection = None
    try:
        print(f"Attempting to connect to:")
        print(f"Host: {os.getenv('DB_HOST')}")
        print(f"User: {os.getenv('DB_USER')}")
        print(f"Database: {os.getenv('DB_NAME')}")
        
        connection = mysql.connector.connect(
            host=os.getenv('DB_HOST'),
            user=os.getenv('DB_USER'),
            password=os.getenv('DB_PASS'),
            database=os.getenv('DB_NAME')
        )
        print("Successfully connected to the database")
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
        print(f"Error Code: {e.errno}")
        print(f"SQL State: {e.sqlstate}")
        print(f"Error Message: {e.msg}")
    return connection

#create bet_description table
def create_bet_description_table(connection):
    create_table_query = """
    CREATE TABLE IF NOT EXISTS bet_descriptoin (
        bet_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        experiation_date DATE,
        website VARCHAR(255),
        event_type SET('election', 'fed', 'crypto', 'intl_politics', 'financial'),
        status ENUM('open', 'closed'),
        is_arbitrage ENUM('yes', 'no')
        )
    """
    try:
        with connection.cursor() as cursor:
            cursor.execute(create_table_query)
            connection.commit()
            print("Table 'bet_description' created successfully")
    except Error as e:
        print(f"Error creating table: {e}")

#add a bet to the bet_description table
def add_bet_description(connection):
    name = input("Enter bet name: ")
    experation_date = input("Enter expiration date (YYYY-MM-DD): ")
    website = input("Enter website name: ")
    event_type = input("Enter event_type (election/fed/crypto/intl_politics/financial): ")
    status = input("Enter bet status (open/closed): ")
    is_arbitrage = input("Enter if there were any arbitrage opportunities (yes/no): ")
    
    query = """
    INSERT INTO bet_description (name, experation_date, website, event_type, status, is_arbitrage)
    VALUES (%s, %s, %s, %s, %s, %s)
    """
    values = (name, experation_date, website, event_type, status, is_arbitrage)
    
    try:
        with connection.cursor() as cursor:
            cursor.execute(query, values)
            connection.commit()
            print(f"bet added with ID: {cursor.lastrowid}")
    except Error as e:
        print(f"Error adding bet: {e}")

#view a bet from the bet_description table
def view_bet_description(connection):
    query = "SELECT * FROM bet_description"
    try:
        with connection.cursor() as cursor:
            cursor.execute(query)
            results = cursor.fetchall()
            if not results:
                print("No bets found in the database.")
            else:
                for bet in results:
                    print(f"\nID: {bet[0]}")
                    print(f"name: {bet[1]}")
                    print(f"experation_date: {bet[2]}")
                    print(f"website: {bet[3]}")
                    print(f"event_type: {bet[4]}")
                    print(f"status: ${bet[5]}")
                    print(f"is_arbitrage: ${bet[6]}")
    except Error as e:
        print(f"Error retrieving bets: {e}")

#update bets from bet_description table
def update_bet_description(connection):
    bet_id = input("Enter the ID of the bet to update: ")
    field = input("Enter the field to update (name/experation_date/website/event_type/status/is_arbitrage): ")
    value = input("Enter the new value: ")
    
    query = f"UPDATE bet_description SET {field} = %s WHERE id = %s"
    values = (value, bet_id)
    
    try:
        with connection.cursor() as cursor:
            cursor.execute(query, values)
            connection.commit()
            if cursor.rowcount:
                print("Bet updated successfully!")
            else:
                print("No bet found with that ID.")
    except Error as e:
        print(f"Error updating bet: {e}")

#delete bet from bet_description table
def delete_bet_description(connection):
    bet_id = input("Enter the ID of the bet to delete: ")
    
    query = "DELETE FROM bet_description WHERE id = %s"
    value = (bet_id,)
    
    try:
        with connection.cursor() as cursor:
            cursor.execute(query, value)
            connection.commit()
            if cursor.rowcount:
                print("Bet deleted successfully!")
            else:
                print("No bet found with that ID.")
    except Error as e:
        print(f"Error deleting bet: {e}")

#main
connection = create_connection()
if connection is None:
    print("Error")

create_bet_description_table(connection)

while True:
    print("1. Add a bet_description")
    print("2. View all bet_description")
    print("3. Update a bet_description")
    print("4. Delete a bet_description")
    print("5. Exit")
        
    choice = input("Enter your choice (1-5): ")
        
    if choice == '1':
            add_bet_description(connection)
    elif choice == '2':
            view_bet_description(connection)
    elif choice == '3':
            update_bet_description(connection)
    elif choice == '4':
            delete_bet_description(connection)
    elif choice == '5':
        break
    else:
        print("Invalid choice. Please try again.")

    connection.close()
    print("Connection Closed")
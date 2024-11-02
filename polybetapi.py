import requests
import ast
#gets the information from polybets api
#formats information into a list for database entry

r = requests.get("https://gamma-api.polymarket.com/events?closed=false")
response = r.json()

political_events = {}
for event in response:
    print(event['title']) #just to see how many events are being shown
    list_tags = [tag['slug'] for tag in event['tags']]
    if any("politics" in tag for tag in list_tags): #determines if the event is tagged politics
        info_list = []
        markets = {}
        print(event['title']) #the ones with name printed twice are political events
        
        #add info
        political_events[event['id']] = info_list
        info_list.append(event['title'])
        info_list.append(event['endDate']) 
        info_list.append('polymarket') 
        info_list.append('open') 
        for market in event['markets']:
            markets['question'] = market['question']
            print(market['outcomes']) #to ensure the outcomes are correct
            clean_outcomes = ast.literal_eval(market['outcomes']) 
            clean_outcomePrices = ast.literal_eval(market['outcomePrices'])
            i = 0
            while i < len(clean_outcomes):
               key = f'outcome {i+1}' 
               key2 = f'outcome {i+1} price'
               markets[key] = clean_outcomes[i]
               markets[key2] = clean_outcomePrices[i]
               i = i + 1
            print(markets) #checks markets to ensure data is formatted correctly
            info_list.append(markets)

print(political_events) #check to make sure dict is correct
       

import requests
import ast
#gets the information from polybets api
#formats information into a list for database entry

base_url = "https://gamma-api.polymarket.com/events"
params = {
    "closed": "false",
    "limit": 100,
    "offset": 0
}

political_events = {}
count = 0

while True:
    r = requests.get(base_url, params=params)
    response = r.json()

    if not response:
        break

    for event in response:
        count += 1 #increase count to see how many responses
        list_tags = [tag['slug'] for tag in event['tags']]
    
        if any("politics" in tag for tag in list_tags): #determines if the event is tagged politics
            info_list = []
            markets = {}
        
        #add info
            political_events[event['id']] = info_list
            info_list.append(event['title'])
            info_list.append(event['endDate']) 
            info_list.append('polymarket') 
            info_list.append('open') 
        
            for market in event['markets']:
                markets['question'] = market['question']
                
                clean_outcomes = ast.literal_eval(market['outcomes'])
                if 'outcomePrices' in market:
                    clean_outcomePrices = ast.literal_eval(market['outcomePrices'])
            
                i = 0
                while i < len(clean_outcomes):
                    key = f'outcome {i+1}' 
                    key2 = f'outcome {i+1} price'
                    markets[key] = clean_outcomes[i]
                    markets[key2] = clean_outcomePrices[i]
                    i = i + 1

                info_list.append(markets)
    params["offset"] += 100

print(political_events) #check to make sure dict is correct
print(count) #check number of results

       

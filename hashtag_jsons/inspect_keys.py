import json

file_path = '/Users/musatahir/sparkhacks2026/SparkHacks2026/hashtag_jsons/wellness.json'

try:
    with open(file_path, 'r') as f:
        data = json.load(f)

    if 'data' in data and 'search_item_list' in data['data']:
        item_list = data['data']['search_item_list']
        if "0" in item_list:
            first_item = item_list["0"]
            print("Top level keys:", list(first_item.keys()))
            
            if 'author' in first_item:
                 print("Author keys:", list(first_item['author'].keys()))
            
            if 'statistics' in first_item:
                print("Statistics keys:", list(first_item['statistics'].keys()))
                
            # Check for URL or similar
            if 'av_path' in first_item: print(f"av_path: {first_item['av_path']}")
            if 'url' in first_item: print(f"url: {first_item['url']}")
            
            print(f"Aweme ID: {first_item.get('aweme_id')}")
            print(f"Region: {first_item.get('region')}")
            print(f"Create Time: {first_item.get('create_time')}")
            
    else:
        print("Structure not as expected")

except Exception as e:
    print(f"Error: {e}")

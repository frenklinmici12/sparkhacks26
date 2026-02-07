import json
import os

directory = '/Users/musatahir/sparkhacks2026/SparkHacks2026/hashtag_jsons'
files_to_process = ['fitness.json', 'food.json', 'travel.json']

for filename in files_to_process:
    file_path = os.path.join(directory, filename)
    print(f"Processing {filename}...")
    
    try:
        with open(file_path, 'r') as f:
            data = json.load(f)

        if 'data' in data and 'search_item_list' in data['data']:
            item_list = data['data']['search_item_list']
            new_items = []
            
            # Process indices 0-9
            for i in range(10):
                key = str(i)
                if key in item_list:
                    item = item_list[key]
                    
                    # Extract relevant fields
                    new_item = {
                        "id": item.get("aweme_id"),
                        "description": item.get("desc"),
                        "author": {
                            "username": item.get("author", {}).get("unique_id"),
                            "display_name": item.get("author", {}).get("nickname"),
                            "followers": item.get("author", {}).get("follower_count")
                        },
                        "statistics": {
                            "views": item.get("statistics", {}).get("play_count"),
                            "likes": item.get("statistics", {}).get("digg_count"),
                            "comments": item.get("statistics", {}).get("comment_count"),
                            "shares": item.get("statistics", {}).get("share_count")
                        },
                        "url": item.get("url") or f"https://www.tiktok.com/@{item.get('author', {}).get('unique_id')}/video/{item.get('aweme_id')}",
                        "created_at": item.get("create_time"),
                        "region": item.get("region")
                    }
                    new_items.append(new_item)
            
            with open(file_path, 'w') as f:
                json.dump(new_items, f, indent=2)
                
            print(f"Successfully cleaned {filename} with {len(new_items)} items.")
        else:
            print(f"Skipping {filename}: unexpected structure")

    except Exception as e:
        print(f"Error processing {filename}: {e}")

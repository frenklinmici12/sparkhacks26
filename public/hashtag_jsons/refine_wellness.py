import json

file_path = '/Users/musatahir/sparkhacks2026/SparkHacks2026/hashtag_jsons/wellness.json'

try:
    with open(file_path, 'r') as f:
        data = json.load(f)

    if 'data' in data and 'search_item_list' in data['data']:
        item_list = data['data']['search_item_list']
        new_items = []
        
        # We know keys are "0" through "9" from previous step
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
        
        # Overwrite with simplified list
        # Note: User request implies replacing the complex structure with this simple one.
        # But to be safe and keep it valid JSON that might be expected elsewhere, 
        # I'll wrap it in a root object or just list? 
        # The user said "clean up the files so that only relevant data... is left". 
        # A list of objects is usually best for "feeding an AI".
        
        with open(file_path, 'w') as f:
            json.dump(new_items, f, indent=2)
            
        print(f"Successfully cleaned wellness.json with {len(new_items)} items.")

except Exception as e:
    print(f"Error: {e}")

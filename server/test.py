import praw
import json

reddit = praw.Reddit(
    client_id="sR3_-0e-cMmrLg",
    client_secret="nfhKO3P2KvozKSMn3XOI-0iKj7FfOA",
    user_agent="my user agent",
)
data = {}
# data['key'] = 'value'

substring1 = "stream"
substring2 = "clip"
substring3 = "streamable"
key = 0
for submission in reddit.subreddit("soccer").new(limit=100):
  if(((substring1 in submission.url )or( substring2 in submission.url))and (substring3 not in submission.url)):
    # print(submission.title)
    # print(submission.url)
    # print("\n")
    data[key] = submission.title+'##'+submission.url
    key=key+1

json_data = json.dumps(data)
f = open("demofile3.json", "w")
f.write(json_data)
f.close()
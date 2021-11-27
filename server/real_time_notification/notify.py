import re
import time

from watchdog.events import FileSystemEventHandler
from real_time_notification import connector


class FileChangeHandler(FileSystemEventHandler):
    def handle_get_results(self, file_path):
        time.sleep(1)
        with open(file_path, "r", encoding="utf8") as f:
            firstline = f.readline()
            info = firstline.split(':')
            result = re.findall(r'\d+(?:\,\d+)?', info[0])
            submit_res = info[1][:-1] #delete enter character in the last 
            
            data = {
                'user_id': result[0],
                'problem_name': result[1],
                'result': submit_res, 
            }
            return data
    
    def  on_modified(self,  event):
        print(f'event type: {event.event_type} path : {event.src_path}')
        src_path = event.src_path
        if src_path.endswith('.log'):
            result = self.handle_get_results(src_path)
            connector.update_submission(result['user_id'], result['problem_name'], result['result'])
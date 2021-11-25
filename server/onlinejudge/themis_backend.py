from watchdog.events import FileSystemEventHandler
from onlinejudge.models import Submission
import re


class FileChangeHandler(FileSystemEventHandler):
    def  on_modified(self,  event):
        print(f'event type: {event.event_type} path : {event.src_path}')
        src_path = event.src_path
        if src_path.endswith('.log'):
            #ThemisBackend.handle_get_results(ThemisBackend(), event.src_path);
            print(src_path)
            
class ThemisBackend():
    LANGUGAGE_OPTIONS = [
        'C++',
        'Java',
        'Python',
    ]

    LANGUAGE_EXT = [
        '.cpp',
        '.java',
        '.py',
    ]
    def handle_get_results(self, file_path):
        with open(file_path, "r", encoding="utf8") as f:
            firstline = f.readline()
            result = re.findall(r'\d+(?:\,\d+)?', firstline)
            print (result)
            return True
    
    def create_solution_file(submission, extension):
        user_id = submission.user.id
        problem_name = submission.problem.name_in_themis
        content = submission.solution
        
        with open("./contest/Contestants/[%s][%s]%s" %(user_id, problem_name, extension), 'w') as f:
            f.write(content)
            f.close()
            
    def submit_problem(self, submission):
        for index, lang in enumerate(self.LANGUGAGE_OPTIONS):
            if lang == submission.language:
                self.create_solution_file(submission, self.LANGUAGE_EXT[index])

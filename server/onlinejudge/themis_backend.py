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
    
    
    def create_solution_file(submission, extension):
        user_id = submission.user.id
        problem_name = submission.problem.name_in_themis
        content = submission.solution
        
        with open("../contest/Submissions/[%s][%s]%s" %(user_id, problem_name, extension), 'w') as f:
            f.write(content)
            f.close()
            
    def submit_problem(self, submission):
        for index, lang in enumerate(self.LANGUGAGE_OPTIONS):
            if lang == submission.language:
                self.create_solution_file(submission, self.LANGUAGE_EXT[index])

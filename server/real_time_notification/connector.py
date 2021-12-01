from django.db import connection
import mysql.connector


table_name = "simple_oj.onlinejudge_submission"
DATABASE_HOST = "localhost"
USERNAME = "dbadmin"
PASSWORD = "12345"


def get_problem_with_name(problem_name):
    mydb = mysql.connector.connect(
        host=DATABASE_HOST,
        user=USERNAME,
        password=PASSWORD,
    )
    query = """
    SELECT id FROM simple_oj.onlinejudge_problem
    where name_in_themis = '%s'
    """ % (problem_name)
    
    cursor = mydb.cursor()
    cursor.execute(query)
    
    data = cursor.fetchall()[0]
    
    cursor.close()
    mydb.close()
    return data[0]


def get_submission_id_from_last_submit(user_id, problem_name):
    mydb = mysql.connector.connect(
        host=DATABASE_HOST,
        user=USERNAME,
        password=PASSWORD,
    )
    
    problem_id = get_problem_with_name(problem_name=problem_name)
    query = """
    SELECT id FROM simple_oj.onlinejudge_submission
    where problem_id = %s and user_id = %s
    """ % (problem_id, user_id)
    
    cursor = mydb.cursor()
    cursor.execute(query)
    
    data = cursor.fetchall() #Get last submission 
    result = data[-1][0]
    cursor.close()
    mydb.close()
    return result
    


def update_submission(user_id, problem_name, result):
    mydb = mysql.connector.connect(
        host=DATABASE_HOST,
        user=USERNAME,
        password=PASSWORD,
    )
    submission_id = str(get_submission_id_from_last_submit(user_id, problem_name))

    if submission_id is None:
        return

    query = """ 
    UPDATE simple_oj.onlinejudge_submission
    SET user_point = '%s'
    WHERE id = %s;
    """ % (result, submission_id)
    
    cursor = mydb.cursor()
    cursor.execute(query)
    mydb.commit()
    
    cursor.close()
    mydb.close()
   

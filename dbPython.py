import psycopg2 as pg

DB_NAME =  "ANNU_DataBase"
USER = "postgres"
PASSWORD = "11820602"
HOST = "localhost"



def connect():
    conn = pg.connect(dbname=DB_NAME,user=USER,password=PASSWORD,host=HOST)
    conn.commit()
    return conn



def print_table(table_Name):
    database = connect()
    cur = database.cursor()
    cur.execute('SELECT * FROM public."'+table_Name+'";')
    return cur.fetchall()


def pro_Num(pro_name):
    database = connect()
    cur = database.cursor()
    cur.execute('SELECT "programCode" FROM public."Programs" where "programName" = '+"'"+pro_name+"';")
    return cur.fetchall()   


def get_compleated(x):
    database = connect()
    cur = database.cursor()
    cur.execute('SELECT "C_ID" FROM public."Completed Cource" where "S_ID" ='+x+";")
    return cur.fetchall()    


def get_corse_name(x):
    database = connect()
    cur = database.cursor()
    cur.execute('SELECT "courseName" FROM public.course where "courseCode" ='+x)
    return cur.fetchall()   


def get_trans_courses(x):
    database = connect()
    cur = database.cursor()
    cur.execute('SELECT  course_c_code FROM public.courses where course_p_code ='+x )
    return cur.fetchall() 
    
    


def get_description(x):
    database = connect()
    cur = database.cursor()
    cur.execute('SELECT "courseDescription" FROM public.course where "courseCode" = '+x)
    return cur.fetchall() 
    

def get_course_houre(x):
    database = connect()
    cur = database.cursor()
    cur.execute('SELECT "courseCreditHours" FROM public.course where "courseCode" ='+x)
    return cur.fetchall()     




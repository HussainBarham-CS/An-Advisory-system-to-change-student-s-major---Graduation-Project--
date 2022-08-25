import sys, json
import dbPython as db
import threading
import time
db.connect()

if(db.connect):
    check_py=1
else:
    check_py=0






data = json.loads(sys.argv[1])

xx = data['myPro']
yy = data['transPro']



start_time = time.time()
from difflib import SequenceMatcher
def similar(a,b):
    return SequenceMatcher(None, a, b).ratio()

b =0
import nltk
from rake_nltk import Rake
threadLock = threading.Lock()
nltk.download('punkt')
nltk.download('stopwords')
r = Rake()
r1 = Rake()

from threading import Thread
def sp(x,l):
    new_arr = []
    temp_arr = []
    count=0
    length = 0
    z = 0
    for i in range(0,l):
        new_arr.append("")

    for i in range(0,len(x)):
        if x[i] == '0' or x[i]=='1' or x[i]=='2' or x[i]=='3' or x[i]=='4' or x[i]=='5' or x[i]=='6' or x[i]=='7' or x[i]=='8' or x[i]=='9' :
            new_arr[count]+=x[i]
        else:
            count = count+1

    for i in new_arr:
        if str(i) != "":
            length = length + 1

    for i in range(0,length):
        temp_arr.append("")


    for i in new_arr:
        if i != "":
            temp_arr[z] = i  
            z = z + 1  
    
    return temp_arr
stu_id = str(11820602)            

completed_courses = []
completed_courses  = db.get_compleated(stu_id)
#completed courses
m = str(completed_courses)
new_completed_course = sp(m,len(m))
max = 0
count = []
count.append(0)
name = []


class myThread(threading.Thread):
    
    
    def __init__(self,x):
        self.rank = x
        self.my_program = str(xx)
        self.trans_program = str(yy)
        self.stu_id = str(11820602)
        number_corse_true = 0
        threading.Thread.__init__(self)
        
        
    def run(self):
        my_program_code = db.pro_Num(self.my_program)
        trans_program_code = db.pro_Num(self.trans_program)
        completed_courses = []
        completed_courses  = db.get_compleated(self.stu_id)
        max = 0
        course = ""
        #number_corse_true = 0
        
        #completed courses
        m = str(completed_courses)
        new_completed_course = sp(m,len(m))

        #trans courses
        haha = db.get_trans_courses(sp(str(trans_program_code),len(str(trans_program_code)))[0])
        l = str(haha)
        new_trans_courses = sp(l,len(l))
        for i in range(0,len(new_trans_courses)):
                
                des1 = db.get_description(new_trans_courses[i])
                des2 = db.get_description(new_completed_course[self.rank])
                r.extract_keywords_from_text(str(des1))
                r1.extract_keywords_from_text(str(des2))
                keywordList = []
                keywordList1 = []
                rankedList = r.get_ranked_phrases_with_scores()
                rankedList1 = r1.get_ranked_phrases_with_scores()

               # print("thred"+str(self.rank))
                for keyword in rankedList:
                    keyword_updated = keyword[1].split()
                    keyword_updated_string = " ".join(keyword_updated[:2])
                    keywordList.append(keyword_updated_string)

                for keyword in rankedList1:
                    keyword_updated = keyword[1].split()
                    keyword_updated_string = " ".join(keyword_updated[:2])
                    keywordList1.append(keyword_updated_string)
                    temp = similar(keywordList,keywordList1)
                    if max < temp:
                        max = temp
                        course = new_completed_course[self.rank]

        threadLock.acquire()
        
        if int(max*100) >25:
            h(course)
        threadLock.release()      
def h(b):
    count[0] +=1
    name.append(b)





arr = []

for x in range(len(new_completed_course)):
    arr.append(0)
    
for x in range(len(new_completed_course)):
    arr[x]=myThread(x).start()
                  
time.sleep(17)

hours = count[0]*3


#print(count[0])
#print(name)
#print(hours)


#print("--- %s seconds ---" % (time.time() - start_time))




newdata = {
    'num':count[0],
    'id':name,
    'houre':hours
}

print(json.dumps(newdata))







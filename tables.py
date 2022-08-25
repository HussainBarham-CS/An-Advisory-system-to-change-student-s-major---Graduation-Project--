from ExtractTable import ExtractTable
et_sess = ExtractTable(api_key="Vf5xihFBBnWzQXJsEVNbNtVUVUO2gCaF6Dcs0CN3")        # Replace your VALID API Key here
print(et_sess.check_usage())        # Checks the API Key validity as well as shows associated plan usage
table_data = et_sess.process_file(filepath="C:/Users/pc/Desktop/5555.jpg", output_format="df")
#table_data = et_sess.process_file(filepath=Location_of_PDF_with_Tables, output_format="df", pages="all")
print( type(table_data))
var util  = require('./util');

var today = new Date();
var tomorrow = new Date();
	tomorrow.setDate(today.getDate() + 1);
var yesterday = new Date();
	yesterday.setDate(today.getDate() - 1);
var futuredt = new Date();
	futuredt.setFullYear(today.getFullYear() + 1);
	futuredt.setMonth(today.getMonth() - 2);
	futuredt.setDate(today.getDate() + 3);

exports.testData = [
		//1. short notaion
			{request:{path:'/stubs/healthcheck'}, response:{ body:'OK'}},
		//2. response body
			{request:{path:'/stubs/body'}, response:{ body:'This is sample contents served from body'}},
		//3. response from file
			{request:{path:'/stubs/simple'}, response:{ body:'Sample File contents'}},
		//4. strategy: first-found
			{request:{path:'/stubs/not-found'}, response:{ body:'Sample File contents'}},
		//5. strategy: random
			{request:{path:'/stubs/random'}, response:{ }},
		//6. strategy: round-robin
			{request:{path:'/stubs/round-robin'}, response:{ }},
		//7. request URL match in file content
			{request:{path:'/stubs/phone-2563'}, response:{ body:'phoine number = 2563'}},
		//8. markers
			{request:{path:'/stubs/markers'}, 
				response:{ body:'Today is '+ util.formatDate(today,'yyyy-dd-MM')+'. And the url is https://www.google.co.uk/?gws_rd=ssl#safe=strict&q=blah%20blah. Tomorrow would be '+ util.formatDate(tomorrow,'yyyy-dd-MM')+'. And yesterday it was '+ util.formatDate(yesterday,'yyyy-dd-MM')+'. Other url https://www.google.co.uk/?gws_rd=ssl#safe=strict&q=ola%20ola.\n\n'+util.formatDate(today,"dd D, MMM YYYY HH:mm:ss")}},
		//9. request URL match in file name
			{request:{path:'/stubs/dynamic-filename/2'}, response:{ body:'file 2'}},
		//10. request URL match file not found
			{request:{path:'/stubs/dynamic-filename/9'}, response:{ status: 500}},
		//11. custom status code
			{request:{path:'/stubs/500'}, response:{ status:500}},
		//12. POST request. request POST match in file content
			{request:{path:'/stubs/simple', method: 'POST', post:'Hello Amit Gupta!! Your number is +44 7123456789'}, response:{ body:'My name is Amit Gupta. My mobile number is 07123456789.'}},
		//13. 
			{request:{path:'/stubs/header',headers: {'custom': 'Custom'}}, response:{ body:'Sample File contents'}},
		//14. 
			{request:{path:'/stubs/dumps'}, response:{ body: 'Some text in this file. dumps 1 dumps 2 and some footer. Some text in this file. dumps 1dumps 2 and some footer.'}},
		//15. 
			{request:{path:'/stubs/datasets/001'}, response:{ body: 'My name is Amit Gupta. My Employee ID is 001. Somehow I earn 1000000000'}},
		//16. 
			{request:{path:'/stubs/datasets/002'}, response:{ body: 'My name is Nilesh. My Employee ID is 002. Somehow I earn 9000000000'}}
		//17. 
			,{request:{path:'/stubs/mix', method:'POST', post:'Hello Amit!!'}, response:{ body: 'Amit\nSome text in this file.\ndumps included here from given datasets\ndumps 1dumps 2\nmarkers from data set: '+ util.formatDate(today,'yyyy-dd-MM')+'\n and some footer.'}}
		//18. 	
			,{request:{path:'/stubs/mix2', method:'POST', post:'Hello Amit!!'}, response:{ body: 'Amit\nSome text in this file.\ndumps included here from given datasets\n\nmarkers from data set: '+ util.formatDate(futuredt,'yyyy-dd-MM')+'\n and some footer.'}}
		//19. 
			,{request:{path:'/stubs/post2', method:'POST', post:'name=Amit&Mobile=781011111&Sal=100000.00&DOJ=25-APR-2012'}, response:{ body: 'Mobile=781011111,781011111,<% post.2 %>'}}
		//20. 
			,{request:{path:'/stubs/post3', method:'POST', post:'name=Amit&Mobile=(44)781011111&Sal=100000.00&DOJ=25-APR-2012'}, response:{ body: '44,44,781011111,781011111,100000'}}
		//21. 
			,{request:{path:'/stubs/post4', method:'POST', post:'name=Amit&Mobile=(44)781011111&Sal=100000.00&DOJ=25-APR-2012'}, response:{ body: '=100000,100000,=25,25,<% post.4 %>,,<% post.5 %>'}}
		//22. 
			,{request:{path:'/stubs/post5', method:'POST', post:'name=Amit&Mobile=781011111&Sal=100000.00&DOJ=25-APR-2012'}, response:{ body: 'name=Amit&Mobile=781011111&Sal=100000.00&DOJ=25-APR-2012,781011111,<% post.2 %>'}}
		//23. 
			,{request:{path:'/stubs/header2', headers: {'employee_num': '001'}}, response:{ body: 'My name is Amit Gupta. My Employee ID is 001. Somehow I earn 1000000000'}}
		//24. dbset: serve the response if key is found
			,{request:{path:'/stubs/admin/003/1'}, response:{ body: "<auth_id>nk002834-oknkjn-098nkjn</auth_id>"}}
		//25 dbset: 404 if key is not found
			,{request:{path:'/stubs/admin/005/1'}, response:{ status: 500, body: "Error: Key:  not found in admin" }}
		//26 dbset: serve the response from file if key is not found
			,{request:{path:'/stubs/admin/005/2'}, response:{ body: '<fault>We are currently experiencing some server issues. Try again later...</fault>'}}
		//27 dbset: serve response against any random key
			,{request:{path:'/stubs/admin/005/3'}, response:{ }}
		//28 dbset: serve response if key is found otherwise skip and match further mapping
			,{request:{path:'/stubs/admin/010/4'}, response:{ status : 200}}
		//29 dbset: serve response if key is found otherwise skip and match further mapping. throw 404 if no further request matches
			,{request:{path:'/stubs/admin/005/4'}, response:{ status : 404 }}
		//30
			
		
			]



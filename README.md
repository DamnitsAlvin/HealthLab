# HealthLab

<h1> Requirements </h1>
<ul>
<li> Python 3.8 </li>
<li> XAMPP </li>
<li> NodeJS </li>
</ul>

<h1>Running </h1> 

<h2> Database </h2> 
<strong> Note: </strong> I haven't created a /seed in the backend server so the initialization of database would be manual <br>
1. Open XAMPP -> Apache and MySQL <br>
2. Go to import tab <br>
3. Import the sql file located at the folder <code> /backend/Database Design/sql/all.sql </code><br>
4. Check for errors 

<h2>Backend </h2> 
1. Go to the backend folder, open CMD via address bar <br>
2. Install pipenv by typing <code>pip install pipenv </code> <br>
3. Run the isolated environment by typing <code> pipenv shell </code> <br>
4. Install the dependencies of the backend by typing <code> pipenv install </code> <br>
5. Run the project by typing <code> pipenv run start </code> <br>
6. Check if running properly 

<h2>Frontend </h2>
1. Go to the front folder, open CMD via address bar <br>
2. Install the dependencies of the frontend by typing <code>npm install </code><br>
3. Run the frontend by typing <code>npm start</code> <br>

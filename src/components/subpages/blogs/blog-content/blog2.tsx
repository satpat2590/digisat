// src/subpages/blogs/blog-content/blog2.tsx
import React from 'react';
import '../blog.css';
import { blogs } from '../blogs';
import { CodeBlock } from 'react-code-blocks';
import { myCustomTheme } from '../codeblocks';

const Blog2: React.FC = () => {

  const docker_compose = `    version: '3'
    services:
        web:
            depends_on:
            - db
            build: ./web/
            environment:
            - SATYA=satyapatya
            networks:
            - nodeapp
            
        db: 
            build: ./db/
            volumes: 
            - db_data:/var/lib/mysql
            - ~/dockerexample:/var/lib/mysql-files/
            restart: always
            environment:
            MYSQL_DATABASE: example
            MYSQL_ROOT_PASSWORD: pword
            networks:
            - nodeapp
        
    networks:
        nodeapp: 
            driver: bridge
        
    volumes:
        db_data: 
    `;

  const sql_file = 
`    //mysql variable holds the mysql2 module we downloaded earlier    
    var mysql = require('mysql2'); 

    //this variable holds the database information from the 
    //  docker-compose.yml file in the 'db' service section
    var db_config = {
        host: 'db', //we use the service name (db) to designate the host!
        user: 'root',
        password: 'pword',
        database: 'example'
    };
    
    var connection; //variable used to connect to the MySQL database
    
    //function to retry connection to the MySQL database
    //  until either a fatal error or loss of connection
    function aggressiveConnect() {
        //set the connection variable defined above to 
        //  the MySQL database info from the db service
        connection = mysql.createConnection(db_config);
        
        //try connecting to the database itself using the 
        //  db_config we placed inside earlier
        connection.connect(function(err) {
            if(err) { //on error, print out a message, and then retry!
                console.log('error when connecting to db:', err);
                setTimeout(aggressiveConnect, 2000); //retry after 2 seconds... 
            }
        });
        
        //on successful connection, print out a message!
        connection.on('connection', (stream) => {
            console.log('we in the building!!!! we dem boyzzz!!');
        })
        
        //on error, print out the error, and then retry connection if the 
        //  error is a loss of connection, else, exit program by throwing
        //      an error 
        connection.on('error', (err) => {
            console.log('db error', err);
            if(err.code === 'PROTOCOL_CONNECTION_LOST') {
                aggressiveConnect(); //retry connection if connection seems to be lost
            } else {
                throw err;
            }
        });
    }
    
    //call the connection function! if it works, it'll move on to the next lines...
    aggressiveConnect();
    
    //query the database by pulling ALL rows from the exampletable
    connection.query('SELECT * FROM exampletable', function (error, results, fields) {
        if (error) throw error;
        console.log('The result set is: ', results) //print out the list of objects (rows) 
    });
    
    //end connection once the file runs! make sure to do this or you'll waste resources...
    connection.end();
`;

  const dockerfile = `FROM node:latest
WORKDIR /web 
COPY package.json . 
COPY package-lock.json . 
COPY sql.js .
CMD ["tail", "-f", "/dev/null"]`;

  const dockerfile_revise =  `#...above code
db: 
    image: mysql:latest
#...below code    
    `;

  const table_create = 
`CREATE TABLE exampletable (
    id MEDIUMINT NOT NULL AUTO_INCREMENT, 
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL, 
    age INT NOT NULL, 
    job_title VARCHAR(255), 
    email VARCHAR(255) NOT NULL,
    PRIMARY KEY(id),
    UNIQUE(email) 
);`;

  const row_insert = 
`INSERT INTO exampletable (firstname, lastname, age, job_title, email) VALUES (
    'Johnny', 'Appleseed', 24, 'Adventurer', 'johnappleman@gmail.com'
);`;

  const row_edit = 
`UPDATE exampletable 
SET age = 74, job_title = NULL 
WHERE email = 'johnappleman@gmail.com';`;

  return (
    <div className="page">
      <div className="blog">
        <h1 className="blog-title">{blogs[1].title}</h1>
        <div className="blog-date">Posted on {blogs[1].date}</div>
        <div className="blog-content">
          <h2>Intro to Docker</h2>
          <p>
            Have you ever tried to code collaboratively, only to discover the code doesn't work universally across your team's different computers? 
            Bash scripts penned on Ubuntu won't run on MacOS, and Windows users might give up out of frustration. This challenge is prevalent and 
            something I also encountered during my college days. However, modern computing applications offer a straightforward solution — <i><b>virtualization</b></i>.
          </p>
          <p>
            Virtualization is a method that allows your computer to run another application, or even an entire OS, on top of your existing OS. 
            So, if a team member writes a bash script on their Ubuntu Server OS, you can run that script too by deploying a virtual environment that emulates 
            Ubuntu Server OS. This gives everyone an identical OS, enabling the smooth execution of shared scripts and applications.
          </p>
          <p>
            The tool we use to achieve this is called Docker. Unlike traditional resource-intensive virtual machines that share your hardware resources 
            with your base OS, Docker enables a more efficient process. Docker uses pre-configured environments known as <i><b>images</b></i>, which can be an application 
            or the base OS itself. To run an image, you simply use Docker to execute it, creating a <i><b>container</b></i>, which is a running virtual environment 
            based on the chosen image.
          </p>
          <p>
            For instance, in our collaborative project scenario, we could find a Docker image running an Ubuntu base OS, and deploy that as a container. 
            If you're worried about long setup times, Docker has a pleasant surprise for you. Docker containers are incredibly lightweight and can spin up 
            in seconds. This is because Docker leverages the same <i><b>kernel</b></i> as your host OS. Instead of running another virtual kernel (as typical 
            virtual machines do), Docker shares resources from the host OS, resulting in a more lightweight and efficient virtualization process. 
            The realm of virtualization might seem complex at first, but hopefully, this breakdown has made it a bit more digestible!
          </p>
          <h2>Downloading and Setting Up Docker</h2>
          <p>
            Let's go on with a more practical example! How do you run Docker on your computer? First, as is with all software... you go on their <a href="https://docs.docker.com/get-docker/" style={{ textDecoration: 'none', color: "white" }}>website</a> and click on the version that corresponds with your OS. Once you've downloaded Docker, try following the steps on the website to run your particular version of Docker. For MacOS and Windows, you likely have a application icon downloaded, which will run an application called 'Docker Desktop', which allows you to manually find images and run them from that console. Here's an image of what your screen should look like after running Docker Desktop!
          </p>
          <img className="image" height="600px" width="800px" src="/DockerDesktop01.png" alt="Docker Desktop" />
          <p>
            Now, let's find an image for you to download. Images can be found on this place called <a href="https://hub.docker.com/" style={{ textDecoration: 'none', color: "white" }}>Docker Hub</a> which allows you to find public images and <i><b>pull</b></i> them into your Docker Desktop/CLI to run as a container. The simplest one would be an image called 'cowsay', which you can find by simply searching cowsay in the Docker Hub search bar. Now, you can likely find a way to do this on your Docker Desktop in a simpler fashion, by just connecting your Docker Hub account directly. However, if you're using the Docker CLI like I am, the best way would be to go into your terminal and first check if you have the CLI downloaded. To do so, run this command:
          </p>
          <div className="codeblock">
            <CodeBlock
              text={`docker --version`}
              language="bash"
              showLineNumbers={false}
              theme={myCustomTheme}
            />
          </div>
          <p>
            This command should print out the Docker version on your terminal, and also ensure that you can use the Docker CLI commands. To see a list of your available images, you can run the command:
          </p>
          <div className="codeblock">
            <CodeBlock
              text={`docker image ls`}
              language="bash"
              showLineNumbers={false}
              theme={myCustomTheme}
            />
          </div>
          <p>
            This will effectively show you the images you have pulled onto your personal Docker account. If you're using Docker Desktop, it should also be visible there as an available image to run as a container. Now, go back to your terminal, and we'll learn how to run containers from images that you pull from the internet. I'll show a very simple example to see exactly how this process works, and then delve a little deeper into configuring/building your own Docker image from a pre-existing template. Here is a CLI command to pull a basic "cowsay" image from Docker Hub.
          </p>
          <div className="codeblock">
            <CodeBlock
              text={`docker pull grycap/cowsay`}
              language="bash"
              showLineNumbers={false}
              theme={myCustomTheme}
            />
          </div>
          <p>
            Once you've pulled this image onto your Docker, you can begin by running it as a container! Try running this CLI command to run the image as a container...
          </p>
          <div className="codeblock">
            <CodeBlock
              text={`docker run grycap/cowsay`}
              language="bash"
              showLineNumbers={false}
              theme={myCustomTheme}
            />
          </div>
          <p>
            If you've been greeted by a cow spouting a pun, congratulations! You've successfully run a Docker container by pulling an image from the Docker Hub. With this skill, you're now equipped to explore more intriguing images from the hub. Some captivating examples include the <a href="https://hub.docker.com/_/node" style={{ textDecoration: 'none', color: "white" }}>node.js</a> and <a href="https://hub.docker.com/_/mysql" style={{ textDecoration: 'none', color: "white" }}>MySQL</a> images. The node.js image provides a fully configured instance of node.js (JavaScript environment) and npm (node package manager), empowering you to create captivating web projects. The MySQL image runs the latest version of MySQL, a relational database that can be configured either locally or via the cloud. We will utilize these in our next steps as we delve into Docker Compose.
          </p>
          <h2>Intro to Docker Compose</h2>
          <p>
            Docker Compose stands out because it allows multiple containers to run simultaneously within the same network. It lets you designate ports on the host that map to ports on the container, enabling you to access the container's information from your host machine. For instance, if you were running a web application using Node on a container and using the default port 3000, you could access this application by typing 'localhost:3000' in your browser. This is similar to how websites like www.facebook.com operate, but they run on separate servers maintained by their respective companies. These companies often use a <i><b>development server</b></i> for website modifications, conducting tests on ports such as 'localhost:3000'.
          </p>
          <p>
            We won't delve into the intricacies of porting right now, but it's a useful topic to explore when you're configuring your project. Let's proceed to our next step. Create a new directory on your computer and name it <i>compose_example</i>. Inside this directory, create two more folders named <i>web</i> and <i>db</i>. Now, we'll create a Docker Compose environment capable of running the previously mentioned node.js and MySQL images. In the base directory (/compose_example/), create a file named <i>docker-compose.yml</i>. This will serve as a <i><b>configuration file</b></i> to manage your containers. Open the file (/compose_example/docker-compose.yml) and paste the following code into it:
          </p>
          <div className="codeblock">
            <CodeBlock
              text={docker_compose}
              language="bash"
              showLineNumbers={true}
              theme={myCustomTheme}
            />
          </div>
          <p>
            Let's demystify this seemingly complex configuration file! Starting with the most straightforward element, the 'version' tag signifies the version of the compose file maintained by Docker. You can find an overview of the versioning <a href="https://docs.docker.com/compose/compose-file/compose-versioning/" style={{ textDecoration: 'none', color: "white" }}>here</a>.
          </p>
          <p>
            Next, we have 'services', essentially another term for 'containers'. Each service is defined as an image with some additional personalized specifications. Alternatively, you can have a base image running as a service. In our case, we have two services: <i>web</i> and <i>db</i>. The 'web' service runs our node image, while the 'db' service runs the MySQL image.
          </p>
          <p>
            The 'web' service will be extracting information stored in the MySQL relational database. Thus, it wouldn't be logical to run the 'web' service in isolation. Hence, we use the <i><b>depends_on</b></i> tag in the service specification to answer the question: "<i>What does this service rely on to function properly?</i>". Simply put, if you started and ran the web service without first running the db service, you wouldn't be able to access data from the database. The 'depends_on' tag addresses this by ensuring the 'db' service, which the 'web' service relies on, starts before the 'web' service.
          </p>
          <p>
            The next component is crucial as it enables the customization of an image to suit your needs. The <i><b>build</b></i> tag asks: "Do you have a custom configuration file for this service to be run as a container? If so, please provide the file's location". The referenced configuration file is a <a href="https://docs.docker.com/engine/reference/builder/" style={{ textDecoration: 'none', color: "white" }}>Dockerfile</a>, which holds immense power. For instance, you might want to run a node image that isn't configured. To make major changes to this image, you'd have to run the base image each time and then apply your changes, which can't be saved... However, with a Dockerfile, you can create a new image from a base template, like the node image, and apply your own changes. A common use of the Dockerfile is to download specific packages into the image you're creating, such as the <a href="https://www.npmjs.com/package/mysql2" style={{ textDecoration: 'none', color: "white" }}>mysql</a> package for node. This enables access to the MySQL node package when you run the container from the image created from the Dockerfile. Isn't it more efficient to have these packages built into the image, instead of booting up the base image and downloading the packages every time? It significantly reduces the time spent pre-configuring these images, making the deployment and disposal of these containers much easier.
          </p>
          <h3>FROM</h3>
          <p>
            This one is relatively simple to understand! Let's break it down! The <i><b>FROM</b></i> keyword basically asks you: "Which image are we using as the base for this new image?". In our case, we're using the latest version of the node image, so we can write that in this format: image:version (node:latest).
          </p>
          <h3>WORKDIR</h3>
          <p>
            Moving on, the <i><b>WORKDIR</b></i> keyword asks you: "What's the root directory inside of the container in which work will occur?". Basically, when you boot up the container by running this newly created image from this Dockerfile, what directory will you be inside of? Note that whatever directory you decide to pick will be initially empty, so this <i>/web</i> folder we specified in the WORKDIR keyword will be a NEW folder inside of the eventual container with NOTHING inside (as of now).
          </p>
          <h3>COPY</h3>
          <p>
            Moving on, the <i><b>COPY</b></i> keyword allows you to copy a specific file or folder into a location specified in the container. The format is as such: COPY [host file to copy] [location in container to paste]. The '.' is special because it denotes the <i><b>relative</b></i> location. Since we know the folder we'll enter upon creating the container would be the <i>/web</i> folder (since it was specified as the root folder in the WORKDIR command..), we can equate the '.' keyword to the '/web' folder. We're essentially COPYING the package.json, package-lock.json, and the sql.js files into the /web folder within the container. So rest assured, when you run this Dockerfile and then run the container from the image it creates, you'll be loaded into a /web folder with the following: /web/package.json , /web/package-lock.json , and /web/sql.js files. This is MUCH more efficient than having to run a base node image as a container and then coding the functionality once more!
          </p>
          <h3>CMD</h3>
          <p>
            Lastly, the <i><b>CMD</b></i> keyword runs a particular terminal command which starts off the container itself. Each word of the command is split into different strings within a list, hence the format: ["command-part-one", "command-part-two", ...]. Here, 'tail -f /dev/null' is one command altogether, split into chunks for the Dockerfile to comprehend better. So what does this command even do? Well, it keeps the container running <b>forever</b>. Yes, you have that power! Normally, like you saw with the cowsay image, it'll run the cowsay application when you start it as a container, and then remove itself entirely. So, you don't have the power to access the container's files or see what the files consist of! When you run this 'tail -f /dev/null' command, it'll essentially print out the recursive list of ancestor files starting from /dev/null. Sadly, this one file in particular does not have any ancestors, so it'll run in a forever loop, unless you decide to terminate it personally!
          </p>
          <h2>'web' Service Configuration Part 2</h2>
          <p>
            We've come a long way! I hope you didn't forget what we branched out from! Let's go back to the docker-compose.yml file and attempt to understand the <i><b>build</b></i> tag again. Notice we put <i>./web/</i> as the location in which the Dockerfile is located. That's it! The docker-compose.yml file now knows where to build the 'web' service's image from now!
          </p>
          <p>
            Next on the 'web' service configuration is the <i><b>environment</b></i> tag. If you're familiar with env variables, then you've basically grasped what this is! If not, let me explain. There are some variables that are global to your computer. Meaning, if you type in your terminal something like:
          </p>
          <div className="codeblock">
            <CodeBlock
              text={`echo $[env variable name]`}
              language="bash"
              showLineNumbers={false}
              theme={myCustomTheme}
            />
          </div>
          <p>
            Then it will print out the value of that environment variable! Environment variables provide a convenient way to customize your application's runtime behavior. For instance, you can use environment variables within programming languages like JavaScript, Python, C, and more. Within this docker-compose.yml file, we have defined an environment variable <i><b>SATYA</b></i>, which will be accessible within the 'web' service (or container) only. This is simply a demonstration, but typically, environment variables are used to configure things like database connection credentials. Please remember that exposing sensitive information in a public docker-compose.yml file poses a security risk.
          </p>
          <p>
            For containers within a docker-compose environment to communicate, they need to be part of the same network. By defining the <i><b>networks</b></i> tag, we can ensure that our 'web' and 'db' services are able to interact. In this docker-compose.yml file, we have defined a network named <i>nodeapp</i>. There are a lot of configuration options available for docker networks, which are beyond the scope of this tutorial, but you can learn more <a href="https://docs.docker.com/compose/compose-file/06-networks/" style={{ textDecoration: 'none', color: "white" }}>here</a>.
          </p>
          <h2>'db' Service Configuration</h2>
          <p>
            Having covered the 'web' service, let's move on to the 'db' service, which shares similarities but has a few distinct elements. The <i><b>volumes</b></i> tag is a crucial component, as it creates persistent storage shared between the host and the container. This allows data to be stored and retrieved across multiple container lifecycles. For instance, what if all of the information you stored during your work session gets lost? You'd probably have a little murder on your mind! To regulate your stress levels, docker-compose allows you to create <i>volumes</i>, which are persisted stores of memory, so that you can add/delete rows each time you start a container and all of the previous data will be saved! How freakin' convenient!
          </p>
          <p>
            The <i>db_data</i> volume is where the MySQL database data is stored, and this volume is defined at the bottom of the docker-compose.yml file, similar to the networks. Additionally, you can bind mount a host OS directory to a directory within the container, which helps in persisting data written within the container. For instance, <i>~/dockerexample</i> is a directory in the home directory (~/) of the host, and it will store all of the data written to the <i>/var/lib/mysql-files/</i> directory in the container. A typical use case of this could be to export the entire database from the 'db' container to a CSV file, which you can then use on your host OS.
          </p>
          <p>
            The <i><b>restart</b></i> policy controls whether your service should be restarted when a failure occurs, which is particularly useful for services like databases that should be highly available. While there's no universally agreed-upon best practice for this, it's something important to consider when working with database images in a Docker Compose context. Lastly, we need to create the Dockerfile within the <i>/compose_example/db/</i> directory, and luckily, this Dockerfile is quite succinct. Here it is:
          </p>
          <div className="codeblock">
            <CodeBlock
              text={`FROM mysql:latest`}
              language="bash"
              showLineNumbers={false}
              theme={myCustomTheme}
            />
          </div>
          <p>
            Now you might be thinking. Gee, what's the point of creating a new Dockerfile for the 'db' folder since it's only ONE line? And with that thinking, you'll go far in life. You can simply delete the file: <i>/compose_example/db/Dockerfile</i> and also the <i>build</i> tag within the 'db' service in the docker-compose.yml file. Replace the <i>build</i> tag with the following...
          </p>
          <div className="codeblock">
            <CodeBlock
              text={dockerfile_revise}
              language="bash"
              showLineNumbers={false}
              theme={myCustomTheme}
            />
          </div>
          <p>
            Instead of having a whole Dockerfile to create a mysql base image, you can just specify the image in the docker-compose.yml file itself. Makes this easier, right? Now, let's go on to actually running the application, since everything is set up! Go to your root directory: <i>/compose_example/</i> within your terminal and type the following:
          </p>
          <div className="codeblock">
            <CodeBlock
              text={`docker-compose up --build`}
              language="bash"
              showLineNumbers={false}
              theme={myCustomTheme}
            />
          </div>
          <p>
            You'll notice the images being built using the Dockerfile for the 'web' service, and the mysql image pulled for the 'db' service. After, it'll run the services as containers and keep them up. You can type 'docker ps' to list the running containers, and if you notice both of your services there, then congratulations! You've officially connected two containers in holy Docker matrimony!
          </p>
          <h2>Accessing Containers</h2>
          <p>
            Now, you'll want to access the containers themselves, and you can do so by running this command:
          </p>
          <div className="codeblock">
            <CodeBlock
              text={`docker exec -it [container-name] bash`}
              language="bash"
              showLineNumbers={false}
              theme={myCustomTheme}
            />
          </div>
          <p>
            If you're running Windows, the <i>bash</i> might not work the same, so try to find out which terminal type you're running to change that to one relative to your machine. The container name is also found by running 'docker ps', and it should be the last row listed. Once you run the 'docker exec' command, it should throw you in another file, which is your docker container. You can go inside either the 'web' container or the 'db' container, but we want to focus on the 'db' container so that we can set it up to allow database information to be printed on the 'web' container's <i>sql.js</i> file.
          </p>
          <h3>MySQL Setup</h3>
          <p>
            Run the 'docker exec' command with the 'db' container name listed in the 'docker ps' command, and then run the following line:
          </p>
          <div className="codeblock">
            <CodeBlock
              text={`mysql -uroot -p`}
              language="bash"
              showLineNumbers={false}
              theme={myCustomTheme}
            />
          </div>
          <p>
            This will prompt you to enter the password, which is the same password specified in the <i><b>MYSQL_ROOT_PASSWORD</b></i> environment variable from the docker-compose.yml file. In this case, it's <i>pword</i>, but you can change it to whatever you wish. Type in the password and then it'll give you a command prompt like such: <i>mysql&gt; </i>. You've successfully connected to the database! You can use MySQL commands now to navigate around. You can run the following sequentially:
          </p>
          <div className="codeblock">
            <CodeBlock
              text={`SHOW DATABASES;`}
              language="sql"
              showLineNumbers={false}
              theme={myCustomTheme}
            />
          </div>
          <p>
            This will print out the databases available in your MySQL setup. In our earlier docker-compose.yml configuration, we defined the database as 'example', so it should be printed out when running the above command. If not, you can simply run the following to create the 'example' database.
          </p>
          <div className="codeblock">
            <CodeBlock
              text={`CREATE DATABASE example;`}
              language="sql"
              showLineNumbers={false}
              theme={myCustomTheme}
            />
          </div>
          <p>
            To access this database and perform operations in it, run the following command:
          </p>
          <div className="codeblock">
            <CodeBlock
              text={`USE example;`}
              language="sql"
              showLineNumbers={false}
              theme={myCustomTheme}
            />  
          </div>
          <h3>Table Creation</h3>
          <p>
            Great! Now you're in the database 'example'. Databases are created in a more professional environment by a <i><b>schema design</b></i>, which is a way for users to understand the links between different <i><b>tables</b></i>. Tables are essentially stores of data in which a certain format is adhered to. Think of it like an Excel spreadsheet, but the column labels are specific to something. For example, to store all of a company's employee information, you would simply delegate one column for the 'firstname', another column for 'lastname', and perhaps a third column for 'email'. In the same way, tables in a relational database store information according to the columns. Let's go ahead and create our first database, which will be modeling what we just described.
          </p>
          <div className="codeblock">
            <CodeBlock
              text={table_create}
              language="sql"
              showLineNumbers={false}
              theme={myCustomTheme}
            />
          </div>
          <p>
            This table takes in an id which is auto generated, meaning, you don't need to put that information in yourself when inserting values. Think again of the Excel spreadsheet. There are columns, but also unique row numbers which correspond to a particular data value! This is similar, and very synonymous to the concept of an 'employee id'. So, the fields we do need to input for each employee are: firstname, lastname, age, job_title, and email. Note how every field has a <i><b>NOT NULL</b></i> tag appended to it except for job_title. This means that you can't have a row without those fields, but if an employee or person in the database doesn't have a job (kind of like a free agent), then they can have a null job_title field. Additionally, we designate the 'id' to be the <i><b>PRIMARY KEY</b></i>. A primary key essentially asks: "What field(s) would make it so we can uniquely identify each employee?". Since each new addition to the table would increment the 'id' (because of the AUTO_INCREMENT tag), there would be no two rows that have the same 'id' value. So yes, 'id' would uniquely identify a single person just like the row numbers on an Excel spreadsheet. That's the concept of a primary key in a nutshell! You can also have multiple fields as primary keys, but it's customary to just use an integer id.
          </p>
          <p>
            What if we have duplicate entries? We could have the same 'John Green' employee listed multiple times, but since the 'id' would auto increment, it'd be hard to distinguish between them. To combat this crazy oversight, we use the <i><b>UNIQUE</b></i> keyword to make it so that a particular field would never be repeated. Similar to the primary key idea, but this is to enforce unique entries into the table only! Our unique column is 'email', which means that no two rows can have the same email address. That makes sense, right? If a company is large enough, then there might be two people who have the same exact name! Not too common, but as I am a Patel by birth, and there are more of us than ants, it's very possible to have two Satyam Patels in one company. How do you distinguish between the two of them? Well, they certainly can't have the same email address or they'd be the same person!
          </p>
          <h3>Data Insertion Into Table</h3>
          <p>
            The next step in this database process is to actually insert data values as rows into the 'exampletable'. Here's an example to insert an employee into the table:
          </p>
          <div className="codeblock">
            <CodeBlock
              text={row_insert}
              language="sql"
              showLineNumbers={false}
              theme={myCustomTheme}
            />
          </div>
          <p>
            As we can see, we have one employee whose name is Johnny Appleseed. He's 24 years old and his profession is an Adventurer. If you'd like to reach him, his email is 'johnappleman@gmail.com'. Sounds like a hunk of a man ;) ! The format for entering rows into the database is very simple. You have to list the column names of the values you're entering (making sure that the 'NOT NULL' columns are ALWAYS present), and then match them up with the values of those columns after the 'VALUES' keyword. Since job_title can be null, you can remove that in subsequent row insertions. Additionally, if someone doesn't have a job when you're entering their information, and they happen to find a job later on, you can edit the values anytime!
          </p>
          <h3>Row Updates Within Table</h3>
          <p>
            Let's say Johnny Appleseed became too old after 50 years. He can't seem to adventure anymore and he's lost his hunkiness. Now, he's retired, so he has no job. Here's how to edit his data:
          </p>
          <div className="codeblock">
            <CodeBlock
              text={row_edit}
              language="sql"
              showLineNumbers={false}
              theme={myCustomTheme}
            />
          </div>
          <p>
            We are updating the 'exampletable' and setting (<i><b>SET</b></i>) the value of age to 74 (since it's been 50 years since we entered Johnny's information) and the value of job_title to NULL. We also need to provide a specific unique value to identify Johnny so that we can change the fields associated with that row. What are the unique values in each row? Well, we know the primary key 'id' is one since no two rows can have the same 'id' value. However, the easier one to remember would be the email of Johnny Appleseed, which is 'johnappleman@gmail.com'. Now, let's print out the table and see if the values are changed.
          </p>
          <div className="codeblock">
            <CodeBlock
              text={`SELECT * FROM exampletable;`}
              language="sql"
              showLineNumbers={false}
              theme={myCustomTheme}
            />
          </div>
          <h3>Accessing 'web' Container</h3>
          <p>
            Now that you have the updated values, let's try to print them out in our JavaScript web container! Do you understand the importance of databases and programming? Using a web-based language such as JavaScript and combining it with a database like our MySQL allows developers to create very intricate UIs showing all of the employee information! It's also possible to grab all of the employee's emails from the MySQL database and then send a mass company email to those addresses!
          </p>
          <p>
            Let's see if our data appears in our 'web' container! Navigate to your terminal and this time, run the 'docker exec -it [container-name] bash' command, replacing the 'db' container name with the 'web' container name. To recap, if you need to find the container name, type in 'docker ps', and copy the column labeled 'name'. In my case, the container name is 'docker-example_web_1', so my command would be:
          </p>
          <div className="codeblock">
            <CodeBlock
              text={`docker exec -it docker-example_web_1 bash`}
              language="bash"
              showLineNumbers={false}
              theme={myCustomTheme}
            />
          </div>
          <p>
            Now, you should be in the custom image we created from before, but as a running container. If you type 'ls', you should see a list of files pop up, and notice how it's ONLY the files we specified with the <i><b>COPY</b></i> command from the <i>compose_example/web/Dockerfile</i>. To run the sql.js file, you simply run the following: <i><b>node sql.js</b></i>. This command uses the node environment to interpret and execute the JavaScript file.
          </p>
          <p>
            You'll immediately run into an error: <i>Error: Cannot find module 'mysql2'</i>. Remember how we didn't use the COPY command within the Dockerfile in the web folder to send the 'node_modules' folder containing the downloaded modules over? This means that the module 'mysql2' isn't in our container, so we need to download it again. Luckily, if you remember, our <i>package-lock.json</i> has the references to these modules, so simply running 
          </p>
          <div className="codeblock">
            <CodeBlock
              text={`npm i`}
              language="bash"
              showLineNumbers={false}
              theme={myCustomTheme}
            />
          </div>
          <p>
            Then you'll re-download the mysql2 node package, since the reference is stored in your package-lock.json file! Imagine if you had 100s of modules downloaded. Wouldn't it be more portable to simply place the reference file (package-lock.json) into a public repository rather than sending that entire fat node_modules folder? Whoever copies your project on their computer could simply just run the above "npm i" command to install each of the packages mentioned in the reference file. Easy, right!?
          </p>
          <p>
            Now that you're done with downloading the single module we need for the SQL database connection, let's move on to the actual file itself we'll be using to grab information from our db service. Create a file called sql.js within the web folder. Here's the path of the file in case you're confused: <i>/compose_example/web/sql.js</i>. Within the sql.js file, copy the following into it:
          </p>
          <div className="codeblock">
            <CodeBlock
              text={sql_file}
              language="javascript"
              showLineNumbers={true}
              theme={myCustomTheme}
            />
          </div>
          <p>
            Hopefully the comments are also helpful! If you don't understand a lot of this, don't worry! This tutorial is to simply help you understand how to run Docker Compose. JavaScript is a very versatile language with some great features, so the syntax isn't as hard to grasp as something like Java or even C. We'll also come back to this file later, but for now, let's move on!
          </p>
          <p>
            Now you're done with the main JavaScript file, so go ahead and create the final part, the Dockerfile in the folder. Here's the relative path: <i>/compose_example/web/Dockerfile</i>. Within this Dockerfile, paste the following:
          </p>
          <div className="codeblock">
            <CodeBlock
              text={dockerfile}
              language="bash"
              showLineNumbers={true}
              theme={myCustomTheme}
            />
          </div>
          <h3>FROM</h3>
          <p>
            This one is relatively simple to understand! Let's break it down! The <i><b>FROM</b></i> keyword basically asks you: "Which image are we using as the base for this new image?". In our case, we're using the latest version of the node image, so we can write that in this format: image:version (node:latest).
          </p>
          <h3>WORKDIR</h3>
          <p>
            Moving on, the <i><b>WORKDIR</b></i> keyword asks you: "What's the root directory inside of the container in which work will occur?". Basically, when you boot up the container by running this newly created image from this Dockerfile, what directory will you be inside of? Note that whatever directory you decide to pick will be initially empty, so this <i>/web</i> folder we specified in the WORKDIR keyword will be a NEW folder inside of the eventual container with NOTHING inside (as of now).
          </p>
          <h3>COPY</h3>
          <p>
            Moving on, the <i><b>COPY</b></i> keyword allows you to copy a specific file or folder into a location specified in the container. The format is as such: COPY [host file to copy] [location in container to paste]. The '.' is special because it denotes the <i><b>relative</b></i> location. Since we know the folder we'll enter upon creating the container would be the <i>/web</i> folder (since it was specified as the root folder in the WORKDIR command..), we can equate the '.' keyword to the '/web' folder. We're essentially COPYING the package.json, package-lock.json, and the sql.js files into the /web folder within the container. So rest assured, when you run this Dockerfile and then run the container from the image it creates, you'll be loaded into a /web folder with the following: /web/package.json , /web/package-lock.json , and /web/sql.js files. This is MUCH more efficient than having to run a base node image as a container and then coding the functionality once more!
          </p>
          <h3>CMD</h3>
          <p>
            Lastly, the <i><b>CMD</b></i> keyword runs a particular terminal command which starts off the container itself. Each word of the command is split into different strings within a list, hence the format: ["command-part-one", "command-part-two", ...]. Here, 'tail -f /dev/null' is one command altogether, split into chunks for the Dockerfile to comprehend better. So what does this command even do? Well, it keeps the container running <b>forever</b>. Yes, you have that power! Normally, like you saw with the cowsay image, it'll run the cowsay application when you start it as a container, and then remove itself entirely. So, you don't have the power to access the container's files or see what the files consist of! When you run this 'tail -f /dev/null' command, it'll essentially print out the recursive list of ancestor files starting from /dev/null. Sadly, this one file in particular does not have any ancestors, so it'll run in a forever loop, unless you decide to terminate it personally!
          </p>
          <h2>'web' Service Configuration Part 2</h2>
          <p>
            We've come a long way! I hope you didn't forget what we branched out from! Let's go back to the docker-compose.yml file and attempt to understand the <i><b>build</b></i> tag again. Notice we put <i>./web/</i> as the location in which the Dockerfile is located. That's it! The docker-compose.yml file now knows where to build the 'web' service's image from now!
          </p>
          <p>
            Next on the 'web' service configuration is the <i><b>environment</b></i> tag. If you're familiar with env variables, then you've basically grasped what this is! If not, let me explain. There are some variables that are global to your computer. Meaning, if you type in your terminal something like:
          </p>
          <div className="codeblock">
            <CodeBlock
              text={`echo $[env variable name]`}
              language="bash"
              showLineNumbers={false}
              theme={myCustomTheme}
            />
          </div>
          <p>
            Then it will print out the value of that environment variable! Environment variables provide a convenient way to customize your application's runtime behavior. For instance, you can use environment variables within programming languages like JavaScript, Python, C, and more. Within this docker-compose.yml file, we have defined an environment variable <i><b>SATYA</b></i>, which will be accessible within the 'web' service (or container) only. This is simply a demonstration, but typically, environment variables are used to configure things like database connection credentials. Please remember that exposing sensitive information in a public docker-compose.yml file poses a security risk.
          </p>
          <p>
            For containers within a docker-compose environment to communicate, they need to be part of the same network. By defining the <i><b>networks</b></i> tag, we can ensure that our 'web' and 'db' services are able to interact. In this docker-compose.yml file, we have defined a network named <i>nodeapp</i>. There are a lot of configuration options available for docker networks, which are beyond the scope of this tutorial, but you can learn more <a href="https://docs.docker.com/compose/compose-file/06-networks/" style={{ textDecoration: 'none', color: "white" }}>here</a>.
          </p>
          <h2>'db' Service Configuration</h2>
          <p>
            Having covered the 'web' service, let's move on to the 'db' service, which shares similarities but has a few distinct elements. The <i><b>volumes</b></i> tag is a crucial component, as it creates persistent storage shared between the host and the container. This allows data to be stored and retrieved across multiple container lifecycles. For instance, what if all of the information you stored during your work session gets lost? You'd probably have a little murder on your mind! To regulate your stress levels, docker-compose allows you to create <i>volumes</i>, which are persisted stores of memory, so that you can add/delete rows each time you start a container and all of the previous data will be saved! How freakin' convenient!
          </p>
          <p>
            The <i>db_data</i> volume is where the MySQL database data is stored, and this volume is defined at the bottom of the docker-compose.yml file, similar to the networks. Additionally, you can bind mount a host OS directory to a directory within the container, which helps in persisting data written within the container. For instance, <i>~/dockerexample</i> is a directory in the home directory (~/) of the host, and it will store all of the data written to the <i>/var/lib/mysql-files/</i> directory in the container. A typical use case of this could be to export the entire database from the 'db' container to a CSV file, which you can then use on your host OS.
          </p>
          <p>
            The <i><b>restart</b></i> policy controls whether your service should be restarted when a failure occurs, which is particularly useful for services like databases that should be highly available. While there's no universally agreed-upon best practice for this, it's something important to consider when working with database images in a Docker Compose context.
          </p>
          <div className="codeblock">
            <CodeBlock
              text={`FROM mysql:latest`}
              language="bash"
              showLineNumbers={false}
              theme={myCustomTheme}
            />
          </div>
          <p>
            Now you might be thinking. Gee, what's the point of creating a new Dockerfile for the 'db' folder since it's only ONE line? And with that thinking, you'll go far in life. You can simply delete the file: <i>/compose_example/db/Dockerfile</i> and also the <i>build</i> tag within the 'db' service in the docker-compose.yml file. Replace the <i>build</i> tag with the following...
          </p>
          <div className="codeblock">
            <CodeBlock
              text={dockerfile_revise}
              language="bash"
              showLineNumbers={false}
              theme={myCustomTheme}
            />
          </div>
          <p>
            Instead of having a whole Dockerfile to create a mysql base image, you can just specify the image in the docker-compose.yml file itself. Makes this easier, right? Now, let's go on to actually running the application, since everything is set up! Go to your root directory: <i>/compose_example/</i> within your terminal and type the following:
          </p>
          <div className="codeblock">
            <CodeBlock
              text={`docker-compose up --build`}
              language="bash"
              showLineNumbers={false}
              theme={myCustomTheme}
            />
          </div>
          <p>
            You'll notice the images being built using the Dockerfile for the 'web' service, and the mysql image pulled for the 'db' service. After, it'll run the services as containers and keep them up. You can type 'docker ps' to list the running containers, and if you notice both of your services there, then congratulations! You've officially connected two containers in holy Docker matrimony!
          </p>
          <h2>Accessing Containers</h2>
          <p>
            Now, you'll want to access the containers themselves, and you can do so by running this command:
          </p>
          <div className="codeblock">
            <CodeBlock
              text={`docker exec -it [container-name] bash`}
              language="bash"
              showLineNumbers={false}
              theme={myCustomTheme}
            />
          </div>
          <p>
            If you're running Windows, the <i>bash</i> might not work the same, so try to find out which terminal type you're running to change that to one relative to your machine. The container name is also found by running 'docker ps', and it should be the last row listed. Once you run the 'docker exec' command, it should throw you in another file, which is your docker container. You can go inside either the 'web' container or the 'db' container, but we want to focus on the 'db' container so that we can set it up to allow database information to be printed on the 'web' container's <i>sql.js</i> file.
          </p>
          <h3>MySQL Setup</h3>
          <p>
            Run the 'docker exec' command with the 'db' container name listed in the 'docker ps' command, and then run the following line:
          </p>
          <div className="codeblock">
            <CodeBlock
              text={`mysql -uroot -p`}
              language="bash"
              showLineNumbers={false}
              theme={myCustomTheme}
            />
          </div>
          <p>
            This will prompt you to enter the password, which is the same password specified in the <i><b>MYSQL_ROOT_PASSWORD</b></i> environment variable from the docker-compose.yml file. In this case, it's <i>pword</i>, but you can change it to whatever you wish. Type in the password and then it'll give you a command prompt like such: <i>mysql&gt; </i>. You've successfully connected to the database! You can use MySQL commands now to navigate around. You can run the following sequentially:
          </p>
          <div className="codeblock">
            <CodeBlock
              text={`SHOW DATABASES;`}
              language="sql"
              showLineNumbers={false}
              theme={myCustomTheme}
            />
          </div>
          <p>
            This will print out the databases available in your MySQL setup. In our earlier docker-compose.yml configuration, we defined the database as 'example', so it should be printed out when running the above command. If not, you can simply run the following to create the 'example' database.
          </p>
          <div className="codeblock">
            <CodeBlock
              text={`CREATE DATABASE example;`}
              language="sql"
              showLineNumbers={false}
              theme={myCustomTheme}
            />
          </div>
          <p>
            To access this database and perform operations in it, run the following command:
          </p>
          <div className="codeblock">
            <CodeBlock
              text={`USE example;`}
              language="sql"
              showLineNumbers={false}
              theme={myCustomTheme}
            />  
          </div>
          <h3>Table Creation</h3>
          <p>
            Great! Now you're in the database 'example'. Databases are created in a more professional environment by a <i><b>schema design</b></i>, which is a way for users to understand the links between different <i><b>tables</b></i>. Tables are essentially stores of data in which a certain format is adhered to. Think of it like an Excel spreadsheet, but the column labels are specific to something. For example, to store all of a company's employee information, you would simply delegate one column for the 'firstname', another column for 'lastname', and perhaps a third column for 'email'. In the same way, tables in a relational database store information according to the columns. Let's go ahead and create our first database, which will be modeling what we just described.
          </p>
          <div className="codeblock">
            <CodeBlock
              text={table_create}
              language="sql"
              showLineNumbers={false}
              theme={myCustomTheme}
            />
          </div>
          <p>
            This table takes in an id which is auto generated, meaning, you don't need to put that information in yourself when inserting values. Think again of the Excel spreadsheet. There are columns, but also unique row numbers which correspond to a particular data value! This is similar, and very synonymous to the concept of an 'employee id'. So, the fields we do need to input for each employee are: firstname, lastname, age, job_title, and email. Note how every field has a <i><b>NOT NULL</b></i> tag appended to it except for job_title. This means that you can't have a row without those fields, but if an employee or person in the database doesn't have a job (kind of like a free agent), then they can have a null job_title field. Additionally, we designate the 'id' to be the <i><b>PRIMARY KEY</b></i>. A primary key essentially asks: "What field(s) would make it so we can uniquely identify each employee?". Since each new addition to the table would increment the 'id' (because of the AUTO_INCREMENT tag), there would be no two rows that have the same 'id' value. So yes, 'id' would uniquely identify a single person just like the row numbers on an Excel spreadsheet. That's the concept of a primary key in a nutshell! You can also have multiple fields as primary keys, but it's customary to just use an integer id.
          </p>
          <p>
            What if we have duplicate entries? We could have the same 'John Green' employee listed multiple times, but since the 'id' would auto increment, it'd be hard to distinguish between them. To combat this crazy oversight, we use the <i><b>UNIQUE</b></i> keyword to make it so that a particular field would never be repeated. Similar to the primary key idea, but this is to enforce unique entries into the table only! Our unique column is 'email', which means that no two rows can have the same email address. That makes sense, right? If a company is large enough, then there might be two people who have the same exact name! Not too common, but as I am a Patel by birth, and there are more of us than ants, it's very possible to have two Satyam Patels in one company. How do you distinguish between the two of them? Well, they certainly can't have the same email address or they'd be the same person!
          </p>
          <h3>Data Insertion Into Table</h3>
          <p>
            The next step in this database process is to actually insert data values as rows into the 'exampletable'. Here's an example to insert an employee into the table:
          </p>
          <div className="codeblock">
            <CodeBlock
              text={row_insert}
              language="sql"
              showLineNumbers={false}
              theme={myCustomTheme}
            />
          </div>
          <p>
            As we can see, we have one employee whose name is Johnny Appleseed. He's 24 years old and his profession is an Adventurer. If you'd like to reach him, his email is 'johnappleman@gmail.com'. Sounds like a hunk of a man ;) ! The format for entering rows into the database is very simple. You have to list the column names of the values you're entering (making sure that the 'NOT NULL' columns are ALWAYS present), and then match them up with the values of those columns after the 'VALUES' keyword. Since job_title can be null, you can remove that in subsequent row insertions. Additionally, if someone doesn't have a job when you're entering their information, and they happen to find a job later on, you can edit the values anytime!
          </p>
          <h3>Row Updates Within Table</h3>
          <p>
            Let's say Johnny Appleseed became too old after 50 years. He can't seem to adventure anymore and he's lost his hunkiness. Now, he's retired, so he has no job. Here's how to edit his data:
          </p>
          <div className="codeblock">
            <CodeBlock
              text={row_edit}
              language="sql"
              showLineNumbers={false}
              theme={myCustomTheme}
            />
          </div>
          <p>
            We are updating the 'exampletable' and setting (<i><b>SET</b></i>) the value of age to 74 (since it's been 50 years since we entered Johnny's information) and the value of job_title to NULL. We also need to provide a specific unique value to identify Johnny so that we can change the fields associated with that row. What are the unique values in each row? Well, we know the primary key 'id' is one since no two rows can have the same 'id' value. However, the easier one to remember would be the email of Johnny Appleseed, which is 'johnappleman@gmail.com'. Now, let's print out the table and see if the values are changed.
          </p>
          <div className="codeblock">
            <CodeBlock
              text={`SELECT * FROM exampletable;`}
              language="sql"
              showLineNumbers={false}
              theme={myCustomTheme}
            />
          </div>
          <h3>Accessing 'web' Container</h3>
          <p>
            Now that you have the updated values, let's try to print them out in our JavaScript web container! Do you understand the importance of databases and programming? Using a web-based language such as JavaScript and combining it with a database like our MySQL allows developers to create very intricate UIs showing all of the employee information! It's also possible to grab all of the employee's emails from the MySQL database and then send a mass company email to those addresses!
          </p>
          <p>
            Let's see if our data appears in our 'web' container! Navigate to your terminal and this time, run the 'docker exec -it [container-name] bash' command, replacing the 'db' container name with the 'web' container name. To recap, if you need to find the container name, type in 'docker ps', and copy the column labeled 'name'. In my case, the container name is 'docker-example_web_1', so my command would be:
          </p>
          <div className="codeblock">
            <CodeBlock
              text={`docker exec -it docker-example_web_1 bash`}
              language="bash"
              showLineNumbers={false}
              theme={myCustomTheme}
            />
          </div>
          <p>
            Now, you should be in the custom image we created from before, but as a running container. If you type 'ls', you should see a list of files pop up, and notice how it's ONLY the files we specified with the <i><b>COPY</b></i> command from the <i>compose_example/web/Dockerfile</i>. To run the sql.js file, you simply run the following: <i><b>node sql.js</b></i>. This command uses the node environment to interpret and execute the JavaScript file.
          </p>
          <p>
            You'll immediately run into an error: <i>Error: Cannot find module 'mysql2'</i>. Remember how we didn't use the COPY command within the Dockerfile in the web folder to send the 'node_modules' folder containing the downloaded modules over? This means that the module 'mysql2' isn't in our container, so we need to download it again. Luckily, if you remember, our <i>package-lock.json</i> has the references to these modules, so simply running 
          </p>
          <div className="codeblock">
            <CodeBlock
              text={`npm i`}
              language="bash"
              showLineNumbers={false}
              theme={myCustomTheme}
            />
          </div>
          <p>
            Then you'll re-download the mysql2 node package, since the reference is stored in your package-lock.json file! Imagine if you had 100s of modules downloaded. Wouldn't it be more portable to simply place the reference file (package-lock.json) into a public repository rather than sending that entire fat node_modules folder? Whoever copies your project on their computer could simply just run the above "npm i" command to install each of the packages mentioned in the reference file. Easy, right!?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Blog2;

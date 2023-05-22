# **Azion Templates**

Project developed with Typescript and Jest (unit tests). Also added some lint test automation tools (.vscode) and commit controls (.husky).

## **1. Wordpress Azion with AWS**

This template create a wordpress blog from scratch using a AWS infrastructure. Also, configure AZION edge application with domain and pre configured rules engines.

### **1.1. Enviroment variables**

To start we need AWS crendentials keys:

- **AWS Access Key ID**;
- **AWS Secret Access Key**;

> **Obs:** This must be temporary just for running the template. And msut have permission to create a EC2 machine and execute cloudformation script.

As well, we need other environment variables to database and AZION edge application:

Wordpress variables:

>- **Database User** (MYSQL_DB_USER) database username; 
>- **Database User Password** (MYSQL_DB_PASSWORD) user password;
>- **Database Root Password** (MYSQL_DB_ROOT_PASSWORD) root user password; 

AZION variables:

>- **Application Name** (AZION_APP_NAME) application name;
>- **Azion Api URL** (AZION_API_URL) azion api url;
>- **Azion Personal Token** (AZION_PERSONAL_TOKEN) azion personal token (or cookies);
>- **Azion Cookie** (COOKIE_AUTH_NAME && COOKIE_NAME) azion cookie azsid;

> **Obs:** In script runner we can user cookie session to acess api.

### **1.2. Executions** 

The construction happen in two stage:

1. **Build the AWS infrastructure**
  - Start cloudformation script;
  - Deploy a EC2 machine (t3.micro - free tier);
  - And define a external IP;

2. **Configure AZION edge application**
  - Configure a new edge application;
  - Define the new origem EC2 IP (from AWS build);
  - Create a new domain to acess the edge application;
  - Create some cache rules to static and images files;
  - Add new engine rules to cache page and ignore admin url (wp-);

### **1.3. Notes**

>- To create a EC2 virutal machine we need a keyPair and this key take the same edge application name (AZION_APP_NAME).
>- The first acess to wordpress must be via Azion Domain, because the wordpress configure "BASE URL" from current first acess URL;
>- Due to third-party account access we don't make rollback. For security reasons we don't perfome delete action in third-party account;
>- There is a minimum requiriment to database password ( regex: [a-zA-Z0-9]*);

### **1.4. To do**
- Add error handling when the AWS doesn't have permission to excute script;
- Add error handling to Azion API calls;
# CarManagementSystem

This application allows you to manage cars, register as a dealer or customer, and easily log in to access your car management dashboard.

**Frontend**: React App  
**Backend**: Web API in Visual Studio  
**Database**: SQL Database

## Installation

Steps to install and run the project locally.

### Frontend Installation (React):

1. Clone the repository:
   ```bash
   git clone https://github.com/sivaveduru/webapi-react-sql
   cd webapi-react-sql/car-management-frontend
   code .

2. Install Dependencies:
   ```bash
   npm install
   npm install react-dom
   npm install react-router-dom

3. Run the App:
   ```bash
   npm run build
   npm run start

   
## Backend Installation (Web API in Visual Studio)
1. open webapi-react-sql folder:
   ```bash
   cd CarManagementSystem
   devenv CarManagementSystem.sln

   
 OR, 
       simply open .sln file in CarManagementSystem/CarManagementSystem.sln



2. Install Dependencies:
  
   once solution file open in visual studio, press right click on solution folder,
   click on Manage Nuget Packages from menu. search for below packages.
    ```bash
   Microsoft.NETCore.App
   Microsoft.AspNetCore.App
   Microsoft.aspnetcore.cors
   Microsoft.entityframeworkcore.sqlserver
   Microsoft.entityframeworkcore.tools
   

4. Run the App:
 
   step: 1  from menu:  Build, click on build solution from dropdown list.
   
   step: 2  from menu:  select https, run the https. you will see URL Page. <https://localhost:7242/swagger/index.html>
   

![HottieDancingGIF](https://github.com/user-attachments/assets/c4910c1a-afd5-4416-b904-fc14344a40f8)



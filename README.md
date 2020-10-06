<h1 align="center"> :mechanic: MAINTENANCE MEMO </h1>
<h4 align="center">
 Project for maintenance management of electric motors in industrial production processes.
</h4>

<p align="center">
  <img alt="javaScript" src="https://img.shields.io/github/languages/top/ejcosta12/maintenance-memo">
  <img alt="javaScript" src="https://img.shields.io/github/license/ejcosta12/maintenance-memo?style=plastic">
</p>

## :camera: About
<p align="center">
  <span>✅ <strong>Motor Register</strong> </span>
  <span>✅ <strong>Maintenance Register</strong> </span>
  <span>✅ <strong>Motors gallery</strong> </span>
</p>
<p align="center">
  <span>✅ <strong>Motor data</strong> </span>
  <span>✅ <strong>Update Location Motor</strong> </span>
  <span>✅ <strong>Motors notifications and message status</strong> </span>
</p>
<p align="center">
  <img alt="screen-shot-01" src="https://res.cloudinary.com/dggw1b0tr/image/upload/v1593102111/Maintenance-Memo/screenShot01_a0v4jk.png"></img>
  </br>
  </br>
  <img alt="screen-shot-02" src="https://res.cloudinary.com/dggw1b0tr/image/upload/v1593102111/Maintenance-Memo/screenShot02_lvq6p2.png"></img>
  </br>
  </br>
  <img alt="screen-shot-03" src="https://res.cloudinary.com/dggw1b0tr/image/upload/v1593102113/Maintenance-Memo/screenShot03_tdbuyy.png"></img>
  </br>
  </br>
  <img alt="screen-shot-04" src="https://res.cloudinary.com/dggw1b0tr/image/upload/v1593102111/Maintenance-Memo/screenShot04_xxy2qi.png"></img>
  </br>
  </br>
</p>
<p align="justify">
 <strong>
  This project is oriented towards the end of course work "SISTEMA WEB ORIENTADO A MOTORES ELÉTRICOS NO CONTEXTO INDUSTRIAL", presented to the electrical engineering course, its main objective is to reduce damage to electric motors in the     industrial environment. Through the maintenance team itself the data can be registered and the system guides decisions for maintenance and inspection of the equipments.
 </strong>
</p>
<p>
 🔋 TypeScript | ⌨ NodeJs | 💻 React | 💾 PostgreSQL
</p>

### /back-end

#### Technology

- NodeJS
- Database PostgreSQL
- TypeORM
- Express
- Cors
- UuidV4
- Date-fns

#### Scripts CLI

```yarn```
Installation of all necessary dependencies.

```yarn typeorm migration:run```
Using a postgreSQL database with the name of maintenance_memo, port 5432 "for the development was used Docker container" execute the command above and wait for the migrations to create tables and settings in the bank. Connection settings, such as username and password, can be seen in the ormconfig.json file.

```yarn dev:server```
Boot the system by node, localhost port 3333.

### /maintenance-memo-web

#### Technology

- Create React App
- Axios
- Formik
- Styled Components
- Date-fns

#### Scripts CLI

```yarn```
Installation of all necessary dependencies.

```yarn start```
Start the application at the address localhost using port 3000.

### I thank GOD for the evolution of all this work, from its idealization, theoretical development, to its practical conception!

#### This project will continue with the creation of the users area with the proposal of a reusable dashboard for other systems.

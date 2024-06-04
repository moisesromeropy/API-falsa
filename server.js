const express = require("express");
const app = express();
const port = 8001;
const { faker } = require('@faker-js/faker');
const users = require("./users");
const companies = require("./companies");
const direccion = require("./direccion");
// or, if desiring a different locale
// const { fakerDE: faker } = require('@faker-js/faker');
const userss = [];
const companiess = []; 

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/api/users",(req, res) =>{
    // Devolver el array de usuarios en formato JSON
    res.status(200).json(userss);
});

app.get("/api/companies", (req, res)=>{
    res.status(200).json(companiess);
})

app.post("/api/users/new", (req, res) =>{
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const newUser = new users(
        faker.string.uuid(),
        firstName,
        lastName,
        faker.phone.number(),
        faker.helpers.unique(faker.internet.email, [
            firstName,
            lastName,
          ]),
        faker.internet.password
    )
    userss.push(newUser);
    res.status(201).json(newUser);
});

app.post("/api/companies/new", (req, res) => {
    const address = new direccion(
        faker.location.street(),
        faker.location.city(),
        faker.location.state(),
        faker.location.countryCode(),
        faker.location.country()
    )
    const newCompany = new companies(
        faker.string.uuid(),
        faker.company.name(),
        address
    )
    companiess.push(newCompany);
    res.status(201).json(newCompany);
});

app.post("/api/user/company", (req, res) =>{
    // Generar un nuevo usuario
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const newUser = new users(
        faker.datatype.uuid(),
        firstName,
        lastName,
        faker.phone.number(),
        faker.helpers.unique(faker.internet.email, [
            firstName,
            lastName,
          ]),
        faker.internet.password()
    );
    // Agregar el nuevo usuario al arreglo de usuarios
    userss.push(newUser);
    
    // Generar una nueva compañía
    const address = new direccion(
        faker.location.street(),
        faker.location.city(),
        faker.location.state(),
        faker.location.countryCode(),
        faker.location.country()
    );
    const newCompany = new companies(
        faker.string.uuid(),
        faker.company.name(),
        address
    );
    // Agregar la nueva compañía al arreglo de compañías
    companiess.push(newCompany);
    
    // Responder una vez que se hayan agregado el usuario y la compañía
    res.status(201).json({ user: newUser, company: newCompany });
});

app.listen(port , () => console.log(`Listening on port: ${port} `));


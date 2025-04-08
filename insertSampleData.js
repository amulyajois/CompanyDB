const mongoose = require("mongoose");
require("dotenv").config();
require("./db");

const Department = require("./models/department");
const Project = require("./models/project");
const Employee = require("./models/employee");
const Dependent = require("./models/dependent");

async function insertData() {
  try {
    // Clear existing data
    await Department.deleteMany({});
    await Project.deleteMany({});
    await Employee.deleteMany({});
    await Dependent.deleteMany({});

    // 🔹 Departments
    const research = await new Department({
      name: "Research",
      number: 1,
      locations: ["New York", "Boston"],
      managerStartDate: new Date("2022-01-01"),
    }).save();

    const accounting = await new Department({
      name: "Accounting",
      number: 2,
      locations: ["Chicago"],
      managerStartDate: new Date("2021-06-01"),
    }).save();

    const it = await new Department({
      name: "IT",
      number: 3,
      locations: ["San Francisco", "Seattle"],
      managerStartDate: new Date("2023-01-15"),
    }).save();

    // 🔹 Employees (managers first, to assign them to departments)
    const manager1 = await new Employee({
      name: "Alice Smith",
      ssn: "123-45-6789",
      address: "123 Main St",
      salary: 90000,
      gender: "F",
      birthDate: new Date("1985-04-23"),
      department: research._id,
    }).save();
    research.manager = manager1._id;
    await research.save();

    const manager2 = await new Employee({
      name: "Bob Johnson",
      ssn: "987-65-4321",
      address: "456 Elm St",
      salary: 85000,
      gender: "M",
      birthDate: new Date("1979-10-15"),
      department: accounting._id,
    }).save();
    accounting.manager = manager2._id;
    await accounting.save();

    const manager3 = await new Employee({
      name: "Carol Lee",
      ssn: "111-22-3333",
      address: "789 Oak St",
      salary: 95000,
      gender: "F",
      birthDate: new Date("1988-12-02"),
      department: it._id,
    }).save();
    it.manager = manager3._id;
    await it.save();

    // 🔹 Other Employees with supervisors
    const emp4 = await new Employee({
      name: "David Miller",
      ssn: "222-33-4444",
      address: "101 Pine St",
      salary: 70000,
      gender: "M",
      birthDate: new Date("1990-05-10"),
      department: research._id,
      supervisor: manager1._id,
    }).save();

    const emp5 = await new Employee({
      name: "Eva Green",
      ssn: "333-44-5555",
      address: "202 Cedar St",
      salary: 68000,
      gender: "F",
      birthDate: new Date("1992-07-18"),
      department: accounting._id,
      supervisor: manager2._id,
    }).save();

    const emp6 = await new Employee({
      name: "Frank White",
      ssn: "444-55-6666",
      address: "303 Maple St",
      salary: 72000,
      gender: "M",
      birthDate: new Date("1987-11-09"),
      department: it._id,
      supervisor: manager3._id,
    }).save();

    // 🔹 Projects
    const proj1 = await new Project({
      name: "AI Development",
      number: 101,
      location: "New York",
      department: research._id,
    }).save();

    const proj2 = await new Project({
      name: "Data Analytics",
      number: 102,
      location: "Boston",
      department: research._id,
    }).save();

    const proj3 = await new Project({
      name: "Financial Auditing",
      number: 201,
      location: "Chicago",
      department: accounting._id,
    }).save();

    const proj4 = await new Project({
      name: "Cybersecurity",
      number: 301,
      location: "San Francisco",
      department: it._id,
    }).save();

    const proj5 = await new Project({
      name: "Cloud Migration",
      number: 302,
      location: "Seattle",
      department: it._id,
    }).save();

    // 🔹 Assign Projects to Employees
    await Employee.findByIdAndUpdate(emp4._id, {
      projects: [
        { project: proj1._id, hoursPerWeek: 25 },
        { project: proj2._id, hoursPerWeek: 10 },
      ],
    });

    await Employee.findByIdAndUpdate(emp5._id, {
      projects: [{ project: proj3._id, hoursPerWeek: 30 }],
    });

    await Employee.findByIdAndUpdate(emp6._id, {
      projects: [
        { project: proj4._id, hoursPerWeek: 20 },
        { project: proj5._id, hoursPerWeek: 15 },
      ],
    });

    // 🔹 Dependents
    await new Dependent({
      employee: manager1._id,
      firstName: "Tommy",
      gender: "M",
      birthDate: new Date("2010-06-15"),
      relationship: "Son",
    }).save();

    await new Dependent({
      employee: manager2._id,
      firstName: "Anna",
      gender: "F",
      birthDate: new Date("2008-03-10"),
      relationship: "Daughter",
    }).save();

    await new Dependent({
      employee: emp4._id,
      firstName: "Sarah",
      gender: "F",
      birthDate: new Date("2015-09-22"),
      relationship: "Daughter",
    }).save();

    await new Dependent({
      employee: emp5._id,
      firstName: "Liam",
      gender: "M",
      birthDate: new Date("2012-01-30"),
      relationship: "Son",
    }).save();

    console.log("✅ Full sample data inserted successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error inserting data:", err);
    process.exit(1);
  }
}

insertData();

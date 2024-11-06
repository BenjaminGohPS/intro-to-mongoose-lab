require("dotenv").config();
const mongoose = require("mongoose");

const Customers = require("./src/models/Customers");
const prompt = require("prompt-sync")();

// const username = prompt("What is your name? ");
// console.log(`Your name is ${username}`);

// const crmMenu = prompt(`Welcome to the CRM \n
// What would you like to do?\n
//     1. Create a customer
//     2. View all customers
//     3. Upodate a customer
//     4. Delete a customer
//     5. quit\n`);

// console.log(`Number of action to run: \n
//     # user inputs ${crmMenu}`);

const crmMenu = async () => {
  const menu = prompt(`Welcome to the CRM \n
        What would you like to do?\n
            1. Create a customer
            2. View all customers
            3. Update a customer
            4. Delete a customer
            5. quit\n`);

  console.log(`Number of action to run: \n# user inputs ${menu}`);
  switch (menu) {
    case "1":
      await createCustomer();
      break;
    case "2":
      await viewAllCustomers();
      break;
    case "3":
      await updateCustomers();
      break;
    case "4":
      await deleteCustomer();
      break;
    case "5":
      console.log("exiting...");
      process.exit();
      break;
    default:
      console.log("Please key numbers 1 to 5 only");
      await crmMenu();
  }
};
/*------------------------------ Starter Code ------------------------------*/

// const mongoose = require("mongoose");
// const Todo = require("./models/todo.js");

// const connect = async () => {
//   await mongoose.connect(process.env.MONGODB_URI);
//   console.log("Connected to MongoDB");
//   await runQueries();

//   await mongoose.disconnect();
//   console.log("Disconnected from MongoDB");
//   process.exit();
// };

// connect();

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");
  await crmMenu();

  //   await mongoose.disconnect();
  //   console.log("Disconnected from MongoDB");
  //   process.exit();
};

connect();
/*----------------------------- Query Functions -----------------------------*/

// const createTodo = async () => {
//   const todoData = {
//     text: "learn React",
//     isComplete: false,
//   };
//   const todo = await Todo.create(todoData);
//   console.log("New todo:", todo);
// };

// const findTodos = async () => {
//   const todos = await Todo.find({});
//   console.log("All todos:", todos);
// };

// const createCustomer = async () => {
//   const customerData = {
//     name: "Alvin",
//     age: 20,
//     isComplete: false,
//   };
//   const customer = await customersModel.create(customerData);
//   console.log("New customer:", customer);
// };

const viewAllCustomers = async () => {
  const allCustomers = await Customers.find();
  console.log("All customer:", allCustomers);
  crmMenu();
};

const createCustomer = async () => {
  const customerData = {
    name: prompt("Enter the customer's name: "),
    age: prompt("Enter the customer's age: "),
  };
  const customer = await Customers.create(customerData);
  console.log("New customer:", customer);
  crmMenu();
};

const updateCustomers = async () => {};

const deleteCustomer = async () => {
  const customerId = prompt("Enter the customer's id: ");

  const customer = await Customers.findByIdAndDelete(customerId);
  console.log("Deleted customer:", customer);
  crmMenu();
};
/*------------------------------- Run Queries -------------------------------*/

const runQueries = async () => {
  console.log("Queries running.");
  await createTodo();
};

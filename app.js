require("dotenv").config();
const mongoose = require("mongoose");

const Customers = require("./src/models/Customers");
const prompt = require("prompt-sync")();

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
      await updateCustomer();
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

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");
  await crmMenu();
};

connect();
/*----------------------------- Query Functions -----------------------------*/

const viewAllCustomers = async () => {
  const allCustomers = await Customers.find();
  if (allCustomers.length !== 0) {
    console.log("All customer:", allCustomers);
    crmMenu();
  } else {
    console.log("There are no customers. Please add some to the CRM");
    await crmMenu();
  }
};

const createCustomer = async () => {
  const customerData = {
    name: prompt("Enter the customer's name: "),
    age: prompt("Enter the customer's age: "),
  };
  const customer = await Customers.create(customerData);
  console.log("New customer:", customer);
  await crmMenu();
};

const updateCustomer = async () => {
  console.log(`Below is a list of customers:\n`, await Customers.find());

  const customerId = prompt(
    `Copy and paste the id of the customer you would like to update here:\n`
  );
  console.log(`# user inputs ${customerId}`);
  const customer = await Customers.findByIdAndUpdate(customerId, {
    Name: prompt(`What is the customer's new name?\n`),
    Age: prompt(`What is the customer's new age?\n`),
  });
  console.log("Details updated:", customer);
  await crmMenu();
};

const deleteCustomer = async () => {
  const customerId = prompt("Enter the customer's id: ");
  const customer = await Customers.findById(customerId);
  if (customer) {
    await Customers.findByIdAndDelete(customerId);
    console.log("Deleted customer:", customer);
    await crmMenu();
    ``;
  } else {
    console.log("Customer not found");
    await crmMenu();
  }
};

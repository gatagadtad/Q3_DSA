// user info 
const users = [{ username: "seller1", password: "pass1" }];

// Items
const inventory = { Pasta: [], Desserts: [], Drinks: [] };

// Customer cart to store list 
let cart = [];

// Check username n password (for sellers)
function authenticate(username, password) {
  for (const user of users) {
    if (user.username === username && user.password === password) {
      return true; // Found a match
    }
  }
  return false;
}

// Show the available items
function displayInventory() {
  console.log("Available Items:");
  for (const category in inventory) {
    console.log(`${category}:`);
    if (inventory[category].length > 0) {
      inventory[category].forEach(item => {
        console.log(`- ${item.name} ($${item.price})`); // Show item details
      });
    } else {
      console.log("  No items available."); // Nothing in this category
    }
  }
}

// menu for sellers to manage the inventory
function sellerMenu() {
  const username = prompt("Enter your seller username:");
  const password = prompt("Enter your seller password:");

  if (!authenticate(username, password)) {
    alert("Invalid username or password!");
    return; // Stop if login fails
  }

  let action;
  do {
    action = prompt("Choose: LOGOUT, ADD, or REMOVE").toLowerCase();

    if (action === "add") {
      const category = prompt("Enter category (Pasta, Desserts, Drinks):");
      if (!inventory[category]) {
        alert("Invalid category!"); // If category is wrong
        continue;
      }

      const name = prompt("Enter the name of the item:");
      const price = parseFloat(prompt("Enter the price of the item:"));
      inventory[category].push({ name, price }); // Add the new item
      alert(`Item "${name}" added to ${category} category.`);
    } else if (action === "remove") {
      const category = prompt("Enter category (Pasta, Desserts, Drinks):");
      if (!inventory[category]) {
        alert("Invalid category!"); // Category is not valid
        continue;
      }

      const name = prompt("Enter the name of the item to remove:");
      const index = inventory[category].findIndex(item => item.name === name); // Find item
      if (index !== -1) {
        inventory[category].splice(index, 1); // Remove item
        alert(`Item "${name}" removed from ${category} category.`);
      } else {
        alert("Item not found!"); // Couldn't find it
      }
    }
  } while (action !== "logout");
}

// Menu for customers
function customerMenu() {
  let action;
  do {
    displayInventory(); // Show the inventory
    action = prompt("Choose: ORDER, CART, or CANCEL").toLowerCase();

    if (action === "order") {
      const category = prompt("Enter category (Pasta, Desserts, Drinks):");
      if (!inventory[category]) {
        alert("Invalid category!"); // Wrong category
        continue;
      }

      const itemName = prompt("Enter the name of the item to order:");
      const quantity = parseInt(prompt("Enter quantity:"), 10);

      const item = inventory[category].find(item => item.name === itemName); // Find item
      if (item) {
        cart.push({ name: item.name, price: item.price, quantity }); // Add to cart
        alert(`${quantity}x ${itemName} added to your cart.`);
      } else {
        alert("Item not found!"); // Wrong item name
      }
    } else if (action === "cart") {
      handleCart(); // Go to cart
    }
  } while (action !== "cancel");
}

// Manage the customer's cart
function handleCart() {
  let action;
  do {
    console.log("Your Cart:");
    if (cart.length === 0) {
      console.log("  Cart is empty."); // Nothing in cart
    } else {
      cart.forEach((item, index) => {
        console.log(
          `${index + 1}. ${item.name} - $${item.price} x ${item.quantity} = $${item.price * item.quantity}`
        ); // Show items in the cart
      });
    }

    action = prompt("Choose: PRINT, REMOVE, or CANCEL").toLowerCase();

    if (action === "remove") {
      const itemName = prompt("Enter the name of the item to remove:");
      const index = cart.findIndex(item => item.name === itemName); // Find item
      if (index !== -1) {
        cart.splice(index, 1); // Remove item
        alert(`${itemName} removed from the cart.`);
      } else {
        alert("Item not found in cart!"); // Item doesn't exist
      }
    } else if (action === "print") {
      let total = 0;
      console.log("Cart Summary:");
      cart.forEach(item => {
        const itemTotal = item.price * item.quantity; // Calculate cost
        total += itemTotal; // Add to total
        console.log(`${item.name} - $${item.price} x ${item.quantity} = $${itemTotal}`);
      });
      console.log(`Total: $${total}`); // Show total
    }
  } while (action !== "cancel");
}

// Main program flow
function main() {
  let userType;
  do {
    userType = prompt("Are you a SELLER or CUSTOMER? (Type EXIT to quit)").toLowerCase();

    if (userType === "seller") {
      sellerMenu(); 
    } else if (userType === "customer") {
      customerMenu(); 
    }
  } while (userType !== "exit");

  alert("Thank you for using the kiosk program!"); // End of program
}

// Start the program
main();
const insertProductArr = (incomingArr, dbArr) => {
  for (let i = 0; i < incomingArr.length; i++) {
    let found = false;
    for (let j = 0; j < dbArr.length; j++) {
      if (incomingArr[i].productId == dbArr[j].product) {
        dbArr[j].quantity += incomingArr[i].quantity;
        found = true;
        break; // Exit the loop once the product is found and updated
      }
    }
    if (!found) {
      // If the product is not found in the database array, add it
      dbArr.push(incomingArr[i]);
    }
  }
};

export { insertProductArr };

var ID = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return Math.random().toString(36).substr(2, 9);
  };
   


// Sress test: 


const myValues = {};
for (let i=0;i<1000000;i++){
    let unique = ID();
    console.log(unique);
    if (myValues[unique]){
        console.log("exists", myValues[unique], unique, "in loop number: ", i);
        break;
    }else {
        myValues[unique] = unique;
        console.log("my new unique value is: ", unique, "\n");
    }
}
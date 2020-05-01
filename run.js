console.log(0);

Promise.resolve().then(() => {
  console.log(1);
});

require("fs").readFile("./db.pdman.json", () => {
  console.log(2);
  
  process.nextTick(() => {
    console.log(3);
  });

  setTimeout(() => {
    console.log(4);
  });

  process.nextTick(() => {
    console.log(5);
  });
  
  setImmediate(() => {
    console.log(6);
  });
});

setTimeout(() => {
  console.log(7);
});

process.nextTick(() => {
  console.log(8);
});

console.log(9);

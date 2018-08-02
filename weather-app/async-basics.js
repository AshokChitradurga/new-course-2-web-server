
console.log('Statring app');

setTimeout(() => {
    console.log('Inside the callback');
}, 2000);

setTimeout(() => {
    console.log('executed callback');
}, 0);

console.log('Finishing up');
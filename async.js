let getName = async () => {
    let timer = null;
    timer = setInterval(() => {
        clearInterval(timer)
        return console.log("done!");

    }, 1500);
};

let secondName = async () => {
    let timer = null;
    timer = setInterval(() => {
        clearInterval(timer);
      return console.log("second timer!");
        
    }, 1000);
}
    
    
let start = async () => {

    // let wait = await result();

    let res = await Promise.all([getName(), secondName()])
    // let trySecond = await newWait();
    
    return res;

}
start()


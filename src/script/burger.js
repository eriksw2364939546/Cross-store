function initialBurger(){
    let burgerBtn = document.querySelector("#burger")
    let headerNav = document.querySelector("header nav")
    let body = document.querySelector("body")

    burgerBtn.addEventListener("click", () =>{
        burgerBtn.classList.toggle("open")
        headerNav.classList.toggle("open")
        body.classList.toggle("open")
    })
    
}


export default initialBurger
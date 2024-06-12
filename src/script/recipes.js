import { getProductsFromCard, sendDataTelegramm } from "../service/service.js";
import { renderBasketProd } from "./basket.js";
import { saveProductFromCard } from "../service/service.js";

let recipesForm = document.querySelector(".checkout form")
let recipesInps = document.querySelectorAll(".checkout input")
let checkoutList = document.querySelector(".checkout__list")
let messageSuccessfully = document.querySelector(".checkout__message-successfully")
let allProds = getProductsFromCard()

let allPriceProd = document.querySelector(".checkout__all-price span")


renderBasketProd(allProds, checkoutList, allPriceProd)

checkoutList.addEventListener("click", (event) => {
	let cardId = event.target.closest(".prod__basket").dataset.id
	let index = allProds.findIndex(el => el.id === cardId)

	//  console.log(event.target)

	if (event.target.closest(".prod__basket-minus")) {
		allProds[index].counter === 1 ? allProds.splice(index, 1) : allProds[index].counter--

	}
	if (event.target.closest(".prod__basket-plus")) {
		allProds[index].counter < 10 && allProds[index].counter++
	}
	if (event.target.closest(".prod__basket-delete")) {
		allProds.splice(index, 1)
	}
	saveProductFromCard(allProds)
	renderBasketProd(allProds, checkoutList, allPriceProd)

})

recipesForm.addEventListener("submit", (event) => {
	event.preventDefault()


	// recipesInps.value = "" / udalit inp.value posle otpravki formi


	let allProdsMessage = ""

	allProds.forEach(element => {
		allProdsMessage += `Product ${element.id} - ${element.counter} quantity. \n`
	})

	let allPrice = allProds.reduce((acc, value) => acc + value.price * value.counter, 0)

	let message = `New order from the site!\n\nRecipient information:\n\n${recipesInps[0].value}\n${recipesInps[1].value}\n${recipesInps[2].value}\n${recipesInps[3].value}\n\nProducts:\n\n${allProdsMessage}\n\nAll price: ${allPrice} $`

	sendDataTelegramm(message).then(() => {
		messageSuccessfully.style.display = "block"
		setTimeout(() => { messageSuccessfully.style.display = "none" }, 2000)

		recipesInps.forEach(inp => {
			inp.value = ""
		})
	})
})






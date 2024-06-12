import { renderProd, getData, getProductsFromCard,saveProductFromCard } from "../service/service.js"


function initialProduct(className, param = "", productInBasket) {
	let selector = document.querySelector(className)

	getData("Products", param).then(data => renderProd(data, selector))

	selector.addEventListener("click", (event) => {
    productInBasket = getProductsFromCard()

		let clickedBtn = event.target.closest(".buy__btn")

		if (!clickedBtn) return

		let productId = clickedBtn.closest(".product__card").dataset.id

		let index = productInBasket.findIndex(el => el.id === productId)

		

		if (index >= 0) {
			productInBasket[index].counter++
			saveProductFromCard(productInBasket)
			alert("Product in basket!")


		} else {
			getData("Products", `/${productId}`).then(data => {
				if (data) {
					productInBasket.push({ ...data, counter: 1 })
					saveProductFromCard(productInBasket)
					clickedBtn.textContent = "In basket"
					getData("Products").then(data => renderProd(data , allProdList))


				} else {
					location.reload()
				}
			})
		}


	})
}



export default initialProduct


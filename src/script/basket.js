import { getProductsFromCard, saveProductFromCard, renderProd, getData } from "../service/service.js"

function activeBasket() {
	const basketBtn = document.querySelector(".basket")
	const basketClose = document.querySelector(".basket__header button")
	const basketList = document.querySelector(".basket__main-list")
	const baskMod = document.querySelector(".basket-modal")
	const body = document.querySelector("body")
	const productsReceipt = document.querySelector(".products__receipt span")
	const allProdList = document.querySelector(".products__list")

	const bestsellerList = document.querySelector(".bestseller__list")
	const stockList = document.querySelector(".stock__list")
	const accessoriesList = document.querySelector(".accessories__list")
	let basketListProd = []

	basketBtn.addEventListener("click", () => {
		let burgerBtn = document.querySelector("#burger")
		let headerNav = document.querySelector("header nav")


		burgerBtn.classList.remove("open")
		headerNav.classList.remove("open")

		baskMod.classList.add("active-basket")
		body.classList.add("open")
		basketListProd = getProductsFromCard()
		renderBasketProd(basketListProd, basketList, productsReceipt)
	})

	basketList.addEventListener("click", (event) => {
		let target = event.target

		if (target.closest(".prod__basket-minus") || target.closest(".prod__basket-plus") || target.closest(".prod__basket-delete")) {
			let cardId = event.target.closest(".prod__basket").dataset.id
			let index = basketListProd.findIndex(el => el.id === cardId)

			if (event.target.closest(".prod__basket-minus")) {
				if (basketListProd[index].counter === 1) {
					basketListProd.splice(index, 1)
					if (location.pathname === "/" || location.pathname === "/index.html") {
						getData("Products", "?top=true&category=cross").then(data => renderProd(data, bestsellerList))
						getData("Products", "?discount=true").then(data => renderProd(data, stockList))
						getData("Products", "?category=accessories").then(data => renderProd(data, accessoriesList))

					} else {
						getData("Products", "").then(data => renderProd(data, allProdList))

					}
				} else {
					basketListProd[index].counter--
				}
			}

			if (event.target.closest(".prod__basket-plus")) {
				basketListProd[index].counter < 10 && basketListProd[index].counter++
			}


			if (event.target.closest(".prod__basket-delete")) {
				basketListProd.splice(index, 1)



				if (location.pathname === "/" || location.pathname === "/index.html") {
					getData("Products", "?top=true&category=cross").then(data => renderProd(data, bestsellerList))
					getData("Products", "?discount=true").then(data => renderProd(data, stockList))
					getData("Products", "?category=accessories").then(data => renderProd(data, accessoriesList))

				} else {
					getData("Products", "").then(data => renderProd(data, allProdList))

				}
			}

			saveProductFromCard(basketListProd)
			renderBasketProd(basketListProd, basketList, productsReceipt)

		}
	})



	basketClose.addEventListener("click", () => {
		baskMod.classList.remove("active-basket")
		body.classList.remove("open")
	})
}

function renderBasketProd(prodList, selector, allPrice) {
	selector.innerHTML = ""

	prodList.forEach(prod => {
		selector.innerHTML += `
		<div class="prod__basket row" data-id="${prod.id}">
		<div class="prod__basket-img">
		<img src=${prod.image} alt="">
		</div>
			<div class="prod__basket-descr">
				<h3>${prod.title}</h3>
				<p>${prod.descr}</p>
			</div>
			<div class="prod__basket-total">
				<button class="prod__basket-minus">-</button>
				<span>${prod.counter}</span>
				<button class="prod__basket-plus">+</button>
			</div>
			<div class="prod__basket-price">
				Price ${prod.price * prod.counter} $
			</div>
			<button class="prod__basket-delete">Delete</button>
		</div>
		`
	});

	allPrice.innerHTML = prodList.reduce((acc, value) => acc + value.price * value.counter, 0)
}

export { activeBasket, renderBasketProd }














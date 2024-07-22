const URL = "https://663131a7c92f351c03dc73a9.mockapi.io/"
const _CHAT_ID = "-1002148714160"
const _TG_TOKEN_BOT = "7141297747:AAF-C8kIerz6ChQfzhWg1lqk937DyAr-9BY"
const _TG_URL = `https://api.telegram.org/bot${_TG_TOKEN_BOT}/sendMessage`

const _ORDERS = "https://667c5be33c30891b865c62e9.mockapi.io/Orders"

async function postOrder(newOrder) {
	try {
		let resolve = await fetch(_ORDERS , {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify(newOrder)
		})
		let result = await resolve.json()
		return result

	} catch (error) {
		return error
	}
}


async function getData(param, option = "") {
	try {
		let resolve = await fetch(URL + param + option)
		let result = await resolve.json()
		return result

	} catch (error) {
		return error
	}
}

async function postData(param, data) {
	try {
		let resolve = await fetch(URL + param, {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify(data)
		})
		let result = await resolve.json()
		return result

	} catch (error) {
		return error
	}
}





function renderProd(array, s) {
	s.innerHTML = ""
	let prodInBasket = []
    prodInBasket = getProductsFromCard()

	array.forEach(el => {
        let index = prodInBasket.findIndex(ele => ele.id === el.id)

		s.innerHTML += `
      <div class="product__card swiper-slide" data-id="${el.id}">
			<img src="${el.image}" alt="product img">
			
			<div class="product__card-main">
				<h3>${el.title}</h3>
				<p class="product__card-descr">${el.descr}</p>
				<div class="row product__card-bottom">
					<p>${el.price}$</p> 
					<button class="buy__btn">${index >= 0? "In basket" : "Buy"}</button>
				</div>
			</div>
  		</div>`
	})
}


function renderComments(array, sel) {
	sel.innerHTML = ""

	array.forEach(comment => {
		sel.innerHTML += `
		<div class="comments__list-comment">
		<h3>${comment.title}</h3>
		<p class="comment__text">${comment.text}</p>
		<div class="row">
			<p class="comment__user">${comment.author}</p>
			<p class="comment__date">${comment.date}</p>
		</div>
	</div>`
	})
}

function getProductsFromCard() {
	let data = JSON.parse(localStorage.getItem("card-prod"))
	if (data) return data
	return []
}

async function sendDataTelegramm(message){
	try {
		return await fetch(_TG_URL,{
			method: "POST",
			headers:{"Content-Type" : "application/json"},
			body: JSON.stringify({
				chat_id: _CHAT_ID,
				text: message,
				parse_mode: "html"
			}),
		})
	} catch (error) {
		return error
	}
}

function saveProductFromCard(data) {
	localStorage.setItem("card-prod", JSON.stringify(data))
}



export { getData, renderProd, postData, renderComments, getProductsFromCard, saveProductFromCard, sendDataTelegramm, postOrder}



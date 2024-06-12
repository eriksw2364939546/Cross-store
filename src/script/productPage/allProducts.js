import initialProduct from "../products.js"
import initialBurger from "../burger.js"
import  { activeBasket } from "../basket.js"


let cardArray = []

initialProduct(".products__list", "" , cardArray)


initialBurger()
activeBasket(cardArray)
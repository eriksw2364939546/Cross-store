import initialProduct from "./src/script/products.js";
import initialComments from "./src/script/comments.js";
import initialBurger from "./src/script/burger.js";
import {activeBasket} from "./src/script/basket.js";



let cardArray = []



initialProduct(".bestseller__list","?top=true&category=cross", cardArray)
initialProduct(".stock__list", "?discount=true", cardArray)
initialProduct(".accessories__list", "?category=accessories", cardArray)


initialComments()
initialBurger()
activeBasket(cardArray)
















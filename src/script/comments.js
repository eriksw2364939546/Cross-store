import {getData, postData, renderComments } from "../service/service.js";

function initialComments(){

let commentsList = document.querySelector(".comments__list")
let commentsModalForm = document.querySelector(".comment__modal form")
let commentUser = document.querySelector(".comment__modal #comment-user")
let commentTitle = document.querySelector(".comment__modal #comment-title")
let commentText = document.querySelector(".comment__modal textarea ")

let addComBtn = document.querySelector(".comments button")
let commentModal = document.querySelector(".comment__modal")
let commentModalPlus = document.querySelector(".comment__modal-plus")
let commentModalClose = document.querySelector(".comment__modal-close")


commentModalClose.addEventListener("click", closeModal)


addComBtn.addEventListener("click", () => {
    commentModal.classList.add("active-modal")
})

function closeModal(){
    commentModal.classList.remove("active-modal")
}
getComments()

commentsModalForm.addEventListener("submit", (event) =>{
    event.preventDefault()

    commentModalPlus.disabled = true
    commentModalPlus.innerHTML = "Loading..."

    let newComment = { 
      author: commentUser.value,
      title: commentTitle.value,
      text: commentText.value,
      date: convertData(Date.now())
    }

    postData("Comments", newComment).then(data => {
        if(data && data.title){
          getComments()
          commentUser.value = ""
          commentTitle.value = ""
          commentText.value = ""
          closeModal()
          commentModalPlus.disabled = false
          commentModalPlus.innerHTML = "Send comment"
        }
    })
})

function getComments(){
    getData("Comments").then(data => {
        if(data && data.length > 0){
            renderComments(data, commentsList)
        }else{
           commentsList += "Comments not found!"
        }
    })
}

function convertData(time){
    let currDate = new Date(time)

    let day = currDate.getDate()
    let month = currDate.getMonth() + 1 
    let year = currDate.getFullYear()

    if(day < 10) day = "0" + day
    if(month < 10) month = "0" + month

    return `${day}.${month}.${year}`
}


}

export default initialComments
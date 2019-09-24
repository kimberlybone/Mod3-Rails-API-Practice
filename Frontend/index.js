// Code your solution here
let url = "http://localhost:3000/shoes"
let reviewForm = document.getElementById('new-review')
let shoeUL = document.getElementById('shoe-list')
let reviewUL = document.getElementById('reviews-list')


//////////// READ INDEX ///////////////
  fetch(url)
   .then(res => res.json())
   .then((shoesArr) => {
     shoesArr.forEach(shoeObj => {
       shoeUL.innerHTML += `
       <li data-id="${shoeObj.id}" class="list-group-item">${shoeObj.name}</li>
       `
     })
   })

//////////// READ SHOW ///////////////
  shoeUL.addEventListener('click', function(evt){
    evt.preventDefault()

    // grabbing the attributes of the element
    let shoeName = document.getElementById('shoe-name')
    let shoeDescription = document.getElementById('shoe-description')
    let shoeImage = document.getElementById('shoe-image')
    let shoePrice = document.getElementById('shoe-price')
    let id = evt.target.dataset.id

    reviewForm.dataset.id = id

    ///////////////////////////////

    fetch(url + `/${id}`)
      .then(res => res.json())
      .then((shoeObj) => {
        shoeName.innerText = `${shoeObj.name}`
        shoeImage.src = `${shoeObj.image}`
        shoeDescription.innerText = `Description: ${shoeObj.description}`
        shoePrice.innerText = `$${shoeObj.price}`
        shoeObj.reviews.forEach(review => {
          reviewUL.innerHTML = ""
          reviewUL.innerHTML += `
          <li data-review-id="${review.id}" data-shoe-id="${id}" class="list-group-item">${review.content}</li>`
        })
      })
  })

//////////// CREATE REVIEW ///////////////

  reviewForm.addEventListener('submit', function(evt){
    evt.preventDefault()
    // grabbing the attributes of the element
    let shoe_id = evt.target.dataset.id
    let form = evt.target
    let review = form.review.value
    /////////////////////
      fetch(url + `/${shoe_id}/reviews`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
              content: review
        })
      })
      .then(res => res.json())
      .then(reviewObj => {
        reviewUL.innerHTML = ""
        reviewUL.innerHTML += `<li class="list-group-item">${reviewObj.content}</li>`
      })
    })

////////////// DELETE REVIEW ////////////////
  reviewUL.addEventListener('click', function(evt){
    evt.preventDefault()

    if(evt.target.tagName === 'LI'){
      let review_id = evt.target.dataset.reviewId

      fetch(`http://localhost:3000/reviews/${review_id}`,{
        method: 'DELETE'
      })
      evt.target.remove()
    }

  })

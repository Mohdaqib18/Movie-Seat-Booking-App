const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
let ticketPrice = +movieSelect.value;

 populateUI();





//save movie data
function saveMovieData(movieIndex,moviePrice){

    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", moviePrice);
}


//update seat counts and total

function updateCount(){
    const selectedSeats = document.querySelectorAll(".row .seat.selected");

    const selectedSeatsIndex = [...selectedSeats].map(function(seat){

        return [...seats].indexOf(seat);
    });

  localStorage.setItem("selectedSeatsIndex", JSON.stringify(selectedSeatsIndex));


    const countOfSelectedSeats = selectedSeats.length;
    const totalPrice = countOfSelectedSeats*ticketPrice;
    count.innerText = countOfSelectedSeats;
    total.innerText = totalPrice;

}

// Get stored data from local storage and populate UI
function populateUI(){
    const selectedSeatsStored = JSON.parse(localStorage.getItem("selectedSeatsIndex"));
    
    if(selectedSeatsStored !== null && selectedSeatsStored.length > 0){

        seats.forEach((seat, index) =>{
            if(selectedSeatsStored.indexOf(index) !== -1){
                seat.classList.add("selected");
            }

        })

    }

    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
    const selectedMoviePrice = localStorage.getItem("selectedMoviePrice");


    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
    
    if(selectedMoviePrice !== null){
        ticketPrice = selectedMoviePrice;
    }


}

//add event on movie selector

movieSelect.addEventListener("change", e => {
    
     ticketPrice = parseInt(e.target.value);
     saveMovieData(e.target.selectedIndex , e.target.value);
     updateCount();
})


// add event on seats 
container.addEventListener("click", e => {
    if(e.target.classList.contains("seat") && !e.target.classList.contains("occupied")){
        console.log(e.target.classList)
        e.target.classList.toggle("selected");
    }

    updateCount();
})

//update on reload
updateCount();
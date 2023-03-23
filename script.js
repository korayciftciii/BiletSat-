const container=document.querySelector(".container");
const count=document.getElementById('count');
const amount=document.getElementById('price');
const select=document.getElementById('movie');
const seats=document.querySelectorAll('.seat:not(.reserved)');

getFromLocalStorage();
calculateTotal();

container.addEventListener('click',function(e) {
if(e.target.classList.contains('seat') && !e.target.classList.contains('reserved'))
{
e.target.classList.toggle('selected');

calculateTotal();


}
});

select.addEventListener('change',function(e){calculateTotal();});

function calculateTotal(){
    const selectedSeats=container.querySelectorAll('.seat.selected');
    let selectedSeatCount=container.querySelectorAll('.seat.selected').length;
    const selectedSeatsArr=[];
    const seatsArr=[];
    selectedSeats.forEach(function(seat){selectedSeatsArr.push(seat)});
    seats.forEach(function(seat){seatsArr.push(seat)});
    let selectedIndex =selectedSeatsArr.map(function(seat){return seatsArr.indexOf(seat);});

    let price= select.value;
    count.innerText=selectedSeatCount;
    amount.innerText=selectedSeatCount*price;
saveToLocalStorage(selectedIndex);
}
// 
function saveToLocalStorage(index){
    localStorage.setItem('selectedSeats',JSON.stringify(index));
    localStorage.setItem('selectedMovie',select.selectedIndex);
}
// 
function getFromLocalStorage(){
    const selectedSeats=JSON.parse(localStorage.getItem('selectedSeats'));
    const selectedMovieIndex=localStorage.getItem('selectedMovie');
    if(selectedSeats !=null && selectedSeats.length>0){
        seats.forEach(function(seat,index){
            if(selectedSeats.indexOf(index)> -1){
                seat.classList.add('selected')
            }
         });
    }
    if (selectedMovieIndex !=null){
        select.selectedIndex=selectedMovieIndex;
        
    }
}
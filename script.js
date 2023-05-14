const select=document.getElementById('movie');
const count=document.getElementById('count');
const amount=document.getElementById('price');
const container=document.querySelector('.container');
const seats=document.querySelectorAll('.seat:not(.reserved)');
getFromLocalStorage();
calculateTotal();

container.addEventListener('click',function(e){
if(e.target.classList.contains('seat') && !e.target.classList.contains('reserved'))
{
e.target.classList.toggle('selected');
    calculateTotal();
}

});

function calculateTotal(){
let selectedSeats=container.querySelectorAll('.selected');
count.innerText=selectedSeats.length;
amount.innerText=selectedSeats.length*select.value;

const selectedSeatsArr=[];
const seatsArr=[];
selectedSeats.forEach(function(seat){selectedSeatsArr.push(seat);});

seats.forEach(function(seat){seatsArr.push(seat);});

let selectedSeatsIndexes=selectedSeatsArr.map(function(seat){return seatsArr.indexOf(seat)})

saveToLocalStorage(selectedSeatsIndexes);
}

select.addEventListener('change',function(e){
calculateTotal();

})
function saveToLocalStorage(index){

    localStorage.setItem('selectedSeat',JSON.stringify(index))
   localStorage.setItem('selectedMovie',select.selectedIndex)
}

function getFromLocalStorage(){

const selectedSeats=JSON.parse(localStorage.getItem('selectedSeat'));
const selectedMovie=localStorage.getItem('selectedMovie');

if(selectedSeats !=null && selectedSeats.length >0)
{
    seats.forEach(function(seat,index){
        if(selectedSeats.indexOf(index)>-1)
        {
seat.classList.add('selected');
        }
    })
}
if(selectedMovie !=null)
{
    select.selectedIndex=selectedMovie;

}
}


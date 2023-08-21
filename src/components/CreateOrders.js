/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
/* eslint-disable semi */
import {fetchDelete, updateOrder } from './apiCalls';
import { addLoader, removeLoader } from './loader';
import { useStyle } from './styles';



export const createOrderElement = (categories,order) => {
    
    const {orderID, eventID,timestamp,ticketcategoryId, numberOfTickets, totalPrice } = order;
    console.log(order);
     const { ticketPrice,ticketdescription,ticketCategoryId,eventId,eventName } = categories;
     console.log(categories);

     
     
    const orderedAt = new Date(timestamp).toLocaleDateString('en-US', { month: 'long', day: 'numeric',hour:'numeric' });
    const orderDiv = document.createElement('div');
    orderDiv.id=`order-${orderID}`;
    orderDiv.classList.add('fullOrder');

    const imgMap = {
      1: './src/assets/untold.png',
      2: './src/assets/electic_castle.png',
      3: './src/assets/football_festival.png',
      4: './src/assets/wine_festival.png'
    };
    
    const contentMarkup = `
   
    <div class="small-container">
	<div class="row">
  
  <div class="rating">
  <h4>${categories[eventID-1].eventName}</h4>
				<i class="fa fa-star"></i>
				<i class="fa fa-star"></i>
				<i class="fa fa-star"></i>
				<i class="fa fa-star"></i>
				<i class="fa fa-star-o"></i>
			</div>
		<div class="col-4">
    
    <img src="${imgMap[eventID]}">
    <tr>
    <td>
    <div class="cart-info">
        <div>
        <br>
        <br>
        <h5>OrderID=${orderID}</h5>
        
        <br>
        </div>
        </div>
        <div class="flex-1 text-left">
        
        <input type="number" id="numberOfTickets-${orderID}" min="1" max="15" value="${numberOfTickets}" disabled  style="float: right;"/>

      </div>
      <span class="flex-1"></span>
     <span class="flex-1"></span>
     <select class="flex-1" name="TicketCategory" id="ticket-category-${ticketCategoryId}" disabled style="margin-right: 100px; ">
    <option id="ticket-category1-${ticketCategoryId}" value="${ticketCategoryId}">${categories[ticketcategoryId-1].ticketdescription}</option>
    <option id ="ticket-category2-${ticketCategoryId}" value="${ticketCategoryId}">${categories[eventID+2].ticketdescription}</option>
  </select>
  
      <span class="flex-1 text-right">${orderedAt}</span>
      <span class="flex-1 text-center" id="total-price-${orderID}"  style="margin-left: 100px;">${totalPrice}</span>
      <span class="flex-1 text-right">
      <i class="pencil fa-solid fa-pencil" id="pencil-${orderID}"></i>
      <i class="check fa-solid fa-check" id="check-${orderID}" style="visibility: hidden" ></i>
      <i class="xmark fa-solid fa-xmark" id="xmark-${orderID}" style="visibility: hidden" ></i> <button class="delete-button" id="data-order-id=${orderID}">
      <i class="trash fa-solid fa-trash-can"></i>
    </button>
      </span>
    </div>
  </tr>
			
			
      
			<p>$50</p>
		</div>

    
	</div>
</div>

<div class="small-container cart-page">



`;



orderDiv.innerHTML = contentMarkup;

const updateButton=orderDiv.querySelector(`#pencil-${orderID}`);
const saveButton=orderDiv.querySelector(`#check-${orderID}`);
const cancelButton=orderDiv.querySelector(`#xmark-${orderID}`);
const ticketNumberButton=orderDiv.querySelector(`#numberOfTickets-${orderID}`);
const ticketprice=totalPrice/ticketNumberButton.value;
const totalPriceContent=orderDiv.querySelector(`#total-price-${orderID}`);
const optionButton=orderDiv.querySelector(`#ticket-category-${ticketCategoryId}`);
const TicketType1=orderDiv.querySelector(`#ticket-category1-${ticketCategoryId}`);
const TicketType2=orderDiv.querySelector(`#ticket-category2-${ticketCategoryId}`);



const initTicketDescription=categories[ticketcategoryId-1].ticketdescription;

const initTicketNr=order.numberOfTickets;



const deleteButton = orderDiv.querySelector('.delete-button');
  
    deleteButton.addEventListener('click', () => {
     
      fetchDelete(orderID);
  
        
    });
  
    
    updateButton.addEventListener('click',()=>{
  
  
      
      if(saveButton.style.visibility==='hidden' && cancelButton.style.visibility==='hidden')
      {
        
        saveButton.style.visibility='visible';
        cancelButton.style.visibility='visible';
        updateButton.style.visibility='hidden';
        ticketNumberButton.removeAttribute('disabled');
        ticketNumberButton.style.border='1px solid red';
        optionButton.removeAttribute('disabled');
        optionButton.style.border='1px solid red';

      }
    });



    cancelButton.addEventListener('click',()=>{
      saveButton.style.visibility='hidden';
      cancelButton.style.visibility='hidden';
      updateButton.style.visibility='visible';
      ticketNumberButton.style.border='none';
      ticketNumberButton.setAttribute('disabled', 'true');
      ticketNumberButton.value=order.numberOfTickets;
      console.log(ticketNumberButton.value);
      optionButton.style.border='none';
      optionButton.setAttribute('disabled', 'true');

      TicketType1.value=initTicketDescription;
      console.log(initTicketDescription);
    });

    saveButton.addEventListener('click',()=>{
      const newType=order.ticketcategoryId;
      const InputnewQuantity=orderDiv.querySelector(`#numberOfTickets-${orderID}`);
      const newQuantity=InputnewQuantity.value;
      if(newQuantity!=initTicketNr){
        addLoader();
        updateOrder(orderID,newType,newQuantity).then((res)=>{
          if(res.status===200)
          {
            saveButton.style.visibility='hidden';
            cancelButton.style.visibility='hidden';
            updateButton.style.visibility='visible';
            ticketNumberButton.style.border='none';
            ticketNumberButton.setAttribute('disabled', 'true');
            optionButton.style.border='none';
            optionButton.setAttribute('disabled', 'true');
           
            
            res.json().then((data)=>{

              order=data;
              order.numberOfTickets=newQuantity;
              ticketNumberButton.value=order.numberOfTickets;
              const total_price=ticketprice*order.numberOfTickets;
              totalPriceContent.textContent=total_price;
              
            });
          }
        }).catch((err)=>{
            console.error(err);
        }).finally(()=>{
            setTimeout(()=>{
              removeLoader();
            },500)
        });
      }

    });



    return orderDiv;



    
};










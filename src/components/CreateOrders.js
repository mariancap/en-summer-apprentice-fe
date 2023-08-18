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
    const contentMarkup = `
    <div class="orderCard  bg-white px-4 py-3 gap-x-4 flex font-bold text-justify" >
    <span class="flex-1 text-justify">${categories[eventID].eventName}</span>
    <span class="flex-1  text-justify">${orderID}</span>
    <div class="flex-1 text-left">
      <input type="number" id="numberOfTickets-${orderID}" min="1" max="15" value="${numberOfTickets}" disabled/>
    </div>
    <span class="flex-1">${categories[eventID].ticketdescription}</span>
    <span class="flex-1 text-left">${orderedAt}</span>
    <span class="flex-1 text-center">${totalPrice}</span>
    <span class="flex-1 text-right">
    <i class="pencil fa-solid fa-pencil" id="pencil-${orderID}"></i>
    <i class="check fa-solid fa-check" id="check-${orderID}" style="visibility: hidden" ></i>
    <i class="xmark fa-solid fa-xmark" id="xmark-${orderID}" style="visibility: hidden" ></i> <button class="delete-button" id="data-order-id=${orderID}">
    <i class="trash fa-solid fa-trash-can"></i>
  </button>
    </span>
  </div>
  <div class="orders-content" id="purchases-content"></div>
`;

orderDiv.innerHTML = contentMarkup;

const updateButton=orderDiv.querySelector(`#pencil-${orderID}`);
const saveButton=orderDiv.querySelector(`#check-${orderID}`);
const cancelButton=orderDiv.querySelector(`#xmark-${orderID}`);
const ticketNumberButton=orderDiv.querySelector(`#numberOfTickets-${orderID}`);

const initTicketId=order.ticketcategoryId;
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
           
            
            res.json().then((data)=>{

              order=data;
              order.numberOfTickets=newQuantity;
              ticketNumberButton.value=order.numberOfTickets;
              
              
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










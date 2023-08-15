/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
/* eslint-disable semi */
import { fetchDelete } from './apiCalls';
import { addLoader, removeLoader } from './loader';
import { useStyle } from './styles';


export const createOrderElement = (order) => {
    const {orderID, eventID,timestamp,ticketcategoryId, numberOfTickets, totalPrice } = order;
    console.log(order);
    const orderedAt = new Date(timestamp).toLocaleDateString('en-US', { month: 'long', day: 'numeric',hour:'numeric' });
    const orderDiv = document.createElement('div');
    orderDiv.classList.add('fullOrder');
    const contentMarkup = `
    <div class="orderCard bg-white px-4 py-3 gap-x-4 flex font-bold text-justify">
    <span class="flex-1 text-justify">${eventID}</span>
    <span class="flex-1 text-justify">${orderID}</span>
    <span class="flex-1 text-left">${numberOfTickets}</span>
    <span class="flex-1">${ticketcategoryId}</span>
    <span class="flex-1 text-left">${orderedAt}</span>
    <span class="flex-1 text-center">${totalPrice}</span>
    <span class="flex-1 text-right"> <button class="delete-button"  data-order-id="${orderID}">
    <i class="fas fa-recycle"></i>
  </button></span>
  </div>
  <div class="orders-content" id="purchases-content"></div>
`;

orderDiv.innerHTML = contentMarkup;

const deleteButton = orderDiv.querySelector('.delete-button');
  
    deleteButton.addEventListener('click', () => {
     
      fetchDelete(orderID);
      toastr.success('Order deleted with succes!');
        
    });
  
    
    return orderDiv;

    
};






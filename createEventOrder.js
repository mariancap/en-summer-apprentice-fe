
/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
/* eslint-disable semi */
import { useStyle } from './styles';

const createEventElement = (eventData) => {

    const addToCartBtnClasses = useStyle('addToCartBtn');
    const inputClasses = useStyle('inputTicket');
  
    const imgMap = {
      1: './src/assets/untold.png',
      2: './src/assets/electic_castle.png',
      3: './src/assets/football_festival.png',
      4: './src/assets/wine_festival.png'
    };
  
    
  
  
    const { id, name, description,ticket_categoryList,endDate,startDate } = eventData;
    console.log(eventData);
    const eventDiv = document.createElement('div');
    const formattedStartDate = new Date(startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    const formattedEndDate = new Date(endDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  
    eventDiv.classList.add('event-card'); // Add the event-card class
  
    const contentMarkup = `
    <header>
      <h2 class="event-title text-2xl font-bold">${name}
      <p class="description text-gray-700">${description}</p>
      <p class="event-date text-gray-700">${formattedStartDate} - ${formattedEndDate} </p>
  </header>
  <div class="content">
    <img src="${imgMap[id]}" alt="${name}" class="event-image custom-image-size rounded object-cover mb-4">
    
    <fieldset>
    <legend>Select Ticket Type:</legend>
  
    <div>
    <input type="radio" id="ticket_categoryList_${id}_standard" name="ticketcategory_${id}" value="${ticket_categoryList[0].ticketCategoryID}" checked />
    <label for="ticket_categoryList_${id}_standard">${ticket_categoryList[0].ticket_description} - Price: $${ticket_categoryList[0].price}</label>  
      </div>
    
    ${
      ticket_categoryList[1]
        ? `<div>
        <input type="radio" id="ticket_categoryList_${id}_vip" name="ticketcategory_${id}" value="${ticket_categoryList[1].ticketCategoryID}" />
        <label for="ticket_categoryList_${id}_vip">${ticket_categoryList[1].ticket_description} - Price: $${ticket_categoryList[1].price}</label>   
                 </div>`
        : ''
    }
  
    </fieldset>
    <label>Number of tickets</label>
    
  </div>
  `;
    eventDiv.innerHTML = contentMarkup;
    const selectTicketCategory = eventDiv.querySelector(`input[name="ticketcategory_${id}"]:checked`);
    const input=document.createElement('input');
    const addToCart = document.createElement('button');

    input.classList.add(...inputClasses);
    input.type='number';
    input.min='0';
    input.max='15';
    input.value='0';
  
    addToCart.classList.add(...addToCartBtnClasses);
    addToCart.innerText = 'Add ticket to Cart';
    addToCart.addEventListener('click', () => {
      handleAddToCart(id, selectTicketCategory, input);
    });
    eventDiv.appendChild(input);
    eventDiv.appendChild(addToCart);
  
    
    return eventDiv;
  }
  
  const handleAddToCart = (id, selectTicketCategory, input) => {
    
    
    const ticketNumber=input.value;
    const ticketCategoryId=selectTicketCategory.value;
    fetch('http://localhost:9090/orders',{
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
      },
      body: JSON.stringify({
        eventID: id,
        ticketCategoryID: ticketCategoryId, 
        numberOfTickets: +ticketNumber,
      }),
    }).then((response) => {
      return response.json().then((data) => {
        if (!response.ok) {
          throw new Error(data.message);
        }
        return data;
      });
    })
    .then((data) => {
      input.value = 0;
      console.log('order sent to backend');
    })
    .catch((error) => {
      console.error('error saving purchased event:', error);
    })
  }


  
  
  
  
  
  
  

  export const createEvent = (eventData) => {
    const eventElement = createEventElement(eventData);
    return eventElement;
  };




 



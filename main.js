
import {addLoader,removeLoader} from './src/components/loader';
import { createEvent } from './src/components/createEventOrder.js';
import { createOrderElement } from './src/components/createOrderItem.js';

// Navigate to a specific URL
function navigateTo(url) {
  history.pushState(null, null, url);
  renderContent(url);
}
// HTML templates
function getHomePageTemplate() {
  return `
  
    <div id="content">
    
      <div class="events flex items-center justify-center flex-wrap ">
      </div>
    </div>
  
  `;
}

function getOrdersPageTemplate() {
  return `
    <div id="content">
    <h1 class="text-2xl mb-4 mt-8 text-center">Purchased Tickets</h1>
    <div class="purchases ml-6 mr-6">
        <div class="bg-white px-4 py-3 gap-x-4 flex font-bold></div>
      </div>  
    </div>
  `;
}

function setupNavigationEvents() {
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const href = link.getAttribute('href');
      navigateTo(href);
    });
  });
}

function setupMobileMenuEvent() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
}

function setupPopstateEvent() {
  window.addEventListener('popstate', () => {
    const currentUrl = window.location.pathname;
    renderContent(currentUrl);
  });
}

function setupInitialPage() {
  const initialUrl = window.location.pathname;
  renderContent(initialUrl);
}

function renderHomePage() {
  const mainContentDiv = document.querySelector('.main-content-component');
  mainContentDiv.innerHTML = getHomePageTemplate();

  

  const eventData = {
    id: 1,
    description: 'Sample event description.',
    img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    name: 'Sample Event',
    ticketCategories: [
      { id: 1, description: 'General Admission' },
      { id: 2, description: 'VIP' },
    ],

    
  };

  
  
  // Create the event card element
  const eventCard = document.createElement('div');
  eventCard.classList.add('event-card'); 
  // Create the event content markup
  const contentMarkup = `
    <header>
      <h2 class="event-title text-2xl font-bold">${eventData.name}</h2>
    </header>
    <div class="content">
      < alt="${eventData.name}" class="event-image w-full height-200 rounded object-cover mb-4">
      <p class="description text-gray-700">${eventData.description}</p>
    </div>
  `;

  eventCard.innerHTML = contentMarkup;
  const eventsContainer = document.querySelector('.events');
  // Append the event card to the events container
  eventsContainer.appendChild(eventCard);

  console.log('function',fetchTicketEvents());
    fetchTicketEvents().then((data)=>{
      
      setTimeout(()=>{
        removeLoader();
      },200);
      addEvents(data);
    });

  
}

async function fetchTicketEvents()
{
  const response= await fetch('http://localhost:9090/getAll');
  const data= await response.json();
  return data;
}


async function fetchOders()
{
  const response= await fetch('http://localhost:9090/orders');
  const orders= await response.json();
  return orders;
}

const addEvents=(events) =>{
  const eventsDiv=document.querySelector('.events');
  eventsDiv.innerHTML='No invents';
  if(events.length)
  {
    eventsDiv.innerHTML=''; 
    events.forEach(event=>{
      eventsDiv.appendChild(createEvent(event));
    });
  }
};






function renderOrdersPage(categories) {
  const mainContentDiv = document.querySelector('.main-content-component');
  mainContentDiv.innerHTML = getOrdersPageTemplate();

  const purchasesDiv = document.querySelector('.purchases');
  if (purchasesDiv) {
    fetchOders().then((orders) => {
      setTimeout(() => {
        removeLoader();
      }, 800);
      orders.forEach((order) => {
        const newOrder = createOrderElement(order);
        purchasesDiv.appendChild(newOrder);
      });
    })
  }
  

 }

  


// Render content based on URL
function renderContent(url) {
  const mainContentDiv = document.querySelector('.main-content-component');
  mainContentDiv.innerHTML = '';

  if (url === '/') {
    renderHomePage();
  } else if (url === '/orders') {
    renderOrdersPage()
  }
}





// Call the setup functions
setupNavigationEvents();
setupMobileMenuEvent();
setupPopstateEvent();
setupInitialPage();

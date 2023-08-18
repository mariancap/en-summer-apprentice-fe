

import {addLoader,removeLoader} from './src/components/loader';
import { createEvent } from './src/components/createEvent.js';
import { createCheckboxesForEvents } from './src/components/createCheckboxesForEvents';
import { fetchOders,fetchTicketEvents,fetchTicketCategory } from './src/components/apiCalls';
import { createOrderElement } from './src/components/CreateOrders';


function navigateTo(url) {
  history.pushState(null, null, url);
  renderContent(url);
}
// HTML templates
function getHomePageTemplate() {
  return `
  
  <div id="content" class="hidden">

    <div class="flex flex-col items-center">
      <div class="w-80">
        <h1>Explore Events</h1>
        <div class="filters flex flex-col" id="displayFilters">
          <input type="text" id="filter-name" placeholder="Filter by Name" class="searchBar px-4 mt-4 mb-4 py-2 border" />
          <button id="filter-button" class="filter-btn px-4 py-2 text-white rounded-lg">Filter</button>
        </div>
      </div>
    </div>
    
    <div class="events flex items-center justify-center flex-wrap "></div>
    <div class="cart"></div>
  </div>
`;
}

function getOrdersPageTemplate() {
  return `
    <div id="content" class="hidden">
    <h1 class="text-2xl mb-4 mt-8 text-center">Purchased Tickets</h1>
    <div class="purchases ml-6 mr-6">
        <div class="bg-white px-4 py-3 gap-x-4 flex font-bold>
        <button class="hidden md:flex text-justify" id="sorting-button-1">
        <span>Event</span>
        <i class="fa-solid fa-arrow-up-wide-short text-xl" id="sorting-icon-1"></i>
        </button>
        <span class="flex-1">Order id</span>
        <span class="flex-1 text-left">Number of tickets</span>
        <span class="flex-1 text-left">Ticket Category</span>
        <span class="flex-1 hidden md:flex">Date</span>
        <button class="hidden md:flex text-justify" id="sorting-button-2">
          <span class="flex-1 text-justify">Price</span>
          <i class="fa-solid fa-arrow-up-wide-short text-xl" id="sorting-icon-2"></i>
          </button>
        <span class="flex-1"></span>
        

        </div>
        </div id="purchases-content">
      </div>  
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

async function renderHomePage() {
  const mainContentDiv = document.querySelector('.main-content-component');
  mainContentDiv.innerHTML = getHomePageTemplate();

  
  const eventCard = document.createElement('div');
  eventCard.classList.add('event-card'); 
  const contentMarkup = `
    <header>
      <h2 class="event-title text-2xl font-bold"></h2>
    </header>
    <div class="content">
      <  class="event-image w-full height-200 rounded object-cover mb-4">
      <p class="description text-gray-700"></p>
    </div>
  `;

  eventCard.innerHTML = contentMarkup;
  const eventsContainer = document.querySelector('.events');
  const filterButton=document.querySelector('#filter-button');
  const searchBar=document.querySelector('.searchBar')
  eventsContainer.appendChild(eventCard);

  console.log('function',fetchTicketEvents());
    fetchTicketEvents().then((data)=>{
      
      setTimeout(()=>{
        removeLoader();
      },200);
      filterButton.addEventListener('click',()=>{
        createCheckboxesForEvents(data);
      })
      if(searchBar){
        setupFilterEvents(data);
      }
      addEvents(data);
      
    });

    

    
    
  
}



export const addEvents=(events) =>{
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


function liveSearch(events){
  const filterInput=document.querySelector('#filter-name');
  if(filterInput)
  {
    const searchValue=filterInput.value;
    if(searchValue!==undefined)
    {
      const filterEvents=events.filter((event)=>
        event.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      addEvents(filterEvents);
    }
  }
}


function setupFilterEvents(data){
const nameFilterInput=document.querySelector('#filter-name');
nameFilterInput.addEventListener('keyup',()=>{
  
  if(nameFilterInput)
  {
    setTimeout(() => {
      liveSearch(data); 
    }, 500);
  }
  
})

}


function renderOrdersPage(categories) {
  const mainContentDiv = document.querySelector('.main-content-component');
  mainContentDiv.innerHTML = getOrdersPageTemplate();

  const purchasesDiv = document.querySelector('.purchases');
  const purchasesContent=document.getElementById('purchases-content');
  addLoader();
  if (purchasesDiv) {
    fetchOders().then((orders) => {
      
      setTimeout(() => {
        removeLoader();
      }, 500);
      orders.forEach((order) => {
        const newOrder = createOrderElement(categories,order);
        purchasesDiv.appendChild(newOrder);
      });
      
      
      
  }
)


  
    
  }
}

  
function renderContent(url) {
  const mainContentDiv = document.querySelector('.main-content-component');
  mainContentDiv.innerHTML = '';

  if (url === '/') {
    renderHomePage();
  } else if (url === '/orders') {
    fetchTicketCategory().then((categories)=>{
      renderOrdersPage(categories);
    }).catch((error)=>{
      console.error("Error fethcing ticket categories:",error);
    })
  }
}



setupNavigationEvents();
setupMobileMenuEvent();
setupPopstateEvent();
setupInitialPage();

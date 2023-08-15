import { addEvents } from "../../main";





export function createCheckboxesForEvents(events){
    const venueSet=new Set(events.map((event)=>event.venue.location));
    const eventTypeSet=new Set(events.map((event)=>event.type));
    
    const filtersContainer=document.querySelector('.filters');
    const allFiltersContainer=document.querySelector('div');

   //const venueFilterDiv=setupHtmlForVenue(filtersContainer,allFiltersContainer);

   const venueCheckBoxes=Array.from(venueSet).map(venue=>{
    const checkbox=document.createElement('input');
    checkbox.type='checkbox';
    checkbox.name='venue';
    checkbox.value=venue;
    const label=document.createElement('label');
    label.textContent=venue;
    label.appendChild(checkbox);
    return label;
   });

   const EventTypeCheckBoxes=Array.from(eventTypeSet).map(eventType=>{
    const checkbox=document.createElement('input');
    checkbox.type='checkbox';
    checkbox.name='Event Type';
    checkbox.value=eventType;
    const label=document.createElement('label');
    label.textContent=eventType;
    label.appendChild(checkbox);
    return label;
    });

    filtersContainer.innerHTML='';
    venueCheckBoxes.forEach(checkbox=>
        {
            filtersContainer.appendChild(checkbox);
        });


        filtersContainer.appendChild(document.createElement('br'));

        EventTypeCheckBoxes.forEach(checkbox=>{
            filtersContainer.appendChild(checkbox);
        });
        
    filtersContainer.addEventListener('change', () => {
        const selectedVenues = Array.from(filtersContainer.querySelectorAll('input[name="venue"]:checked')).map(checkbox => checkbox.value);
        const selectedEventTypes = Array.from(filtersContainer.querySelectorAll('input[name="eventType"]:checked')).map(checkbox => checkbox.value);
        const filteredEvents = events.filter(event => {
            return (selectedVenues.length === 0 || selectedVenues.includes(event.venue.locationName)) &&
                   (selectedEventTypes.length === 0 || selectedEventTypes.includes(event.type));
          });
        addEvents(filteredEvents);
    });

        
}


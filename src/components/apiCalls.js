import { addLoader ,removeLoader} from "./loader";


export async function fetchTicketEvents()
{
  const response= await fetch('http://localhost:8080/getAll');
  const data= await response.json();
  return data;
}

export async function fetchDelete (orderID) {
  addLoader();
  fetch(`https://localhost:7260/api/Order/Delete?id=${orderID}`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
      }
  })
  .then((res) => {
    if (!res.ok) {
        throw new Error('Error deleting order');
    }
    if (res.status === 204) {
        return null;
    }
    return res.json();
})
.then(() => {
    const orderToBeRemoved = document.getElementById(`order-${orderID}`);
    orderToBeRemoved.remove();
    toastr.success('Success in deleting!');
})
.catch((error) => {
    toastr.error(error);
}).finally(()=>{
    removeLoader();
})
}


export async function fetchOders()
{
  const response= await fetch('http://localhost:8080/orders');
  const orders= await response.json();
  return orders;
}

export async function fetchTicketCategory()
{
    const result=fetch('http://localhost:8080/ticketCategory',{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
        },
    }).then((res)=>res.json()).then((data)=>{
        return[...data];
    });
    return result;
}


export async function updateOrder(orderid,newType,newTickerNr){
      return  fetch('https://localhost:7260/api/Order/Patch',{
            method: 'PATCH',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                orderID:orderid,
                numberOfTickets:newTickerNr,
                ticketCategoryid:newType,


            }),
        }).then((res)=>{
            if(res.status===200)
        {
            toastr.success('Succes!');
        }else {
            toastr.error('Error!');
        }

        return res;
        }).catch((err)=>{
            throw new Error(err);
        })

        
}
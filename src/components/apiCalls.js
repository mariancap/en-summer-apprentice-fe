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
      },
  })
  .then((res) => {
      if (!res.ok) {
          throw new Error('Error deleting order');
      }
      if (res.status === 204) {
          return null; // Return null for empty response
      }
      return res.json();
  })
  .then((data) => {
      removeLoader();
      // eslint-disable-next-line no-undef
      const orderToBeRemoved = document.getElementById(`order-${orderID}`);
      orderToBeRemoved.remove();
      toastr.success('Success!');
  })
  .catch((error) => {
      removeLoader();
      toastr.error(error);
  });
}


export async function fetchOders()
{
  const response= await fetch('http://localhost:8080/orders');
  const orders= await response.json();
  return orders;
}
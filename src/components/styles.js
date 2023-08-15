/* eslint-disable semi */
/* eslint-disable indent */


const bookOfStyles = {

  addToCartBtn: [
    'add-to-cart-btn',
    'px-2',
    'py-1',
    'rounded',
    'text-black',
    'font-italic',
    'focus:outline-none',
    'focus:shadow-outline'
  ],
  inputTicket: [
    'input-ticket',
    'w-16',
    'text-center',
    'border',
    'border-gray-700',
    'rounded',
    'py-2',
    'px-3',
    'text-gray-700',
    'focus:outline-none',
    'focus:shadow-outline'
  ],

  purhcase: [
      'bg-white',
      'px-4',
      'py-3',
      'gap-x-4',
      'sm:border-b',
      'flex',
      'sm:border-gray-200',
  ],
  purchaseTitle: ['text-lg', 'font-medium', 'text-gray-900', 'flex-1'],
  purchaseQuantity: [
      'w-[50px]',
      'text-center',
      'py-1',
      'px-2',
      'border',
      'border-orange-700',
      'border-2',
      'disabled:border-0',
      'rounded',
      'text-orange-700',
      'text-sm',
      'leading-tight',
      'font-bold',
      'disabled:text-gray-700',
      'focus:outline-none',
      'focus:shadow-outline',
  ],
  purhcaseQuantityWrapper: ['flex-lg', 'flex-row-medium', 'flex-1'],
  purhcaseType: [
      'w-fit',
      'py-1',
      'px-2',
      'border',
      'border-orange-700',
      'border-2',
      'py-px',
      'disabled:border-transparent',
      'disabled:appearance-none',
      'disabled:text-gray-900',
      'disabled:border-2',
      'disabled:pl-3',
      'rounded',
      'leading-tight',
      'focus:outline-none',
      'focus:shadow-outline',
      'text-sm',
      'font-bold',
      'text-orange-700',
      'flex-1',
  ],
  purchaseTypeWrapper: ['flex', 'flex-row', 'justify-end', 'flex-1'],
  purchaseDate: ['text-center', 'flex-1', 'hideen', 'md:flex'],
  purchasePrice: ['text-center', 'w-12', 'hidden', 'md:flex'],
  actions: ['sm:mt-0', 'sm:text-right', 'w-28'],
  actionsButton: [
      'ml-2',
      'text-xl',
      'ps-2',
      'font-medium',
      'underline',
      'text-gray-700',
  ],
  deleteButton: ['hover:text-red-500'],
  cancelButton: ['hover:text-red-500'],
  saveButton:  ['hover:text-green-500'],
  editButton:  ['hover:text-blue-500'],
  hiddenButton: ['hidden'],
  eventWrapper: [
      // 'flex',
      'block',
      'event',
      // 'bg-black',
      // 'rounded',
      // 'shadow-md',
      // 'p-4',
      // 'flex',
      // 'flex-col',
      // 'space-y-2',
      // 'm-6',
      // 'mt-8',
      // 'width-100',
  ],
  actionsWrapper: [
      'actions', 
      'block', 
      // 'flex-col',
      'items-center', 
      'mt-4', 
      'flex-col', 
      'space-y-2'
  ],
  quantity: [
      // 'actions', 
      // 'block', 
      // 'items-center', 
      'mt-4',
  ],
  input: [
      'input',
      'w-16',
      'text-center',
      'border',
      'border-gray-300',
      'rounded',
      'py-2',
      'px-3'
  ],
  purchaseBtn: [
      'purchase-btn',
      'px-4',
      'py-2',
      'rounded',
      'font-bold',
      'disabled:opacity-50',
      'disabled:cursor-not-allowed',
      'focus:outline-none',
      'focus:shadow-outline',
  ],
};

export function useStyle(type){
  if(typeof type === 'string') return bookOfStyles[type];
  else{
      const allStyles = type.map((t) => bookOfStyles[t]);
      return allStyles.flat();
  }
}
export default function Component() {
  return (
    <div className="flex items-center justify-center min-h-screen flex-col gap-4 p-4">
      <CartIcon className="h-20 w-20 text-gray-300 dark:text-gray-700" />
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="font-bold text-3xl tracking-tight">
          Your cart is empty
        </h1>
        <p className="text-sm text-gray-500  dark:text-gray-400">
          Looks like you haven’t added anything to your cart yet
        </p>
      </div>
    </div>
  );
}

function CartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}

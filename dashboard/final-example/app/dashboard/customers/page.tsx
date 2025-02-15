import { fetchFilteredCustomers } from '@/app/lib/data';
import CustomersTable from '@/app/ui/customers/table';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customers',
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';

  const customers = await fetchFilteredCustomers(query);

  return (
    <main>
      <CustomersTable customers={customers} />
    </main>
  );
}

// Since the searchParams prop is a promise. You must use async/await or
//  React's use function to access the values.
// In version 14 and earlier, searchParams was a synchronous prop. To help 
// with backwards compatibility, you can still access it synchronously in
// Next.js 15, but this behavior will be deprecated in the future.
// searchParams is a Dynamic API whose values cannot be known ahead of 
// time. Using it will opt the page into dynamic rendering at request time.

// export default async function Page({
//   searchParams,
// }: {
//   searchParams?: { query?: string; page?: string }
// }) {
//   const query = searchParams?.query || '';

//   const customers = await fetchFilteredCustomers(query);

//   return (
//     <main>
//       <CustomersTable customers={customers} />
//     </main>
//   );
// }
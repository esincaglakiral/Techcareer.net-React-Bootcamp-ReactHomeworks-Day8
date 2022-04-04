import { useEffect, useState } from 'react';

const CustomersList = () => {
    const [customersList, setCustomersList] = useState([]);
    useEffect(() => {
        fetch("https://northwind.vercel.app/api/customers")
            .then(response => response.json())
            .then(data => setCustomersList(data));
    }, [])
  return (
    <ul>
    {
        customersList.map((customers, key) => (
            <li key={key}>{customers.name}</li>
        ))
    }
</ul>
  )
}

export default CustomersList
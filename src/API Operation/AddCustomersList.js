import { useState, useEffect } from "react";


const AddCustomersList = () => {
    const [customersList, setCustomersList] = useState([])
    const [customers, setCustomers] = useState({ companyName: '', contactName: '', address:{city:'', country:''} })
    const [refresh, setRefresh] = useState(false)


    useEffect(() => {
        getCustomers();
    }, [refresh])

    const getCustomers = () => {
        fetch("https://northwind.vercel.app/api/customers")
            .then(response => response.json())
            .then(data => setCustomersList(data));
    }

    const addCustomers= () => {

        const data = customers;
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }
        fetch('https://northwind.vercel.app/api/customers', config)
        .then(response => response.json())
        .then(data => {
            setRefresh(prev => !prev)
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}



const deleteCustomers = (id) => {
    const config = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    }

    fetch(`https://northwind.vercel.app/api/customers/${id}`, config)
    .then(response => response.json())
    .then(data => {
        setRefresh(prev => !prev)
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
  return (
    <>
    <div>
        <label htmlFor="">CompanyName</label>
        <input type="text" onChange={(e) => setCustomers(prev => { return { ...prev, companyName: e.target.value } })} />
    </div>

    <div>
        <label htmlFor="">ContactName</label>
        <input type="text" onChange={(e) => setCustomers(prev => { return { ...prev, contactName: e.target.value } })} />
    </div>
    <div>
        <label htmlFor="">City</label>
        <input type="text" onChange={(e) => setCustomers(prev => { return { ...prev, address:{city: e.target.value }} })} />
    </div>
    <div>
        <label htmlFor="">Country</label>
        <input type="text" onChange={(e) => setCustomers(prev => { return { ...prev, address:{country: e.target.value} } })} />
    </div>

    <div>
        <button onClick={addCustomers}>Add</button>
    </div>
    <table>
        <tr>
            <th>ID</th>
            <th>Company Name</th>
            <th>Contact Name</th>
            <th>City</th>
            <th>Country</th>
            <th>Delete</th>
        </tr>
        {
            customersList && customersList.map((customers, key) => (
                <tr key={key}>
                    <td>{customers.id}</td>
                    <td>{customers.companyName}</td>
                    <td>{customers.contactName}</td>
                    <td>{customers.address?.city}</td>
                    <td>{customers.address?.country}</td>
                    <td><button onClick={() => deleteCustomers(customers.id)}>Delete</button></td>
                </tr>
            ))
        }
    </table>
</>
  )
}

export default AddCustomersList
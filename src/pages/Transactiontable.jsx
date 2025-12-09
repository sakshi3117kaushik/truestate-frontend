const Transactiontable = ({ data }) => {
  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {["Transaction ID","Date","Customer ID","Customer name","Phone Number","Gender","Age","Product Category","Quantity","Total Amount"].map(head => (
              <th key={head} className="border p-2 text-left">{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="border-b">
              <td className="p-2">{row.transactionId}</td>
              <td className="p-2">{row.date}</td>
              <td className="p-2">{row.customerId}</td>
              <td className="p-2">{row.customerName}</td>
              <td className="p-2">{row.phone}</td>
              <td className="p-2">{row.gender}</td>
              <td className="p-2">{row.age}</td>
              <td className="p-2">{row.category}</td>
              <td className="p-2">{row.quantity}</td>
              <td className="p-2">{row.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Transactiontable;

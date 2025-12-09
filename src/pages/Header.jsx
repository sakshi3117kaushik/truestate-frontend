const Header = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow">
      <input
        type="text"
        placeholder="Name, Phone no."
        className="border rounded p-2 w-1/3"
      />
      <div className="flex gap-2">
        <select className="border rounded p-2">
          <option>Region</option>
        </select>
        <select className="border rounded p-2">
          <option>Gender</option>
        </select>
        <select className="border rounded p-2">
          <option>Age Range</option>
        </select>
        <select className="border rounded p-2">
          <option>Product Category</option>
        </select>
        <select className="border rounded p-2">
          <option>Tags</option>
        </select>
        <select className="border rounded p-2">
          <option>Payment Method</option>
        </select>
        <select className="border rounded p-2">
          <option>Date</option>
        </select>
      </div>
    </div>
  );
};
export default Header;
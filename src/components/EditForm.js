import React from "react";

const EditForm = ({
  price,
  setPrice,
  availability,
  setAvailability,
  id,
  setmodal,
}) => {
  var formdata = new FormData();
  formdata.append("id", id);
  formdata.append("price", price);
  formdata.append("availability", availability);
  const updateData = async () => {
    const options = {
      method: "POST",
      body: formdata,
    };
    const url =
      "https://hotel-test.softradixtechnologies.com/web/index.php?r=rooms/edit";
    const res = await fetch(url, options);
    const data = await res.json();
    setmodal(false);
  };

  const formSubmit = (e) => {
    e.preventDefault();
    updateData();
  };

  console.log("value", price);

  return (
    <form onSubmit={formSubmit}>
      <div className="mb-3">
        <label className="form-label fw-bold">Price</label>
        <input
          type="number"
          className="form-control"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label
          htmlFor="exampleFormControlTextarea1"
          className="form-label d-block fw-bold"
        >
          Room Availablity
        </label>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="availability"
            id="inlineRadio1"
            value="0"
            onChange={(e) => setAvailability(e.target.value)}
            checked={availability === "0" ? true : false}
          />
          <label className="form-check-label" htmlFor="inlineRadio1">
            Booked
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="availability"
            id="inlineRadio2"
            value="1"
            onChange={(e) => setAvailability(e.target.value)}
            checked={availability === "1" ? true : false}
          />
          <label className="form-check-label" htmlFor="inlineRadio2">
            Available
          </label>
        </div>
      </div>
      <div className="d-flex w-100 justify-content-end">
        <button
          type="button"
          className="btn btn-default"
          onClick={() => setmodal(false)}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </div>
    </form>
  );
};

export default EditForm;

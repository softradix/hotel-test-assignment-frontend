import _map from "lodash/map";
import moment from "moment";
import React from "react";
import "./App.scss";
import EditForm from "./components/EditForm";
import Modal from "./components/Modal";

const App = () => {
  const [listData, setListData] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [availability, setAvailability] = React.useState("");
  const [id, setid] = React.useState("");
  const [modal, setmodal] = React.useState(false);

  const getPrice = (details) => {
    setPrice(details.price);
    setAvailability(details.availability);
    setid(details.id);
    setmodal(true);
  };

  const getPriceList = async () => {
    const url =
      "https://hotel-test.softradixtechnologies.com/web/index.php/index.php?r=rooms/list";
    const options = {
      method: "GET",
      redirect: "follow",
    };
    const res = await fetch(url, options);
    const data = await res.json();
    setListData(data.data);
  };

  React.useEffect(() => {
    getPriceList();
  }, [modal]);
  return (
    <div className="container-fluid">
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              {listData &&
                _map(listData[0].price, (date) => (
                  <th className="whitespace-nowrap fw-normal" key={date.id}>
                    {moment(date.date).format("ddd")}
                    {`, `}
                    {moment(date.date).format("Do")}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {_map(listData, (list) => (
              <tr key={list.id}>
                <td>{list.room_number}</td>
                {_map(list.price, (price) => (
                  <td
                    key={price.id}
                    onClick={() =>
                      getPrice({
                        id: price.id,
                        price: price.price,
                        availability: price.availability,
                      })
                    }
                    className={
                      price.availability === "0" ? "bg-danger text-white" : ""
                    }
                  >
                    ${price.price}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && (
        <Modal title="Edit Details">
          <EditForm
            price={price}
            setPrice={setPrice}
            availability={availability}
            setAvailability={setAvailability}
            id={id}
            setmodal={setmodal}
          />
        </Modal>
      )}
    </div>
  );
};

export default App;

import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  getCompany,
  createCompany,
  deleteCompany,
  updateCompany,
} from "../Redux/companySlice";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Modal, Button, Form } from "react-bootstrap";

const Company = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [lgShow, setLgShow] = useState(false);
  const [compData, setCompData] = useState({
    code: "",
    name: "",
    link: "",
    machines: "",
    area: "",
    frequency: "",
    contact_no: "",
    remark: "",
    action: "",
  });
  const [pageLayout, setPageLayout] = useState("Add Company");
  const handleClose = () => {
    setLgShow(false);
    setPageLayout("Add Company");
  };

  const companyList = useSelector((state) => state.company);

  useEffect(() => {
    if (
      !localStorage.getItem("isLoggedin") &&
      localStorage.getItem("userToken") == undefined
    ) {
      return navigate("/");
    } else {
      dispatch(getCompany());
    }
  }, []);
  const handleChange = (e) => {
    setCompData({ ...compData, [e.target.name]: e.target.value });
    console.log();
  };


  return (
    <>
      <div>
        <Header />
        <Sidebar />
        <div>
          <h3 className="c-name">Company</h3>
          <input type="search" placeholder="Search..." id="inp" />

          <button id="ad-btn" onClick={() => setLgShow(true)}>
            + Add Company
          </button>

          <div className="tbl-div tables">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>
                    {" "}
                    <input type="checkbox" />
                  </th>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Link</th>
                  <th>Machines</th>
                  <th>Frequency</th>
                  <th>Contact Number</th>
                  <th>Remark</th>
                  <th>Action</th>
                </tr>
              </thead>
              {companyList?.data?.result?.map((item, i) => (
                <tbody key={i}>
                  <tr>
                    <td>
                      {" "}
                      <input type="checkbox" />
                    </td>

                    <td>{item.code}</td>
                    <td>{item.name}</td>
                    <td>{item.link}</td>
                    <td>{item.machines}</td>
                    <td>{item.frequency}</td>
                    <td>{item.contact_no}</td>
                    <td>{item.remark}</td>
                    <td>
                      <img
                        src="\images\Edit.svg "
                        alt="edit"
                        className="back-clr"
                        onClick={(e) => {
                          setPageLayout("Update Company");
                          let details = companyList?.data?.result?.find((sitem) => item._id == sitem._id );
                          setCompData(details);
                          setLgShow(true);
                        }}
                      />
                      <img
                        src="\images\Vector.svg"
                        alt="delete"
                        className="back-clr"
                        onClick={(e) => {
                          let ids = [];
                          ids.push(item._id);
                          dispatch(deleteCompany(ids));
                        }}
                      />
                    </td>
                  </tr>
                </tbody>
              ))}
            </Table>

            <Modal
              size="lg"
              show={lgShow}
              onHide={() => setLgShow(false)}
              aria-labelledby="example-modal-sizes-title-lg"
            >
              <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                  {pageLayout}
                </Modal.Title>
              </Modal.Header>
              <div className="cloum-2">
                <Modal.Body>
                  <Form>
                    <div>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Code</Form.Label>
                        <Form.Control
                          type="text"
                          value={compData.code}
                          onChange={handleChange}
                          placeholder="Code"
                          name="code"
                          autoFocus
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Machines</Form.Label>
                        <Form.Control
                          type="text"
                          value={compData.machines}
                          onChange={handleChange}
                          placeholder="Machines"
                          name="machines"
                          autoFocus
                        />
                      </Form.Group>{" "}
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Link</Form.Label>
                        <Form.Control
                          type="text"
                          value={compData.link}
                          onChange={handleChange}
                          placeholder="Link"
                          name="link"
                          autoFocus
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control
                          type="number"
                          value={compData.contact_no}
                          onChange={handleChange}
                          placeholder="Contact Number"
                          name="contact_no"
                          autoFocus
                        />
                      </Form.Group>
                    </div>
                    <div>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={compData.name}
                          onChange={handleChange}
                          placeholder="Name"
                          name="name"
                          autoFocus
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Area</Form.Label>
                        <Form.Control
                          type="text"
                          value={compData.area}
                          onChange={handleChange}
                          placeholder="Area"
                          name="area"
                          autoFocus
                        />
                      </Form.Group>{" "}
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <label for="frequency">Frequency</label>
                        <select
                          id="frequency"
                          name="frequency"
                          onChange={handleChange}
                        >
                          <option value="0">Low</option>
                          <option value="1">Medium</option>
                          <option value="2">High</option>
                        </select>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Remark</Form.Label>
                        <Form.Control
                          type="text"
                          value={compData.remark}
                          onChange={handleChange}
                          placeholder="Reamark"
                          name="remark"
                          autoFocus
                        />
                      </Form.Group>
                    </div>
                  </Form>
                </Modal.Body>
              </div>
              <Modal.Footer>
                <div class="text-center">
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={() => {
                      if (pageLayout == "Add Company") {
                        dispatch(createCompany(compData));
                      } else {
                        dispatch(updateCompany(compData));
                      }
                      window.location.reload();
                      handleClose();
                    }}
                  >
                    Save
                  </button>
                </div>

                <div class="text-center">
                  <Button variant="secondary" onClick={handleClose}>
                    Cancel
                  </Button>
                </div>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default Company;

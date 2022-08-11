import React, { useState, useEffect } from "react";
import { MainBody } from "components/templates";
import { Button } from "components/atoms";
import { ModalDelete } from "components/organisms";
import { Modal } from "components/molecules";
import Row from "./Row";
import axios from "services/axios";

const MasterData = () => {
  const [listData, setListData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [isModalAdd, setIsModalAdd] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [formName, setFormName] = useState("");
  const [formNumber, setFormNumber] = useState("");

  useEffect(() => {
    loadFirst();
  }, []);

  const fetchApi = () => {
    return axios.get("master", {
      params: {
        limit,
        page,
      },
    });
  };

  const loadFirst = async () => {
    setPage(1);
    try {
      const response = await fetchApi();
      if (response.data.success) {
        setPage(2);
        setTotalData(response.data.results.pagination.totalData);
        setListData(response.data.results.data);
      }
    } catch (error) {
      alert("ERROR GET DATA");
    }
  };

  const loadMore = async () => {
    setIsLoadingMore(true);
    try {
      const response = await fetchApi();
      if (response.data.success) {
        setPage(page + 1);
        setTotalData(response.data.results.pagination.totalData);
        setListData([...listData, ...response.data.results.data]);
      }
    } catch (error) {
      alert("ERROR GET MORE DATA");
    } finally {
      setIsLoadingMore(false);
    }
  };

  const closeModal = () => {
    setIsShowModalDelete(false);
  };

  const onDelete = (data) => {
    setSelectedData(data);
    setIsShowModalDelete(true);
  };

  const closeModalAdd = () => {
    setIsModalAdd(false);
  };

  const openModalAdd = () => {
    setIsModalAdd(true);
  };

  const onSubmitAddData = async (e) => {
    e.preventDefault();
    setIsModalAdd(true);
    const formData = {
      name: formName,
      whatsapp: formNumber,
    };

    try {
      const response = await axios.post("master", formData);
      if (response.data.success) {
        loadFirst();
        closeModalAdd();
      }
    } catch (error) {
      if (error) {
        if (error.response.data.message) {
          alert(error.response.data.message);
        } else {
          alert("SOMETHING WRONG");
        }
      } else {
        alert("SOMETHING WRONG");
      }
    }
  };

  return (
    <MainBody>
      <h1>Master Data</h1>
      <Modal show={isModalAdd} radius="md" size="md" onClose={closeModalAdd}>
        <div className="py-6 px-5">
          <h1 className="text-center">TAMBAH DATA</h1>
          <div className="mt-7">
            <form onSubmit={onSubmitAddData}>
              <div className="mb-4">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Nama"
                  value={formName}
                  onChange={(e) => { setFormName(e.target.value); }}
                />
              </div>
              <div className="mb-4">
                <input
                  type="tel"
                  className="form-input"
                  placeholder="Whatsapp Number"
                  value={formNumber}
                  onChange={(e) => { setFormNumber(e.target.value); }}
                />
              </div>
              <div className="row mt-5">
                <div className="col-6">
                  <Button
                    type="button"
                    color="red"
                    radius="sm"
                    md
                    full
                    onClick={closeModalAdd}
                  >
                    BATAL
                  </Button>
                </div>
                <div className="col-6">
                  <Button
                    type="submit"
                    color="black"
                    radius="sm"
                    md
                    full
                  >
                    SIMPAN
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>
      <ModalDelete
        show={isShowModalDelete}
        onClose={closeModal}
        api={`master/${selectedData.id}`}
        id={selectedData.id}
        onDeleted={() => {
          closeModal();
          loadFirst();
        }}
      />
      <div className="mt-10">
        <div className="row">
          <div className="col-6">
            <Button
              type="button"
              color="black"
              radius="xs"
              md
              className="mr-4"
              onClick={() => {
                openModalAdd();
              }}
            >
              TAMBAH DATA
            </Button>
            <Button type="button" color="primary" radius="xs" href="/scheduler/add" md>
              IMPORT DATA
            </Button>
          </div>
          <div className="col-6">

          </div>
        </div>
        <table className="resit-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Whatsapp</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              listData.map((item, index) => {
                return (
                  <Row
                    key={index}
                    order={index + 1}
                    data={item}
                    onDelete={(e) => { onDelete(e); }}
                  />
                );
              })
            }
          </tbody>
        </table>
        {
          totalData > listData.length &&
          <div className="text-center">
            <Button
              className="px-6"
              color="black"
              onClick={() => {
                loadMore();
              }}
              loading={isLoadingMore}
              sm
            >
                LOAD MORE
            </Button>
          </div>
        }
      </div>
    </MainBody>
  );
};

export default MasterData;

import React, { useState, useEffect } from "react";
import { MainBody } from "components/templates";
import { Button } from "components/atoms";
import { ModalDelete } from "components/organisms";
import Row from "./Row";
import axios from "services/axios";

const Scheduler = () => {
  const [listData, setListData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [selectedData, setSelectedData] = useState({});

  useEffect(() => {
    loadFirst();
  }, []);

  const fetchApi = () => {
    return axios.get("cronjob", {
      params: {
        limit,
        page,
      },
    });
  };

  const loadFirst = async () => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
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

  return (
    <MainBody>
      <h1>Scheduler</h1>
      <ModalDelete
        show={isShowModalDelete}
        onClose={closeModal}
        api={`cronjob/${selectedData.id}`}
        id={selectedData.id}
        onDeleted={() => {
          closeModal();
          loadFirst();
        }}
      />
      <div className="mt-10">
        <div className="row">
          <div className="col-6">
            <Button type="button" color="black" radius="xs" href="/scheduler/add" md>
              TAMBAH SCHEDULER
            </Button>
          </div>
          <div className="col-6">

          </div>
        </div>
        <table className="resit-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Message</th>
              <th>Schedule</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              isLoading
                ? <tr>
                  <td className="text-center" colSpan={4}>
                    <h2 className="py-4">
                    LOADING...
                    </h2>
                  </td>
                </tr>
                : listData.map((item, index) => {
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

export default Scheduler;

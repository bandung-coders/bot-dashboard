import React, { useState, useEffect, useRef } from "react";
import { MainBody } from "components/templates";
import { Button } from "components/atoms";
import { BoxInfo, AttachFile } from "components/molecules";
import readXlsxFile from "read-excel-file";
import axios from "services/axios";
import { secondsToHms, getBotLocalData } from "utils/helpers";

const Bulk = () => {
  const [limit, setLimit] = useState(20);
  const [listData, setListData] = useState([]);
  const [messageInterval, setMessageInterval] = useState(5);
  const [isFetching, setIsFetching] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [message1, setMessage1] = useState("");
  const [messageImage1, setMessageImage1] = useState("");
  const [message2, setMessage2] = useState("");
  const [messageImage2, setMessageImage2] = useState("");
  const [informasi, setInformasi] = useState("");
  const [searchContact, setSearchContact] = useState("");
  const [isFilter, setIsFilter] = useState(false);
  const [dataType, setDataType] = useState("excel");
  const dataResults = useRef(null);
  const botId = getBotLocalData();

  useEffect(() => {
    // loadFirst(limit);
  }, []);

  const onChangeContact = (e) => {
    const limitValue = e.target.value;
    if (limitValue >= 1) {
      // generateInformasi(limitValue, messageInterval);
      setLimit(limitValue);
      loadFirst(limitValue);
    } else {
      setLimit(1);
    }
  };

  const fetchApi = (myLimit, currentSearch) => {
    return axios.get("master/contacts", {
      params: {
        limit: myLimit,
        page: 1,
        search: currentSearch,
      },
    });
  };

  const loadFirst = async (myLimit, currentSearch) => {
    setIsFetching(true);
    try {
      const response = await fetchApi(myLimit, currentSearch);
      if (response.data.success) {
        const responseData = response.data.results.data;
        setListData(responseData);
        generateInformasi(responseData.length, messageInterval);
      }
    } catch (error) {
      alert("ERROR GET DATA");
    } finally {
      setIsFetching(false);
    }
  };

  const onChangeInterval = (e) => {
    const intervalValue = e.target.value;
    generateInformasi(listData.length, intervalValue);
    if (intervalValue < 5) {
      setMessageInterval(5);
    } else {
      setMessageInterval(intervalValue);
    }
  };

  const startSystem = () => {
    if (listData.length > 0) {
      setIsStarting(true);
      window.onbeforeunload = function () {
        return "Data will be lost if you leave the page, are you sure?";
      };
      let counter = 0;
      const i = setInterval(() => {
        sendWhatsappMessage(listData[counter].name, message1, messageImage1, listData[counter].whatsapp);
        counter++;
        if (counter === listData.length) {
          clearInterval(i);
          setIsStarting(false);
          alert("BULK MESSAGE DONE");
        }
      }, messageInterval * 1000);
    }
  };

  const statusSet = (type, whatsappNumber) => {
    const selectedNode = dataResults.current.querySelector(`div[whatsapp='${whatsappNumber}']`);
    const statusNode = selectedNode.querySelector("div.contact-info-status");
    statusNode.style.display = "block";
    switch (type) {
    case "success":
      statusNode.innerHTML = "BERHASIL";
      statusNode.classList.add("success");
      break;
    case "failed":
      statusNode.innerHTML = "GAGAL";
      statusNode.classList.add("failed");
      break;
    case "progress":
      statusNode.innerHTML = "LOADING..";
      statusNode.classList.add("progress");
      break;
    }
  };

  const generateInformasi = (currentLimit, currentInterval) => {
    const detik = currentInterval * currentLimit;
    const waktu = secondsToHms(detik);

    const text = "Butuh waktu <b>" + waktu + "</b> untuk menjalankan broadcast ini";
    setInformasi(text);
  };

  const sendWhatsappMessage = async (name, message, imageBase64, whatsappDestination) => {
    const formData = {
      type: "personal",
      destination: whatsappDestination,
      systemType: "BULK",
      name: name,
      message: message,
      image: imageBase64,
      botId: botId,
    };
    try {
      if (imageBase64) {
        const response = await axios.post("wa/send/image", formData);
        if (response.data.success) {
          statusSet("success", whatsappDestination);
        } else {
          statusSet("failed", whatsappDestination);
        }
      } else {
        const response = await axios.post("wa/send/message", formData);
        if (response.data.success) {
          statusSet("success", whatsappDestination);
        } else {
          statusSet("failed", whatsappDestination);
        }
      }
    } catch (error) {
      console.log("ERROR BRODIE ====>", whatsappDestination, error.response.data);
      if (error.response) {
        statusSet("failed", whatsappDestination);
      }
    }
  };

  const onSearchContact = (e) => {
    loadFirst(limit, e.target.value ? e.target.value : "");
    setSearchContact(e.target.value);
  };

  const openFilter = () => {
    setIsFilter(true);
  };

  const closeFilter = () => {
    setIsFilter(false);
  };

  const onSelectExcel = (e) => {
    const file = e.target.files[0];
    if (e.target.value.length > 0) {
      if (file) {
        setIsFetching(true);
        const list = [];
        readXlsxFile(file).then((rows) => {
          if (rows) {
            if (rows.length > 1) {
              rows.forEach((item, index) => {
                if (index > 0) {
                  list.push({
                    whatsapp: item[1] || "6281546416749",
                    name: item[0] || "kak",
                  });
                }
              });
              generateInformasi(list.length, messageInterval);
              setListData(list);
              setIsFetching(false);
            } else {
              setListData([]);
              setIsFetching(false);
            }
          } else {
            setListData([]);
            setIsFetching(false);
          }
        });
      } else {
        setListData([]);
      }
    } else {
      setListData([]);
    }
  };

  return (
    <MainBody>
      <h1>BROADCAST PAGE</h1>
      <div className="mt-10 mb-15">
        <div className="mb-10">
          <div className="overflow-x-auto width-full">
            <div className="box-variasi">
              <div className="box-variasi-header">
                Pesan Variasi 1
              </div>
              <div className="box-variasi-body">
                <textarea
                  rows="7"
                  className="form-input"
                  value={message1}
                  onChange={(e) => { setMessage1(e.target.value); }}
                  placeholder="Tulis pesan disini"
                ></textarea>
                <AttachFile
                  label="PILIH GAMBAR"
                  onChange={(base64Image) => {
                    setMessageImage1(base64Image);
                  }}
                />
                {/* <input
                  type="file"
                  onChange={(e) => {
                    changeImage1(e);
                  }}
                  accept="image/jpg, image/jpeg, image/png"
                /> */}
              </div>
            </div>
          </div>
          {/* <div className="col-3">
            <div className="mb-2 fs-md">Pesan Variasi 1</div>
            <textarea rows="7" className="form-input" value={message1} onChange={(e) => { setMessage1(e.target.value); }}></textarea>
            <input
              type="file"
              onChange={(e) => {
                changeImage1(e);
              }}
              accept="image/jpg, image/jpeg, image/png"
            />
          </div>
          <div className="col-3">
            <div className="mb-2 fs-md">Pesan Variasi 2</div>
            <textarea rows="7" className="form-input" value={messageImage2} onChange={(e) => { setMessageImage2(e.target.value); }}></textarea>
            <input
              type="file"
              onChange={(e) => {
                changeImage1(e);
              }}
              accept="image/jpg, image/jpeg, image/png"
            />
          </div> */}
        </div>

        <div className="overflow-x-auto width-full">
          <div className="d-flex align-x-right mb-6 list-data-type">
            <label className="form-radio">
              <div className="form-radio-check">
                <input
                  type="radio"
                  className="form-radio-input"
                  name="dataType"
                  value="online"
                  checked={dataType === "online"}
                  onChange={(e) => {
                    loadFirst(limit);
                    setDataType(e.target.value);
                  }}
                />
                <div className="form-radio-box"></div>
              </div>
              <div className="form-radio-title">
                ONLINE DATA
              </div>
            </label>
            <label className="form-radio">
              <div className="form-radio-check">
                <input
                  type="radio"
                  className="form-radio-input"
                  name="dataType"
                  value="google"
                  checked={dataType === "google"}
                  onChange={(e) => {
                    setListData([]);
                    setInformasi("");
                    setDataType(e.target.value);
                  }}
                />
                <div className="form-radio-box"></div>
              </div>
              <div className="form-radio-title">
                GOOGLE SHEET DATA
              </div>
            </label>
            <label className="form-radio">
              <div className="form-radio-check">
                <input
                  type="radio"
                  className="form-radio-input"
                  name="dataType"
                  value="excel"
                  checked={dataType === "excel"}
                  onChange={(e) => {
                    setInformasi("");
                    setListData([]);
                    setDataType(e.target.value);
                  }}
                />
                <div className="form-radio-box"></div>
              </div>
              <div className="form-radio-title">
                EXCEL DATA
              </div>
            </label>
          </div>
        </div>

        <div className="overflow-x-auto width-full">
          <div className="box-contact">
            <div className={`box-contact-filters${isFilter ? " show" : ""}`}>
              <div className="box-contact-filters-wrapper">
                <h2>Filter Data</h2>
                <button type="button" className="filters-close-btn" onClick={closeFilter}>
                  <i className="resitdc icon-x"></i>
                </button>
                <div className="mt-7">
                  <div className="mb-5">
                    <label>ORDER</label>
                    <select name="" id="" className="form-input">
                      <option value="">RANDOM</option>
                      <option value="">Name A - Z</option>
                      <option value="">Name Z - A</option>
                    </select>
                  </div>
                  <div className="mb-5">
                    <label className="noselect cursor-pointer">
                      <input
                        type="checkbox"
                      />
                      Tampilkan yang belum pernah dapat bulk
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="box-contact-header">
              <div className="row row-x-space-between">
                <div className="col-3">
                  <input
                    type="number"
                    className="form-input"
                    onChange={onChangeInterval}
                    placeholder="SET INTERVAL"
                    value={messageInterval}
                    disabled={isStarting}
                  />
                </div>
                {(() => {
                  switch (dataType) {
                  case "online":
                    return (
                      <>
                        <div className="col-7">
                          <div className="row">
                            <div className="col-6">
                              <input
                                type="number"
                                className="form-input"
                                onChange={onChangeContact}
                                placeholder="TOTAL CONTACT"
                                value={limit}
                                disabled={isStarting}
                              />
                            </div>
                            <div className="col-6">
                              <input
                                type="search"
                                className="form-input"
                                placeholder="Search"
                                value={searchContact}
                                onChange={onSearchContact}
                                disabled={isStarting}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-2">
                          <Button
                            heightFull
                            color="primary"
                            full
                            md
                            onClick={openFilter}
                          >
                            Filter
                          </Button>
                        </div>
                      </>
                    );
                  case "google":
                    return (
                      <div className="col-6">
                        <input
                          type="link"
                          placeholder="GOOGLE SHEET LINK"
                          className="form-input py-4"
                        />
                      </div>
                    );
                  case "excel":
                    return (
                      <div className="col-9 d-flex align-y-center align-x-right pr-5">
                        <div className="form-excel">
                          <input
                            type="file"
                            className="form-excel-input"
                            accept=".xlsx"
                            onChange={onSelectExcel}
                          />
                          <div className="form-excel-title">
                            PILIH FILE EXCEL
                          </div>
                        </div>
                      </div>
                    );
                  }
                })()}
              </div>
            </div>
            <div className="box-contact-body" ref={dataResults}>
              <div className="contact-body-left">
                <BoxInfo title="Informasi" color="yellow">
                  {
                    informasi
                      ? <div dangerouslySetInnerHTML={{ __html: informasi }}></div>
                      : <h2 className="text-center">TIDAK ADA INFO</h2>
                  }
                </BoxInfo>
              </div>
              <div className="contact-body-right">
                {
                  isFetching
                    ? <h1 className="text-center">LOADING DATA....</h1>
                    : listData.length > 0
                      ? listData.map((item, index) => {
                        return (
                          <div className="contact-info" whatsapp={item.whatsapp} key={index}>
                            <div className="contact-info-no" order={index + 1}>{item.whatsapp}</div>
                            <div className="contact-info-name">{item.name}</div>
                            <div className="contact-info-status" style={{ display: "none" }}></div>
                          </div>
                        );
                      })
                      : <h1 className="text-center py-8">NO DATA</h1>
                }
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <Button
            type="button"
            color="black"
            loading={isStarting}
            disabled={listData.length === 0}
            full
            lg
            onClick={() => { startSystem(); }}
          >
            START
          </Button>
        </div>
      </div>
    </MainBody>
  );
};

export default Bulk;

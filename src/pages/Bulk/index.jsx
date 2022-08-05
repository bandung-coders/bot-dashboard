import React, { useState, useEffect, useRef } from "react";
import { MainBody } from "components/templates";
import { Button } from "components/atoms";
import { BoxInfo } from "components/molecules";
import axios from "services/axios";
import { secondsToHms } from "utils/helpers";

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
  const dataResults = useRef(null);

  useEffect(() => {
    loadFirst(limit);
  }, []);

  const onChangeContact = (e) => {
    const limitValue = e.target.value;
    if (limitValue >= 1) {
      generateInformasi(limitValue, messageInterval);
      setLimit(limitValue);
      loadFirst(limitValue);
    } else {
      setLimit(1);
    }
  };

  const fetchApi = (myLimit) => {
    return axios.get("master", {
      params: {
        limit: myLimit,
        page: 1,
      },
    });
  };

  const loadFirst = async (myLimit) => {
    setIsFetching(true);
    try {
      const response = await fetchApi(myLimit);
      if (response.data.success) {
        setListData(response.data.results.data);
      }
    } catch (error) {
      alert("ERROR GET DATA");
    } finally {
      setIsFetching(false);
    }
  };

  const onChangeInterval = (e) => {
    const intervalValue = e.target.value;
    generateInformasi(limit, intervalValue);
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

    const text = "Butuh waktu <b>" + waktu + "</b> untuk menjalankan misi ini";
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
    };
    try {
      const response = await axios.post("wa/send/image", formData);
      if (response.data.success) {
        statusSet("success", whatsappDestination);
      } else {
        statusSet("failed", whatsappDestination);
      }
    } catch (error) {
      console.log("ERROR BRODIE ====>", whatsappDestination, error.response.data);
      if (error.response) {
        statusSet("failed", whatsappDestination);
      }
    }
  };

  const changeImage1 = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = _handleReaderLoaded1;
      reader.readAsBinaryString(file);
    }
  };

  const _handleReaderLoaded1 = (readerEvt) => {
    const binaryString = readerEvt.target.result;
    const base64Convert = window.btoa(binaryString, "base64");
    // setBase64(`data:image/png;base64,${base64Convert}`);
    setMessageImage1(base64Convert);
  };

  const changeImage2 = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = _handleReaderLoaded2;
      reader.readAsBinaryString(file);
    }
  };

  const _handleReaderLoaded2 = (readerEvt) => {
    const binaryString = readerEvt.target.result;
    const base64Convert = window.btoa(binaryString, "base64");
    // setBase64(`data:image/png;base64,${base64Convert}`);
    setMessageImage2(base64Convert);
  };

  return (
    <MainBody>
      <h1>BULK PAGE</h1>
      <div className="mt-10 mb-15">
        <div className="row mb-10">
          <div className="col-3">
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
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <div className="mb-10">
              <div className="mb-2 fs-md">Message Interval</div>
              <input
                type="number"
                className="form-input"
                onChange={onChangeInterval}
                placeholder="SET INTERVAL"
                value={messageInterval}
                disabled={isStarting}
              />
            </div>
            <div className="mt-8">
              <BoxInfo title="Informasi" color="green">
                {
                  informasi
                    ? <div dangerouslySetInnerHTML={{ __html: informasi }}></div>
                    : <h2 className="text-center">TIDAK ADA INFO</h2>
                }
              </BoxInfo>
            </div>
          </div>
          <div className="col-9">
            <div className="box-contact">
              <div className="box-contact-header">
                <input
                  type="number"
                  className="form-input"
                  onChange={onChangeContact}
                  placeholder="TOTAL CONTACT"
                  value={limit}
                  disabled={isStarting}
                />
              </div>
              <div className="box-contact-body" ref={dataResults}>
                {
                  isFetching
                    ? <h1 className="text-center">LOADING DATA....</h1>
                    : listData.length > 0 &&
                      listData.map((item, index) => {
                        return (
                          <div className="contact-info" whatsapp={item.whatsapp} key={index}>
                            <div className="contact-info-no" order={index + 1}>{item.whatsapp}</div>
                            <div className="contact-info-name">{item.name}</div>
                            <div className="contact-info-status" style={{ display: "none" }}></div>
                          </div>
                        );
                      })
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
            full
            md
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

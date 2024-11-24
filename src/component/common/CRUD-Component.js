/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button, Col, DatePicker, Pagination, Row } from "antd";
import moment from "moment";
import PropTypes from "prop-types";
// import PageHeader from "../../../../component/common/page-Header";
// import {
//   DeleteOutlined,
//   DownloadOutlined,
//   EditOutlined,
//   EyeOutlined,
//   CheckCircleTwoTone,
//   CloseCircleTwoTone,
// } from "@ant-design/icons";
import useHttp from "../../hooks/use-http";
import ModalFormCreator from "./ModalFormCreator";
import CRUDTable from "./CRUD-Table";
import CustomSearchBar from "./Custom-search";
import dayjs from "dayjs";
// import CustomTable from "../../../../component/common/Custom-Table";
// import CONSTANTS from "../../../../util/constant/CONSTANTS";
// import useHttp from "../../../../hooks/use-http";
// import ModalFormCreator from "../../../../component/common/ModalFormCreator";

const { RangePicker } = DatePicker;

const CRUDComponent = (props) => {
  const {
    GET,
    CREATE,
    UPDATE,
    DELETE,
    isSearch = false,
    AddOnComponent = null,
    selectionOff = false,
    FILTERSORTKEY = {},
    reload = false,
    dateFilter = false,
    edit = false,
    pageSize = 20
  } = props;
  const [data, setData] = useState([]);
  const [Allfilter, setAllFilter] = useState(null);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: pageSize,
    total: 0,
  });
  const [createOpen, setCreateOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(null);
  const [formData, setFormData] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [dates, setDates] = useState({
    startDate: null,
    endDate: null,
  });
  const API = useHttp();


  useEffect(() => {
    let QuaryParams = {
      limit: pagination.pageSize,
      page: pagination.current,
    };
    if (GET?.extraQuery) {
      QuaryParams = { ...QuaryParams, ...GET?.extraQuery };
    }
    if (dates.startDate !== null && dates.endDate !== null) {
      // datefilter = `?startDate=${dates.startDate}&endDate=${dates.endDate}`;
      QuaryParams = { ...QuaryParams, ...dates };
    }
    if (Allfilter?.sort) {
      const sorter = { ...Allfilter?.sort };
      sorter.sortBy = FILTERSORTKEY?.[sorter?.sortBy] || sorter?.sortBy;
      QuaryParams = { ...QuaryParams, ...sorter };
    }
    if (Allfilter?.filter) {
      Allfilter?.filter?.map((el) => {
        QuaryParams = {
          ...QuaryParams,
          [`autogenerate-mul-array-${FILTERSORTKEY?.[el[0]] || el[0]}`]: el[1],
        };
      });
    }
    if (search?.trim().length) {
      QuaryParams = { ...QuaryParams, searchQuery: search };
    }
    GET &&
      GET?.API &&
      API.sendRequest(
        GET?.API,
        (res) => {
          setPagination((prevPagination) => ({
            ...prevPagination,
            total: res?.data?.count ?? res?.data?.data?.count ?? 1,
          }));
          let ResultData = res?.data?.data?.rows || res?.data?.rows || res?.data?.data || res?.data;
          ResultData = ResultData?.map((el, i) => {
            const SingleRow = {
              ...el,
              key: el["_id"],
              no: `${(pagination.current - 1) * pagination.pageSize + i + 1
                }`.padStart(6, "0"),
            };
            if (
              DELETE &&
              DELETE?.API &&
              GET?.column?.findIndex(
                (el) => el?.dataIndex === "deleteTableRow"
              ) !== -1
            ) {
              SingleRow.deleteTableRow = {
                id: el["_id"],
                key: el["_id"],
                onClick: (key) => {
                  const DeleteAPITableRow = { ...DELETE?.API };
                  DeleteAPITableRow.endpoint = `${DeleteAPITableRow.endpoint}${key}`;
                  API.sendRequest(
                    DeleteAPITableRow,
                    (res) => {
                      // console.log(res);
                      setData((prev) =>
                        prev.filter((item) => item.key !== key)
                      );
                    },
                    "",
                    DELETE?.message
                  );
                },
              };
            }
            if (
              UPDATE &&
              UPDATE?.API &&
              UPDATE?.modalFields &&
              GET?.column?.findIndex(
                (el) => el?.dataIndex === "editTableRow"
              ) !== -1
            ) {
              SingleRow.editTableRow = {
                id: el["_id"],
                key: el["_id"],
                onClick: () => {
                  setUpdateOpen({ ...SingleRow });
                  setFormData({ ...SingleRow });
                },
              };
            }
            return { ...SingleRow };
          });
          if (GET?.DataModifier) {
            setData(GET?.DataModifier(ResultData, API, setRefresh));
          } else {
            setData(ResultData);
          }
        },
        QuaryParams
      );
  }, [
    refresh,
    pagination.current,
    pagination.pageSize,
    Allfilter,
    search,
    GET?.extraQuery,
    dates,
    reload,
  ]);
  //   const CSVData = [];
  //   CSVData[0] = CONSTANTS.TABLE.SETTING_ROUTINE_CHECKUP.map((el) => el.title);
  //   data.map((item, index) => {
  //     CSVData[index + 1] = CONSTANTS.TABLE.SETTING_ROUTINE_CHECKUP.map(
  //       (el) => item[el.dataIndex]
  //     );
  //     return 0;
  //   });

  const onCreate = (value, clear) => {
    if (CREATE && CREATE?.API && CREATE?.modalFields) {
      let payload = payloadGenerator(
        value,
        CREATE?.modalFields,
        CREATE?.isFormData
      );

      if (CREATE?.payloadModifier) {
        payload = CREATE?.payloadModifier(payload);
      }

      API.sendRequest(
        CREATE?.API,
        () => {
          setRefresh((prev) => !prev);
          setCreateOpen(false);
          clear();
        },
        payload,
        CREATE?.message
      );
    }
  };
  const onUpdate = (value, clear) => {
    if (UPDATE && UPDATE?.API && UPDATE?.modalFields) {
      let payload = payloadGenerator(
        value,
        UPDATE?.modalFields,
        UPDATE?.isFormData,
        'edit'
      );

      if (UPDATE?.payloadModifier) {
        payload = UPDATE?.payloadModifier(payload, formData);
      }

      const UpdateAPIEnd = { ...UPDATE?.API };
      UpdateAPIEnd.endpoint = `${UpdateAPIEnd?.endpoint}${updateOpen?.id ?? updateOpen["_id"]}`;
      API.sendRequest(
        UpdateAPIEnd,
        () => {
          setUpdateOpen(null);
          setFormData(null);
          setRefresh((prev) => !prev);
          clear();
        },
        payload,
        UPDATE?.message
      );
    }
  };
  const dateFilterFunction = (e) => {
    // console.log(dayjs(e[0]).format("YYYY-MM-DD"));
    // console.log(dayjs(e[1]).format("YYYY-MM-DD"));
    if (e) {
      setDates({
        startDate: dayjs(e[0])?.format("YYYY-MM-DD"),
        endDate: dayjs(e[1])?.format("YYYY-MM-DD"),
      });
    }
    else {
      setDates({
        startDate: null,
        endDate: null,
      });
    }
  };

  return (
    <Row className="gap-4 mt-6">
      {CREATE && CREATE?.API && CREATE?.modalFields && (
        <ModalFormCreator
          loading={API.isLoading}
          open={createOpen}
          onCreate={onCreate}
          onCancel={() => {
            setCreateOpen(false);
          }}
          menuFields={CREATE?.modalFields}
          formData={{}}
          name={CREATE?.modaltitle || `Add `}
          SubmitName={"Submit"}
          Submit={edit ? false : true}
          Update={edit ? true : false}
        />
      )}
      {UPDATE && UPDATE?.API && UPDATE?.modalFields && (
        <ModalFormCreator
          loading={API.isLoading}
          open={updateOpen !== null}
          onCreate={onUpdate}
          onCancel={() => {
            setUpdateOpen(null);
            setFormData(null);
          }}
          menuFields={UPDATE?.modalFields}
          formData={formData}
          name={UPDATE?.modaltitle || 'Edit'}
          SubmitName={"Update "}
        />
      )}
      {CREATE && CREATE?.API && (
        <Col span={24}>
          <Button
            type="primary"
            loading={API.isLoading}
            onClick={() => {
              setCreateOpen(true);
            }}
          >
            Add
          </Button>
        </Col>
      )}
      {GET?.column?.length && (
        <>
          {isSearch && (
            <Col span={24} sm={24} md={20} lg={12} xl={10} xxl={8}>
              <CustomSearchBar
                setKeyword={(v) => setSearch(v)}
                isSearch={isSearch}
              />
            </Col>
          )}
          {dateFilter && <RangePicker
            className="w-[60%] my-2"
            onChange={dateFilterFunction}
          />}
          {AddOnComponent}
          <Col span={24}>
            <CRUDTable
              dataSource={data}
              isLoading={API.isLoading}
              columns={GET?.column}
              selectionOff={selectionOff}
              //   DeleteSelectedRow
              //   APIendpoint="checkupDelete"
              //   onConfirm={() => {
              //     setRefresh((prev) => !prev);
              //   }}
              setChanges={(v) => {
                setAllFilter(v);
                setPagination((prev) => ({
                  ...prev,
                  current: 1,
                }));
              }}
            />
          </Col>
          <Col span={24} className="mb-4">
            <Pagination
              current={pagination?.current}
              pageSize={pagination?.pageSize}
              total={pagination?.total}
              showSizeChanger
              onChange={(page, pageSize) => {
                setPagination((prev) => ({ ...prev, pageSize, current: page }));
              }}
            />
          </Col>
        </>
      )}
    </Row>
  );
};
CRUDComponent.propTypes = {
  GET: PropTypes.shape({
    API: PropTypes.shape({
      type: PropTypes.string,
      endpoint: PropTypes.string,
    }),
    extraQuery: PropTypes.object,
    DataModifier: PropTypes.func,
    column: PropTypes.array,
  }),
  CREATE: PropTypes.shape({
    API: PropTypes.shape({
      type: PropTypes.string,
      endpoint: PropTypes.string,
    }),
    payloadModifier: PropTypes.func,
    modalFields: PropTypes.array,
    modaltitle: PropTypes.string,
    isFormData: PropTypes.bool,
    message: PropTypes.string,
  }),
  UPDATE: PropTypes.shape({
    API: PropTypes.shape({
      type: PropTypes.string,
      endpoint: PropTypes.string,
    }),
    payloadModifier: PropTypes.func,
    modalFields: PropTypes.array,
    modaltitle: PropTypes.string,
    isFormData: PropTypes.bool,
    message: PropTypes.string,
  }),

  DELETE: PropTypes.shape({
    API: PropTypes.shape({
      type: PropTypes.string,
      endpoint: PropTypes.string,
    }),
    message: PropTypes.string,
  }),
  isSearch: PropTypes.bool,
  selectionOff: PropTypes.bool,
  reload: PropTypes.bool,
  dateFilter: PropTypes.bool,
  FILTERSORTKEY: PropTypes.object,
  edit: PropTypes.object,
  pageSize: PropTypes.number,
};
export default CRUDComponent;

export const payloadGenerator = (value, fields, isFormData, type = 'add') => {
  let rawPayload = {};
  const formPayload = new FormData();
  if (isFormData) {
    fields?.forEach((ele) => {
      // console.log(ele.id);
      if (
        ele.type !== "file" &&
        ele.type !== "date" &&
        ele.type !== "multifield" &&
        ele.type !== "extraMultiSingle" &&
        ele.type !== "number"
      ) {
        value[ele.id] && formPayload.append(ele.id, value[ele.id]);
      }
      if (type === 'add') {
        if (ele.type === "file") {
          formPayload.append(ele.id, value[ele.id][0].originFileObj);
        }
      }
      else {
        if (ele.type === "file" && value[ele.id]) {
          formPayload.append(ele.id, value[ele.id][0].originFileObj);
        }
      }
      if (ele.type === "multifield" || ele.type === "extraMultiSingle") {
        if (ele?.handler) {
          value[ele.id] &&
            formPayload.append(ele.id, ele?.handler(value[ele.id]));
        } else {
          value[ele.id] &&
            formPayload.append(ele.id, JSON.stringify(value[ele.id]));
        }
      }

      if (ele.type === "number") {
        value[ele.id] && formPayload.append(ele.id, +value[ele.id]);
      }
      if (ele.type === "date") {
        // if (dateTime) {
        const dateTimeValue = `${moment(value[ele.id].$d).format(
          "YYYY-MM-DD"
        )} ${moment(value[ele.id].$d, "HH:mm:ss").utc().format("HH:mm:ss")}`;

        value[ele.id] && formPayload.append(ele.id, dateTimeValue);
      }
    });
  } else {
    fields.forEach((ele) => {
      if (ele?.type === "date") {
        rawPayload = {
          ...rawPayload,
          [ele?.id]: moment(value[ele?.id]?.$d, "YYYY-MM-DD").format(
            "YYYY-MM-DD"
          ),
        };
      }
      if (ele?.type === "time") {
        rawPayload = {
          ...rawPayload,
          [ele?.id]: moment(value[ele?.id]?.$d, "HH:mm:ss").format("HH:mm:ss"),
        };
      }
    });
    rawPayload = { ...value, ...rawPayload };
  }

  return isFormData ? formPayload : rawPayload;
};
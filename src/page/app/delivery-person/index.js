import { Button, Card, Row } from 'antd'
import React, { useRef, useState } from 'react'
import Heading from '../../../component/common/Heading'
import CRUDComponent from '../../../component/common/CRUD-Component'
import CONSTANTS from '../../../util/constant/CONSTANTS'
import { apiGenerator, convertLocalToUTC } from '../../../util/functions'
import { CSVLink } from 'react-csv'
import useHttp from '../../../hooks/use-http'
import { userExportData } from '../../../util/exportData'
import { RiFileExcel2Line } from 'react-icons/ri';

const DeliveryPerson = () => {
    const [CSV, setCSV] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const csvRef = useRef(null);
    const api = useHttp();

    const csvDownloader = () => {
        setIsLoading(true)
        const GET_ALL_DATA = apiGenerator(CONSTANTS.API.BILL.getAll, {}, `?page=1&limit=100`);

        api.sendRequest(GET_ALL_DATA, (res) => {
            const items = res?.data?.rows?.map((ele, i) => {
                return {
                    ...ele,
                    noD: i + 1,
                    billingDate: convertLocalToUTC(ele?.billingDate, "DD/MM/YYYY"),
                    billImageD: ele?.billImage,
                    amountD: `₹ ${ele?.amount ?? 0}`


                }
            })
            const CSVData = [];
            CSVData[0] = userExportData?.map((el) => el[1]);
            items?.map((item, index) => {
                CSVData[index + 1] = userExportData
                    ?.map((el) => el[0])
                    ?.map((val) => {
                        if (item != null && val in item) return item[val];
                        return "";
                    });
                return 0;
            });
            CSVData.push([
                "",
                "",
                "",
                `${items?.reduce((acc, curr) => (acc + curr.amount), 0)}`,
                "",
            ])
            setCSV(CSVData)
            window.setTimeout(() => {
                csvRef.current.link.click()
                setIsLoading(false);
            }, 1500)
        })
    }
    return (
        <>
            <CSVLink
                ref={csvRef}
                data={CSV}
                filename='bills.csv'
                className='hidden'
                target='_blank'
            />
            <Button loading={isLoading}
                onClick={csvDownloader}
                className='h-8 relative z-10 top-[8.5rem] left-32 flex justify-between items-center gap-2 font-medium' type='primary' ghost >
                <RiFileExcel2Line color='#34C759' size={18} />
                Download as Excel</Button>
            <Card className="my-5">
                <Heading>Bill</Heading>
                <Row>
                    <CRUDComponent
                        isSearch
                        GET={{
                            API: CONSTANTS.API.BILL.getAll,

                            DataModifier: (res, API, Setrefresh) => {
                                return res?.map((data, i) => {
                                    return {
                                        ...data,
                                        no: `B${(data["_id"]).toString().padStart(7, "0")}`,
                                        billingDate: convertLocalToUTC(data?.billingDate, "DD/MM/YYYY"),
                                        amount: `₹ ${data?.amount ?? 0}`,
                                    }
                                })
                            },
                            column: CONSTANTS.TABLE.BILL_LIST,
                        }}
                        UPDATE={{
                            API: CONSTANTS.API.BILL.update,
                            message: "Updated Bill successfully",
                            modaltitle: "Update Bill",
                            modalFields: CONSTANTS.FORM_FIELD.EDIT_BILL_MODAL,
                            isFormData: true,
                            // payloadModifier: (res) => {
                            //     let payload = {
                            //         ...res,
                            //         mobile: +res?.mobile,
                            //         startTime: convertLocalToUTC(res?.startTime, "HH:mm:ss", "HH:mm:ss"),
                            //         endTime: convertLocalToUTC(res?.endTime, "HH:mm:ss", "HH:mm:ss"),
                            //     }
                            //     return payload
                            // },
                        }}
                        CREATE={{
                            API: CONSTANTS.API.BILL.add,
                            message: "Add Bill Data successfully",
                            modaltitle: "Add Bill  Data",
                            modalFields: CONSTANTS.FORM_FIELD.BILL_MODAL,
                            isFormData: true,
                            // payloadModifier: (res) => {
                            //     console.log(res, moment.utc(res?.startTime))
                            //     return {
                            //         ...res,
                            //         billingDate: dayjs(res?.billingDate)
                            //     }
                            // },
                        }}
                        DELETE={{
                            API: CONSTANTS.API.BILL.delete,
                            message: "Deleted Bill Successfully",
                        }}
                    // isSearch={true}

                    />
                </Row>
            </Card>
        </>
    )
}

export default DeliveryPerson